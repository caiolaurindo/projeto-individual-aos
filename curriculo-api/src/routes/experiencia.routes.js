import { Router } from "express";
import * as experienciaController from "../controllers/experiencia.controller.js";

const router = Router();

router.get("/", experienciaController.listar);
router.get("/:id", experienciaController.buscarPorId);
router.post("/", experienciaController.criar);
router.patch("/:id", experienciaController.atualizar);
router.delete("/:id", experienciaController.excluir);

export default router;
