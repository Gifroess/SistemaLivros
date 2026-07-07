import { LivroController } from "../controller/livro.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const livroController = new LivroController();

router.use(authMiddleware);
router.get('/busca/google', livroController.buscarNoGoogle);
router.post('/', livroController.create);
router.delete('/:id', livroController.delete);
router.get('/', livroController.findAll);
router.get('/:id', livroController.findById);
router.put('/:id', livroController.update);

export {router as livroRoutes};