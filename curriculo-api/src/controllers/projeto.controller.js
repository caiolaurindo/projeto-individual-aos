import * as projetoService from "../services/projeto.service.js";
import {
  dataOpcional,
  erroRequisicao,
  listaDeTextos,
  textoObrigatorio,
  textoOpcional,
  validarId,
} from "../utils/validation.js";

export async function listar(req, res) {
  const pessoaId = req.query.pessoaId
    ? validarId(req.query.pessoaId, "pessoaId")
    : undefined;
  return res.status(200).json(await projetoService.listarProjetos(pessoaId));
}

export async function buscarPorId(req, res) {
  const projeto = await projetoService.buscarProjeto(validarId(req.params.id));
  if (!projeto)
    return res.status(404).json({ erro: "Projeto não encontrado." });
  return res.status(200).json(projeto);
}

export async function criar(req, res) {
  const body = req.body ?? {};
  const projeto = await projetoService.criarProjeto({
    nome: textoObrigatorio(body.nome, "nome"),
    descricao: textoOpcional(body.descricao, "descricao"),
    url: textoOpcional(body.url, "url"),
    repositorio: textoOpcional(body.repositorio, "repositorio"),
    tecnologias:
      body.tecnologias === undefined
        ? []
        : listaDeTextos(body.tecnologias, "tecnologias"),
    dataInicio: dataOpcional(body.dataInicio, "dataInicio"),
    dataFim: dataOpcional(body.dataFim, "dataFim"),
    pessoaId: validarId(body.pessoaId, "pessoaId"),
  });
  return res.status(201).json(projeto);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const body = req.body ?? {};
  const data = {};
  if (Object.hasOwn(body, "nome"))
    data.nome = textoObrigatorio(body.nome, "nome");
  if (Object.hasOwn(body, "descricao"))
    data.descricao = textoOpcional(body.descricao, "descricao");
  if (Object.hasOwn(body, "url")) data.url = textoOpcional(body.url, "url");
  if (Object.hasOwn(body, "repositorio"))
    data.repositorio = textoOpcional(body.repositorio, "repositorio");
  if (Object.hasOwn(body, "tecnologias"))
    data.tecnologias = listaDeTextos(body.tecnologias, "tecnologias");
  if (Object.hasOwn(body, "dataInicio"))
    data.dataInicio = dataOpcional(body.dataInicio, "dataInicio");
  if (Object.hasOwn(body, "dataFim"))
    data.dataFim = dataOpcional(body.dataFim, "dataFim");
  if (Object.hasOwn(body, "pessoaId"))
    data.pessoaId = validarId(body.pessoaId, "pessoaId");

  if (Object.keys(data).length === 0)
    throw erroRequisicao("Informe ao menos um campo para atualizar.");
  if (
    data.dataInicio instanceof Date &&
    data.dataFim instanceof Date &&
    data.dataFim < data.dataInicio
  ) {
    throw erroRequisicao("'dataFim' não pode ser anterior a 'dataInicio'.");
  }

  return res.status(200).json(await projetoService.atualizarProjeto(id, data));
}

export async function excluir(req, res) {
  await projetoService.excluirProjeto(validarId(req.params.id));
  return res.status(204).send();
}
