import * as experienciaService from "../services/experiencia.service.js";
import {
  booleano,
  dataObrigatoria,
  dataOpcional,
  erroRequisicao,
  textoObrigatorio,
  textoOpcional,
  validarId,
} from "../utils/validation.js";

export async function listar(req, res) {
  const pessoaId = req.query.pessoaId
    ? validarId(req.query.pessoaId, "pessoaId")
    : undefined;
  return res
    .status(200)
    .json(await experienciaService.listarExperiencias(pessoaId));
}

export async function buscarPorId(req, res) {
  const experiencia = await experienciaService.buscarExperiencia(
    validarId(req.params.id),
  );
  if (!experiencia)
    return res.status(404).json({ erro: "Experiência não encontrada." });
  return res.status(200).json(experiencia);
}

export async function criar(req, res) {
  const body = req.body ?? {};
  const emAndamento =
    body.emAndamento === undefined
      ? false
      : booleano(body.emAndamento, "emAndamento");
  const dataFim = dataOpcional(body.dataFim, "dataFim");
  if (emAndamento && dataFim) {
    throw erroRequisicao(
      "Uma experiência em andamento não pode ter 'dataFim'.",
    );
  }

  const experiencia = await experienciaService.criarExperiencia({
    empresa: textoObrigatorio(body.empresa, "empresa"),
    cargo: textoObrigatorio(body.cargo, "cargo"),
    tipo: textoOpcional(body.tipo, "tipo"),
    local: textoOpcional(body.local, "local"),
    dataInicio: dataObrigatoria(body.dataInicio, "dataInicio"),
    dataFim,
    emAndamento,
    descricao: textoOpcional(body.descricao, "descricao"),
    pessoaId: validarId(body.pessoaId, "pessoaId"),
  });
  return res.status(201).json(experiencia);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const body = req.body ?? {};
  const data = {};
  if (Object.hasOwn(body, "empresa"))
    data.empresa = textoObrigatorio(body.empresa, "empresa");
  if (Object.hasOwn(body, "cargo"))
    data.cargo = textoObrigatorio(body.cargo, "cargo");
  if (Object.hasOwn(body, "tipo")) data.tipo = textoOpcional(body.tipo, "tipo");
  if (Object.hasOwn(body, "local"))
    data.local = textoOpcional(body.local, "local");
  if (Object.hasOwn(body, "dataInicio"))
    data.dataInicio = dataObrigatoria(body.dataInicio, "dataInicio");
  if (Object.hasOwn(body, "dataFim"))
    data.dataFim = dataOpcional(body.dataFim, "dataFim");
  if (Object.hasOwn(body, "emAndamento"))
    data.emAndamento = booleano(body.emAndamento, "emAndamento");
  if (Object.hasOwn(body, "descricao"))
    data.descricao = textoOpcional(body.descricao, "descricao");
  if (Object.hasOwn(body, "pessoaId"))
    data.pessoaId = validarId(body.pessoaId, "pessoaId");

  if (Object.keys(data).length === 0)
    throw erroRequisicao("Informe ao menos um campo para atualizar.");
  if (data.emAndamento === true && data.dataFim instanceof Date) {
    throw erroRequisicao(
      "Uma experiência em andamento não pode ter 'dataFim'.",
    );
  }

  return res
    .status(200)
    .json(await experienciaService.atualizarExperiencia(id, data));
}

export async function excluir(req, res) {
  await experienciaService.excluirExperiencia(validarId(req.params.id));
  return res.status(204).send();
}
