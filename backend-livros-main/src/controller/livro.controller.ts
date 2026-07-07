import { Request, Response } from "express";
import { LivroService } from "../services/livro.service";
import { AuthPayload } from "../tipos/auth-payload";
import { GoogleBooksService } from "../services/google.service";

const livroService = new LivroService();
const googleBooksService = new GoogleBooksService();

export class LivroController {

    async buscarNoGoogle(req: Request, res: Response) {
        try {
            const termo = req.query.q as string;
            
            if (!termo) {
                res.status(400).json({ message: "É necessário enviar um termo de busca." });
                return;
            }

            const resultados = await googleBooksService.buscarLivroExterno(termo);
            res.status(200).json(resultados);
            
        } catch (erro) {
            res.status(500).json({
                message: erro instanceof Error ? erro.message : "Erro interno"
            });
        }
    }

    async create(req: Request, res: Response) {
        const dados = req.body;
        const user = res.locals.user as AuthPayload;

        await livroService.create(dados, user.id);
        res.status(200).send();
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = res.locals.user as AuthPayload;

        await livroService.delete(id, user.id);
        res.status(200).send();
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = res.locals.user as AuthPayload;
        const dados = req.body;
        
        await livroService.update(id, user.id, dados);
        res.status(200).send();
    }

    async findAll(req: Request, res: Response) {
        const user = res.locals.user as AuthPayload;

        const livros = await livroService.findAll(user.id);
        res.status(200).json(livros);
    }

    async findById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = res.locals.user as AuthPayload;
        
        const livro = await livroService.findById(id, user.id);
        res.status(200).json(livro);
    }
}