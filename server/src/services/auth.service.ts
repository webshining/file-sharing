import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../data/config'


class AuthService {
    public generateTokens = (accessPayload: object, refreshPayload: object): {accessToken: string, refreshToken: string} => {
        const accessToken: string = jwt.sign(accessPayload, JWT_ACCESS_SECRET, {expiresIn: 10*60})
        const refreshToken: string = jwt.sign(refreshPayload, JWT_REFRESH_SECRET, {expiresIn: 24*60*60})
        return {accessToken, refreshToken}
    }
}

export default AuthService