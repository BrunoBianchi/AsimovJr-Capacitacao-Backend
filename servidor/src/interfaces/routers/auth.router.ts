import express, { Request, Response } from "express"
import { z } from "zod"
export const authRouter: express.Router = express.Router();
import { UserService } from "../../services/user.service";
const crude = new UserService();
authRouter.get('/sign-in', async (req: Request, res: Response) => {
    try {
        const params = z.object({
            name: z.string(),
            password: z.string(),
            email: z.string(),
        }).required({ name: true, password: true, email: true }).parse(req.body)
        const response = await crude.createUser(params);
        return res.json({ data: response })
    } catch (err) {
        return res.status(401).send(err)
    }

})

