import { CookieOptions, Request, Response } from "express";
import { JWT_REFRESH_MINUTES } from "../data/config";
import { User } from "../models/user.entity";
import AuthService from "../services/auth.service";
import GithubService from "../services/github.service";
import GoogleService from "../services/google.service";
import ModelService from "../services/model.service";
import { LoginUserDto, RegisterUserDto } from "./../dto/user.dto";

class AuthController {
	private readonly userService = new ModelService<User>(User);
	private readonly authService = new AuthService();
	private readonly googleService = new GoogleService();
	private readonly githubService = new GithubService();
	private readonly cookieOptions: CookieOptions = {
		maxAge: JWT_REFRESH_MINUTES * 60 * 1000,
		httpOnly: true,
		sameSite: "none",
		secure: true,
		domain: ".webshining.fun",
	};

	login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
		const { email, password } = req.body;
		const user = await this.userService.getOne({ email });
		if (!user) return res.json({ error: "User not found" });
		const comparePass = await this.authService.comparePass(password, user.password);
		if (!comparePass) return res.json({ error: "Wrong password" });
		const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	register = async (req: Request<{}, {}, RegisterUserDto>, res: Response) => {
		const { email, name, password } = req.body;
		const candidate = await this.userService.getOne({ email });
		if (candidate) {
			return res.json({ error: "User already exists" });
		}
		const hashPass = await this.authService.hashPass(password);
		const user = await this.userService.create({ name, email, password: hashPass });
		const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	oauth = async (req: Request<{}, {}, {}, { state?: string }>, res: Response) => {
		const isGoogle: boolean = req.path === "/google";
		const service = isGoogle ? this.googleService : this.githubService;
		const url = await service.generateUrl(req.query.state || "");
		return res.redirect(url);
	};

	redirect = async (req: Request<{}, {}, {}, { code: string; state: string; error?: string }>, res: Response) => {
		const isGoogle: boolean = req.path === "/google/redirect";
		const service = isGoogle ? this.googleService : this.githubService;
		const { error, code, state } = req.query;
		let data = null;
		if (error) data = req.query;
		if (!data) {
			const token = await service.getToken(code);
			if (token["error"]) data = token;
			if (!data) {
				const userinfo = await service.getUserInfo(token["access_token"]);
				if (userinfo["error"]) data = userinfo;
				if (!data) {
					const { id, name } = userinfo;
					let user = await this.userService.getOne(isGoogle ? { google_id: id } : { github_id: id });
					if (!user) user = await this.userService.create(isGoogle ? { name, google_id: id } : { name, github_id: id });
					const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });
					data = { accessToken };
					res.cookie("refreshToken", refreshToken, this.cookieOptions);
				}
			}
		}
		if (state) return res.redirect(state + "#" + JSON.stringify(data));
		return res.json(data);
	};

	refresh = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (!token) return res.json({ error: "Unauthorized" });
		if (!(await this.authService.isTokenExists(token))) return res.json({ error: "Unauthorized" });
		const refresh: any = await this.authService.tokenDecode(token, true);
		await this.authService.removeToken(token);
		if (!refresh) return res.json({ error: "Unauthorized" });
		const user = await this.userService.getOne({ id: refresh.id });
		if (!user) return res.json({ error: "Unauthorized" });
		const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	logout = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (token) {
			await this.authService.removeToken(token);
			res.clearCookie("refreshToken", { ...this.cookieOptions, maxAge: 0 });
		}
		return res.send();
	};
}

export default new AuthController();
