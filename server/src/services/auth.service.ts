import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../data/config'
import client from '../rd'


class AuthService {
    generateTokens = async (accessPayload: any, refreshPayload: any): Promise<{accessToken: string, refreshToken: string}> => {
        const accessToken = jwt.sign(accessPayload, JWT_ACCESS_SECRET, {expiresIn: 60*25})
        const refreshToken = jwt.sign(refreshPayload, JWT_REFRESH_SECRET, {expiresIn: 60*60*24*2})
        await client.connect()
        await client.set(refreshToken, 'refreshToken', {EX: 60*60*24*2})
        await client.disconnect()
        return {accessToken, refreshToken}
    }

    refreshDecode = async (token: string): Promise<{err?: string, decode?: any}> => {
        let err, decode = null
        await client.connect()
        const exists = await client.exists(token)
        if(!exists)
            err = 'Token does not exist'
        try {
            decode = jwt.verify(token, JWT_REFRESH_SECRET)
        } catch(e) {
            err = 'Token expired'
            await client.del(token)
        }
        await client.disconnect()
        return {err, decode}
    }

    hashPass = async (password: string): Promise<string> => {
        return bcrypt.hash(password, 7)
    }

    comparePass = async (password: string, encrypted: string): Promise<boolean> => {
        return bcrypt.compare(password, encrypted)
    }
}

export default AuthService