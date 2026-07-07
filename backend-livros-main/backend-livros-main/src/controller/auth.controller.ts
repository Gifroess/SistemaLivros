import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export class AuthController {
    
    async create(req: Request, res: Response) {
        try {
            const { email, senha, confirmacaoSenha } = req.body;

            // Validação 1: Checar se algum campo obrigatório está vazio
            if (!email || !senha || !confirmacaoSenha) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            // Validação 2: Checar se o email é válido usando Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ message: "Email inválido." });
                return;
            }

            // Validação 3: Checar se a senha tem no mínimo 4 dígitos
            if (senha.length < 4) {
                res.status(400).json({ message: "A senha deve ter no mínimo 4 dígitos." });
                return;
            }

            // Validação 4: Checar se a senha e a confirmação coincidem
            if (senha !== confirmacaoSenha) {
                res.status(400).json({ message: "A senha e a confirmação de senha não coincidem." });
                return;
            }

            const user = await authService.create(email, senha);
            res.json(user);

        } catch (erro) {
            res.status(400).json({
                message: erro instanceof Error ? erro.message : "Error"
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            // Validação de segurança básica também no login
            if (!email || !senha) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            const resposta = await authService.login(email, senha);

            res.cookie("token", resposta.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });

            res.json({
                success: true
            });

        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "Error"
            });
        }
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("token");
        res.json({
            success: true,
        });
    }
}