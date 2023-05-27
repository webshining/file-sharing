import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../data/config'
import client from '../rd'


class AuthService {
    public generateTokens = async (accessPayload: object, refreshPayload: object): Promise<{accessToken: string, refreshToken: string}> => {
        const accessToken: string = jwt.sign(accessPayload, JWT_ACCESS_SECRET, {expiresIn: 10*60})
        const refreshToken: string = jwt.sign(refreshPayload, JWT_REFRESH_SECRET, {expiresIn: 24*60*60})
        await client.connect()
        await client.set(refreshToken, 'refreshToken', {EX: 24*60*60})
        await client.disconnect()
        return {accessToken, refreshToken}
    }

    public tokenExists = async (token: string): Promise<boolean> => {
        await client.connect()
        const exists = await client.exists(token)
        await client.disconnect()
        return exists > 0
    }

    public removeToken = async (token: string) => {
        await client.connect()
        await client.del(token)
        await client.disconnect()
    }

    public hashPass = async (password: string): Promise<string> => {
        return bcrypt.hash(password, 7)
    }

    public comparePass = async (password: string, encrypted: string): Promise<boolean> => {
        return bcrypt.compare(password, encrypted)
    }
}

export default AuthService