import { Router } from "express";
import * as habilidadeController from "../controllers/habilidade.controller.js";

const router = Router();

router.get("/", habilidadeController.listar);
router.get("/:id", habilidadeController.buscarPorId);
router.post("/", habilidadeController.criar);
router.patch("/:id", habilidadeController.atualizar);
router.delete("/:id", habilidadeController.excluir);

export default router;
