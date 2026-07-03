import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService()

export class AuthController
{

    async create(req: Request, res: Response)
    {
        try{

            const{email,senha} = req.body;

            const user = await authService.create(email,senha);

            res.json(user);

        }catch (erro) {

            res.status(400).json({
                message:
                erro instanceof Error
                ? erro.message
                : "Error"
            })

        }
    }

    async login(req: Request, res: Response)
    {
        try{

            const {email, senha} = req.body;

            const resposta = await authService.login(email, senha);

            res.cookie("token", resposta.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });

            res.json({
                sucess: true
            });

        } catch (error) {

            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Error"
            })

        }
    }

    async logout(req: Request, res: Response)
    {
        res.clearCookie("token");
        res.json({
            sucess: true,
        });
    }
}