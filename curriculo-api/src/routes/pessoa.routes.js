import { Router } from "express";
import * as pessoaController from "../controllers/pessoa.controller.js";

const router = Router();

router.get("/", pessoaController.listar);
router.get("/:id", pessoaController.buscarPorId);
router.post("/", pessoaController.criar);
router.patch("/:id", pessoaController.atualizar);
router.delete("/:id", pessoaController.excluir);

export default router;
