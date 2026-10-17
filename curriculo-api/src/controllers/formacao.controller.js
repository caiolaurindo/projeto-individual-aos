import * as formacaoService from "../services/formacao.service.js";
import {
  booleano,
  dataObrigatoria,
  dataOpcional,
  erroRequisicao,
  textoObrigatorio,
  textoOpcional,
  validarId,
} from "../utils/validation.js";

function validarPessoaId(valor) {
  return validarId(valor, "pessoaId");
}

export async function listar(req, res) {
  const pessoaId = req.query.pessoaId
    ? validarPessoaId(req.query.pessoaId)
    : undefined;
  const formacoes = await formacaoService.listarFormacoes(pessoaId);
  return res.status(200).json(formacoes);
}

export async function buscarPorId(req, res) {
  const formacao = await formacaoService.buscarFormacao(
    validarId(req.params.id),
  );
  if (!formacao)
    return res.status(404).json({ erro: "Formação não encontrada." });
  return res.status(200).json(formacao);
}

export async function criar(req, res) {
  const body = req.body ?? {};
  const emAndamento =
    body.emAndamento === undefined
      ? false
      : booleano(body.emAndamento, "emAndamento");
  const dataFim = dataOpcional(body.dataFim, "dataFim");

  if (emAndamento && dataFim) {
    throw erroRequisicao("Uma formação em andamento não pode ter 'dataFim'.");
  }

  const formacao = await formacaoService.criarFormacao({
    instituicao: textoObrigatorio(body.instituicao, "instituicao"),
    curso: textoObrigatorio(body.curso, "curso"),
    nivel: textoOpcional(body.nivel, "nivel"),
    dataInicio: dataObrigatoria(body.dataInicio, "dataInicio"),
    dataFim,
    emAndamento,
    descricao: textoOpcional(body.descricao, "descricao"),
    pessoaId: validarPessoaId(body.pessoaId),
  });
  return res.status(201).json(formacao);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const body = req.body ?? {};
  const data = {};

  if (Object.hasOwn(body, "instituicao"))
    data.instituicao = textoObrigatorio(body.instituicao, "instituicao");
  if (Object.hasOwn(body, "curso"))
    data.curso = textoObrigatorio(body.curso, "curso");
  if (Object.hasOwn(body, "nivel"))
    data.nivel = textoOpcional(body.nivel, "nivel");
  if (Object.hasOwn(body, "dataInicio"))
    data.dataInicio = dataObrigatoria(body.dataInicio, "dataInicio");
  if (Object.hasOwn(body, "dataFim"))
    data.dataFim = dataOpcional(body.dataFim, "dataFim");
  if (Object.hasOwn(body, "emAndamento"))
    data.emAndamento = booleano(body.emAndamento, "emAndamento");
  if (Object.hasOwn(body, "descricao"))
    data.descricao = textoOpcional(body.descricao, "descricao");
  if (Object.hasOwn(body, "pessoaId"))
    data.pessoaId = validarPessoaId(body.pessoaId);

  if (Object.keys(data).length === 0) {
    throw erroRequisicao("Informe ao menos um campo para atualizar.");
  }
  if (data.emAndamento === true && data.dataFim instanceof Date) {
    throw erroRequisicao("Uma formação em andamento não pode ter 'dataFim'.");
  }

  const formacao = await formacaoService.atualizarFormacao(id, data);
  return res.status(200).json(formacao);
}

export async function excluir(req, res) {
  await formacaoService.excluirFormacao(validarId(req.params.id));
  return res.status(204).send();
}
