import express, { Request, Response } from "express"
import { z } from "zod"
export const authRouter: express.Router = express.Router();
import { UserService } from "../../services/user.service";
import { JWTService } from "../../services/jwt.service";
import { User } from "../../entities/user.type";
import bcrypt from "bcrypt"

const jwt = new JWTService();
const crude = new UserService();
authRouter.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const params = z.object({
            name: z.string(),
            password: z.string(),
            email: z.string(),
        }).required({ name: true, password: true, email: true }).parse(req.body)
        const response = await crude.createUser(params) as User;
        res.cookie('accessToken', await jwt.generateJwtToken(response));
        return res.json({ data: response })

    } catch (err) {
        return res.status(401).send(err)
    }
})

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const params = z.object({
            email: z.string(),
            password: z.string()
        }).required({ email: true, password: true }).parse(req.body);
        const user = await crude.getUserByEmailAndPassword(params)
        res.cookie('accessToken', await jwt.generateJwtToken(user));
        res.send("Logged in!")
    } catch (err) {
        return res.status(401).send("Email or password Incorrect!")
    }

})


