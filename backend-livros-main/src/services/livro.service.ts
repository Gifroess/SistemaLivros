import { prisma } from "../prisma/client";

export class LivroService {

    async create(dados: { titulo: string; autor: string; imagem?: string; status: string; review?: string; nota?: number; }, userId: number) {
        await prisma.livro.create({
            data: {
                ...dados,
                userId,
            }
        });
    }

    async delete(id: number, userId: number) {
        await prisma.livro.deleteMany({
            where: {
                id,
                userId
            }
        });
    }

    async findAll(userId: number) {
        return await prisma.livro.findMany({
            where: {
                userId
            }
        });
    }

    async findById(id: number, userId: number) {
        return await prisma.livro.findFirst({
            where: {
                id,
                userId
            }
        });
    }

    async update(id: number, userId: number, dados: { titulo: string; autor: string; imagem?: string; status: string; review?: string; nota?: number; }) {
        await prisma.livro.updateMany({
            where: {
                id,
                userId
            },
            data: dados,
        });
    }
}