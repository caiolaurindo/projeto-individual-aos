import {Router} from 'express';
import * as formacaoController from '../controllers/formacao.controller.js';

const router = Router();

router.get('/', formacaoController.listar);
router.get('/:id', formacaoController.buscarPorId);
router.post('/', formacaoController.criar);
router.patch('/:id', formacaoController.atualizar);
router.delete('/:id', formacaoController.excluir);

export default router;

