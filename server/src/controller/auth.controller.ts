import { Request, Response } from "express";
import {
	GITHUB_AUTH_URI,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI,
	GITHUB_SCOPES,
	GITHUB_TOKEN_URI,
	GITHUB_USER_INFO_URI,
	GOOGLE_AUTH_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_SCOPES,
	GOOGLE_USER_INFO_URI
} from "../data/config";
import { User } from "../models/user.entity";
import AuthService from "../services/auth.service";
import ModelService from "../services/model.service";
import { GOOGLE_TOKEN_URI } from "./../data/config";

class AuthController {
	private readonly userService = new ModelService<User>(User);
	private readonly authService = new AuthService();

	google = async (req: Request<{}, {}, {}, { code?: string }>, res: Response) => {
		const { code } = req.query;
		if (code) {
			const { id_token, access_token: googleAccessToken }: any = await (
				await fetch(GOOGLE_TOKEN_URI, {
					method: "post",
					body: JSON.stringify({
						client_id: GOOGLE_CLIENT_ID,
						client_secret: GOOGLE_CLIENT_SECRET,
						redirect_uri: GOOGLE_REDIRECT_URI,
						grant_type: "authorization_code",
						code,
					}),
				})
			).json();
			const { email, name } = await (
				await fetch(GOOGLE_USER_INFO_URI + `?access_token=${googleAccessToken}`, {
					method: "get",
					headers: { Authorization: `Bearer ${id_token}` },
				})
			).json();
			const user = await this.userService.getOrCreate(
				{ email, auth: "google" },
				{ name, email, auth: "google" },
				["email"]
			);
			const {accessToken, refreshToken} = this.authService.generateTokens({user: user.id}, {user: user.id})
			return res.cookie('refreshToken', refreshToken, {maxAge: 24*60*60*1000, httpOnly: true, secure: true}).json({ user, accessToken });
		} else {
			const stringifiedParams = new URLSearchParams({
				client_id: GOOGLE_CLIENT_ID,
				redirect_uri: GOOGLE_REDIRECT_URI,
				scope: GOOGLE_SCOPES.join(" "),
				response_type: "code",
				access_type: "offline",
				prompt: "consent",
			});
			const googleLoginUrl = `${GOOGLE_AUTH_URI}?${stringifiedParams}`;
			return res.redirect(googleLoginUrl);
		}
	};

	github = async (req: Request<{}, {}, {}, { code?: string }>, res: Response) => {
		const { code } = req.query;
		if (code) {
			const stringifiedParams = new URLSearchParams({
				client_id: GITHUB_CLIENT_ID,
				client_secret: GITHUB_CLIENT_SECRET,
				code,
				redirect_uri: GITHUB_REDIRECT_URI,
			});
			const { access_token } = await (
				await fetch(`${GITHUB_TOKEN_URI}?${stringifiedParams}`, {
					method: "post",
					headers: { Accept: "application/json" },
				})
			).json();
			const data = await (
				await fetch(GITHUB_USER_INFO_URI, {
					method: "get",
					headers: { Authorization: `Bearer ${access_token}` },
				})
			).json();
			return res.json(data);
		} else {
			const stringifiedParams = new URLSearchParams({
				client_id: GITHUB_CLIENT_ID,
				redirect_uri: GITHUB_REDIRECT_URI,
				scope: GITHUB_SCOPES.join(' ')
			});
			return res.redirect(`${GITHUB_AUTH_URI}?${stringifiedParams}`);
		}
	};
}

export default new AuthController();
