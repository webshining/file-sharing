import { Request, Response } from "express";
import {
	GOOGLE_AUTH_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_SCOPES,
	GOOGLE_TOKEN_URI,
	GOOGLE_USER_INFO_URI,
	JWT_REFRESH_MINUTES,
} from "../data/config";
import { LoginUserDto, RegisterUserDto } from "../dto/user.dto";
import { User } from "../models/user.entity";
import AuthService from "../services/auth.service";
import ModelService from "../services/model.service";

class AuthController {
	private readonly userService = new ModelService<User>(User);
	private readonly authService = new AuthService();

	google = async (req: Request<{}, {}, {}, { state?: string }>, res: Response) => {
		const { state } = req.query;
		const params = new URLSearchParams({
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: GOOGLE_REDIRECT_URI,
			response_type: "code",
			scope: GOOGLE_SCOPES.join(" "),
			access_type: "offline",
			state: state || "",
		});
		return res.redirect(`${GOOGLE_AUTH_URI}?${params}`);
	};

	googleRedirect = async (req: Request<{}, {}, {}, { code: string; state?: string }>, res: Response) => {
		const { code, state } = req.query;
		const { access_token } = await (
			await fetch(GOOGLE_TOKEN_URI, {
				method: "post",
				body: JSON.stringify({
					client_id: GOOGLE_CLIENT_ID,
					client_secret: GOOGLE_CLIENT_SECRET,
					code,
					grant_type: "authorization_code",
					redirect_uri: GOOGLE_REDIRECT_URI,
				}),
			})
		).json();
		const { id: google_id, email } = await (
			await fetch(`${GOOGLE_USER_INFO_URI}?access_token=${access_token}`, { method: "get" })
		).json();
		const user = await this.userService.getOrCreate([{ google_id }, { email }], { google_id, email });
		if (!user.google_id) return res.json({ error: "Wrong login method" });
		const { refreshToken } = await this.authService.generateTokens(user.toJSON(), { email });
		if (state)
			return res
				.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: JWT_REFRESH_MINUTES * 60 * 100 })
				.redirect(state);
		return res.json({ user });
	};

	github = async (req: Request<{}, {}, {}, {}>, res: Response) => {};

	githubRedirect = async (req: Request<{}, {}, {}, {}>, res: Response) => {};

	register = async (req: Request<{}, {}, RegisterUserDto>, res: Response) => {};

	login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {};

	refresh = async (err: any, req: Request, res: Response) => {};

	logout = async (req: Request, res: Response) => {
		return res.clearCookie("refresh_token", { httpOnly: true });
	};
}

export default new AuthController();
