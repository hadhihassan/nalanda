import { config } from 'dotenv';
import jwt from 'jsonwebtoken'


export async function generateJwtToken(id, role) {
    try {
        const secret = config.jwtSecret ?? "default_secret";

        const expiresIn = (config.jwtExpire ?? "7d")

        return jwt.sign({ id, role }, secret, { expiresIn });
    } catch (error) {
        console.log(error)
    }
}

export async function verifyJwt(token) {
    return jwt.verify(token.slice(7), config.jwtSecret);
}