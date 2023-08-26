import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_MINUTES, JWT_ACCESS_SECRET, JWT_REFRESH_MINUTES, JWT_REFRESH_SECRET } from "../data/config";
import client from "../rd";

class AuthService {
	generateTokens = async (
		accessPayload: any,
		refreshPayload: any
	): Promise<{ accessToken: string; refreshToken: string }> => {
		const accessToken = jwt.sign(accessPayload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_MINUTES * 60 * 60 });
		const refreshToken = jwt.sign(refreshPayload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_MINUTES * 60 * 60 });
		await this.saveToken(refreshToken, JWT_REFRESH_MINUTES*60)
		return { accessToken, refreshToken };
	};

	saveToken = async (token: string, ex: number) => {
		await client.connect();
		await client.set(token, "token", { EX: ex });
		await client.disconnect();
	}

	removeToken = async (token: string) => {
		await client.connect();
		await client.del(token)
		await client.disconnect();
	}

	tokenDecode = async (token: string, refresh: boolean = false): Promise<any | null> => {
		let decode = null;
		try {
			decode = jwt.verify(token, refresh ? JWT_REFRESH_SECRET : JWT_ACCESS_SECRET);
		} catch (e) {
			await client.del(token);
		}
		return decode
	};

	isTokenExists = async (token: string): Promise<boolean> => {
		await client.connect()
		const exists = await client.exists(token);
		await client.disconnect()
		return Boolean(exists)
	}

	hashPass = async (password: string): Promise<string> => {
		return bcrypt.hash(password, 7);
	};

	comparePass = async (password: string, encrypted: string): Promise<boolean> => {
		return bcrypt.compare(password, encrypted);
	};
}

export default AuthService;
