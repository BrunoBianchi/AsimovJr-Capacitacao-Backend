import { User } from "../entities/user.type";
import * as jose from "jose"
const secret_jwt = new TextEncoder().encode(process.env.SECRET_JWT_TOKEN)

export class JWTService {

    public async generateJwtToken(user: User) {
        const alg = 'HS256'
        return await new jose.SignJWT(user as any)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:register')
            .sign(secret_jwt)
    }
}