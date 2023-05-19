import jwt, { SignOptions } from 'jsonwebtoken'

class AuthService {
    public generateJwt = (payload: any, secret: string, options: SignOptions): string => {
        return jwt.sign(payload, secret, options)
    }
}

export default AuthService