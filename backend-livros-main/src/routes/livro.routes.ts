import { LivroController } from "../controller/livro.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const livroController = new LivroController();

router.use(authMiddleware);
router.get('/busca/google', livroController.buscarNoGoogle);
router.post('/', livroController.create);
router.put('/:id', livroController.update);
router.delete('/:id', livroController.delete);
router.get('/', livroController.findAll);



export {router as livroRoutes};