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
		// domain: ".webshining.fun",
	};

	login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
		throw new Error("Abobe");
		// const { email, password } = req.body;
		// const user = await this.userService.getOne({ email });
		// if (!user) return res.json({ error: "User not found" });
		// const comparePass = await this.authService.comparePass(password, user.password);
		// if (!comparePass) return res.json({ error: "Wrong password" });
		// const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });
		// return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
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

		if (error) {
			if (state) return res.redirect(state + "#" + JSON.stringify(req.query));
			return res.json(req.query);
		}
		const tokens = await service.getToken(code);
		if (tokens["error"]) {
			if (state) return res.redirect(state + "#" + JSON.stringify(tokens));
			return res.json(tokens);
		}
		const userinfo = await service.getUserInfo(tokens["id_token"]);
		if (userinfo["error"]) {
			if (state) return res.redirect(state + "#" + JSON.stringify(userinfo));
			return res.json(userinfo);
		}

		const { sub, name } = userinfo;
		let user = await this.userService.getOne(isGoogle ? { google_id: sub } : { github_id: sub });
		if (!user) user = await this.userService.create(isGoogle ? { name, google_id: sub } : { name, github_id: sub });
		const { accessToken, refreshToken } = await this.authService.generateTokens({ user: user.toJSON() }, { id: user.id });

		res.cookie("refreshToken", refreshToken, this.cookieOptions);
		if (state) return res.redirect(state + "#" + JSON.stringify({ accessToken }));
		return res.json({ accessToken });
	};

	refresh = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (!(await this.authService.isTokenExists(token))) return res.status(401).json({ error: "Unauthorized" });
		const refresh: any = await this.authService.tokenDecode(token, true);
		await this.authService.removeToken(token);
		if (!refresh) return res.status(401).json({ error: "Unauthorized" });
		const user = await this.userService.getOne({ id: refresh.id });
		if (!user) return res.status(401).json({ error: "Unauthorized" });
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
