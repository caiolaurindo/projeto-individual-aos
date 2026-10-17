import { Router } from "express";
import * as projetoController from "../controllers/projeto.controller.js";

const router = Router();

router.get("/", projetoController.listar);
router.get("/:id", projetoController.buscarPorId);
router.post("/", projetoController.criar);
router.patch("/:id", projetoController.atualizar);
router.delete("/:id", projetoController.excluir);

export default router;
