import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_MINUTES, JWT_ACCESS_SECRET, JWT_REFRESH_MINUTES, JWT_REFRESH_SECRET } from "../data/config";
import client from "../rd";

class AuthService {
	private client = client;

	generateTokens = async (accessPayload: any, refreshPayload: any): Promise<{ accessToken: string; refreshToken: string }> => {
		const accessToken = jwt.sign(accessPayload, JWT_ACCESS_SECRET, { algorithm: "HS256", expiresIn: JWT_ACCESS_MINUTES * 60 });
		const refreshToken = jwt.sign(refreshPayload, JWT_REFRESH_SECRET, { algorithm: "HS256", expiresIn: JWT_REFRESH_MINUTES * 60 });
		await this.saveToken(refreshToken, JWT_REFRESH_MINUTES * 60);
		return { accessToken, refreshToken };
	};

	saveToken = async (token: string, ex: number) => {
		try {
			await this.connect();
			await client.set(token, "token", { EX: ex });
		} finally {
			await this.disconnect();
		}
	};

	removeToken = async (token: string) => {
		try {
			await this.connect();
			await client.del(token);
		} finally {
			await this.disconnect();
		}
	};

	tokenDecode = async (token: string, refresh: boolean = false): Promise<any | null> => {
		let decode = null;
		try {
			decode = jwt.verify(token, refresh ? JWT_REFRESH_SECRET : JWT_ACCESS_SECRET, { algorithms: ["HS256"] });
		} catch (e) {}
		return decode;
	};

	isTokenExists = async (token?: string): Promise<boolean> => {
		if (!token) return false;
		try {
			await this.connect();
			return Boolean(await client.exists(token));
		} finally {
			await this.disconnect();
		}
	};

	hashPass = async (password: string): Promise<string> => {
		return bcrypt.hash(password, 7);
	};

	comparePass = async (password: string, encrypted: string): Promise<boolean> => {
		return bcrypt.compare(password, encrypted);
	};

	private connect = async () => {
		if (!this.client.isOpen) {
			await this.client.connect();
		}
	};

	private disconnect = async () => {
		if (this.client.isOpen) {
			await this.client.disconnect();
		}
	};
}

export default AuthService;
