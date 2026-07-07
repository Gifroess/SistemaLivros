import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

    async create(email: string, senha: string) {

        const isUserCreated = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        // Requisito 7: Garantir que não existe outro usuário com o mesmo email
        if (isUserCreated) {
            throw new Error("Já existe um usuário cadastrado com este email.");
        }

        const senhaHashed = await bcrypt.hash(senha, 10);

        const dados = {
            email,
            senha: senhaHashed
        };

        const user = await prisma.user.create({
            data: dados,
        });

        return {
            id: user.id,
            email: user.email
        };
    }

    async login(email: string, senha: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            throw new Error("Usuário ou senha inválido.");
        }

        const senhaMatch = await bcrypt.compare(senha, user.senha);

        if (!senhaMatch) {
            throw new Error("Usuário ou senha inválido.");
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1d'
            }
        );
        return {
            token,
        };
    }
}