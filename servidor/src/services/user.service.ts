import { User } from "../entities/user.type";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
export class UserService {
    public async findUserByEmail(email: string) {
        return await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }

    public async createUser(user: User) {
        try {
            if (await this.findUserByEmail(user.email)) throw 'Email already in use! '
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            const response = await prisma.user.create({ data: user });
            return response;
        } catch (err) {
            throw err;
        }

    }
}

