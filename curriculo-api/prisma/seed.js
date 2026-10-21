import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = (valor) => new Date(`${valor}T00:00:00.000Z`);

async function salvarFormacao(tx, pessoaId, formacao) {
  const existente = await tx.formacao.findFirst({
    where: {
      pessoaId,
      instituicao: formacao.instituicao,
      curso: formacao.curso,
    },
  });

  if (existente) {
    return tx.formacao.update({ where: { id: existente.id }, data: formacao });
  }

  return tx.formacao.create({ data: { ...formacao, pessoaId } });
}

async function salvarExperiencia(tx, pessoaId, experiencia) {
  const existente = await tx.experiencia.findFirst({
    where: {
      pessoaId,
      empresa: experiencia.empresa,
      cargo: experiencia.cargo,
      dataInicio: experiencia.dataInicio,
    },
  });

  if (existente) {
    return tx.experiencia.update({ where: { id: existente.id }, data: experiencia });
  }

  return tx.experiencia.create({ data: { ...experiencia, pessoaId } });
}

async function salvarProjeto(tx, pessoaId, projeto) {
  const existente = await tx.projeto.findFirst({
    where: { pessoaId, nome: projeto.nome },
  });

  if (existente) {
    return tx.projeto.update({ where: { id: existente.id }, data: projeto });
  }

  return tx.projeto.create({ data: { ...projeto, pessoaId } });
}

async function salvarHabilidade(tx, pessoaId, habilidade) {
  return tx.habilidade.upsert({
    where: {
      pessoaId_nome: {
        pessoaId,
        nome: habilidade.nome,
      },
    },
    create: { ...habilidade, pessoaId },
    update: { nivel: habilidade.nivel },
  });
}

const curriculos = [
  {
    pessoa: {
      nome: "Ana Martins",
      email: "ana.martins@example.com",
      telefone: "+55 11 90000-0001",
      resumo:
        "Desenvolvedora full stack em início de carreira, com foco em aplicações web acessíveis e APIs REST. Gosta de transformar problemas do dia a dia em soluções simples e bem documentadas.",
      linkedin: "https://example.com/ana-martins-linkedin",
      github: "https://example.com/ana-martins-github",
    },
    formacoes: [
      {
        instituicao: "Instituto Técnico Exemplo",
        curso: "Técnico em Informática",
        nivel: "Técnico",
        dataInicio: data("2020-02-01"),
        dataFim: data("2021-12-15"),
        emAndamento: false,
        descricao: "Fundamentos de programação, redes e bancos de dados.",
      },
      {
        instituicao: "Universidade Exemplo",
        curso: "Análise e Desenvolvimento de Sistemas",
        nivel: "Tecnólogo",
        dataInicio: data("2023-02-01"),
        dataFim: null,
        emAndamento: true,
        descricao: "Ênfase em desenvolvimento web e engenharia de software.",
      },
    ],
    experiencias: [
      {
        empresa: "Estúdio Digital Exemplo",
        cargo: "Estagiária de Desenvolvimento Web",
        tipo: "Estágio",
        local: "São Paulo, SP",
        dataInicio: data("2024-03-01"),
        dataFim: data("2025-06-30"),
        emAndamento: false,
        descricao:
          "Implementou componentes de interface, corrigiu defeitos e participou de revisões de código em uma aplicação React.",
      },
      {
        empresa: "Nuvem Exemplo Tecnologia",
        cargo: "Desenvolvedora Júnior",
        tipo: "Tempo integral",
        local: "Remoto",
        dataInicio: data("2025-08-01"),
        dataFim: null,
        emAndamento: true,
        descricao:
          "Desenvolve endpoints Express, integra aplicações com PostgreSQL e mantém documentação de APIs.",
      },
    ],
    projetos: [
      {
        nome: "Organizador de Estudos",
        descricao:
          "Aplicação para planejar matérias, registrar sessões de estudo e acompanhar metas semanais.",
        url: "https://example.com/organizador-estudos",
        repositorio: "https://example.com/ana/organizador-estudos",
        tecnologias: ["React", "Node.js", "Express", "PostgreSQL"],
        dataInicio: data("2024-05-01"),
        dataFim: data("2024-10-15"),
      },
      {
        nome: "API de Receitas",
        descricao:
          "API REST para cadastrar receitas, ingredientes e categorias, com filtros por restrições alimentares.",
        url: "https://example.com/api-receitas",
        repositorio: "https://example.com/ana/api-receitas",
        tecnologias: ["JavaScript", "Express", "Prisma", "PostgreSQL"],
        dataInicio: data("2025-02-01"),
        dataFim: null,
      },
    ],
    habilidades: [
      { nome: "JavaScript", nivel: "Avançado" },
      { nome: "React", nivel: "Intermediário" },
      { nome: "Node.js", nivel: "Intermediário" },
      { nome: "PostgreSQL", nivel: "Intermediário" },
      { nome: "Git", nivel: "Intermediário" },
    ],
  },
  {
    pessoa: {
      nome: "Rafael Costa",
      email: "rafael.costa@example.com",
      telefone: "+55 21 90000-0002",
      resumo:
        "Desenvolvedor backend com experiência em integrações, automação de processos e modelagem de dados. Valoriza código legível, segurança e colaboração entre equipes.",
      linkedin: "https://example.com/rafael-costa-linkedin",
      github: "https://example.com/rafael-costa-github",
    },
    formacoes: [
      {
        instituicao: "Colégio Técnico Modelo",
        curso: "Técnico em Redes de Computadores",
        nivel: "Técnico",
        dataInicio: data("2019-02-01"),
        dataFim: data("2020-12-15"),
        emAndamento: false,
        descricao: "Redes, sistemas operacionais e fundamentos de segurança.",
      },
      {
        instituicao: "Faculdade Modelo de Tecnologia",
        curso: "Ciência da Computação",
        nivel: "Bacharelado",
        dataInicio: data("2022-02-01"),
        dataFim: null,
        emAndamento: true,
        descricao: "Estudos de algoritmos, bancos de dados e sistemas distribuídos.",
      },
    ],
    experiencias: [
      {
        empresa: "Soluções Digitais Modelo",
        cargo: "Assistente de Suporte Técnico",
        tipo: "Tempo integral",
        local: "Rio de Janeiro, RJ",
        dataInicio: data("2022-06-01"),
        dataFim: data("2024-01-31"),
        emAndamento: false,
        descricao:
          "Atendeu chamados, automatizou tarefas recorrentes e documentou procedimentos internos.",
      },
      {
        empresa: "Plataforma Exemplo Serviços",
        cargo: "Desenvolvedor Backend Júnior",
        tipo: "Tempo integral",
        local: "Híbrido",
        dataInicio: data("2024-03-01"),
        dataFim: null,
        emAndamento: true,
        descricao:
          "Mantém serviços Node.js, integra APIs de terceiros e otimiza consultas PostgreSQL.",
      },
    ],
    projetos: [
      {
        nome: "Controle de Despesas Pessoais",
        descricao:
          "API para registrar despesas, organizar categorias e gerar resumos mensais.",
        url: "https://example.com/controle-despesas",
        repositorio: "https://example.com/rafael/controle-despesas",
        tecnologias: ["Node.js", "Express", "PostgreSQL", "Prisma"],
        dataInicio: data("2023-04-01"),
        dataFim: data("2023-09-30"),
      },
      {
        nome: "Integração de Pedidos",
        descricao:
          "Serviço de demonstração que recebe pedidos e sincroniza dados entre sistemas via API.",
        url: "https://example.com/integracao-pedidos",
        repositorio: "https://example.com/rafael/integracao-pedidos",
        tecnologias: ["JavaScript", "Node.js", "Express", "Docker"],
        dataInicio: data("2025-01-15"),
        dataFim: null,
      },
    ],
    habilidades: [
      { nome: "Node.js", nivel: "Avançado" },
      { nome: "Express", nivel: "Avançado" },
      { nome: "PostgreSQL", nivel: "Intermediário" },
      { nome: "Docker", nivel: "Básico" },
      { nome: "Python", nivel: "Intermediário" },
    ],
  },
  {
    id: 8,
    pessoa: {
      nome: "Caio Laurindo",
      email: "caiolaurindodev@gmail.com",
      telefone: "+55 81 98403-6075",
      resumo: "Desenvolvedor Full Stack com experiência em aplicações web e produtos digitais, atuando na PERPART no desenvolvimento do Hub de Inovação, com foco em front-end e contribuições back-end. Experiência com metodologias ágeis, testes automatizados e boas práticas de qualidade de código. Também atuou como Instrutor de Programação Full Stack com IA e participou da Residência Tecnológica do Porto Digital.",
      linkedin: null,
      github: null,
    },
    formacoes: [
      {
        instituicao: "Universidade Católica de Pernambuco (UNICAP)",
        curso: "Sistemas para Internet",
        nivel: "Tecnólogo",
        dataInicio: data("2025-02-01"),
        dataFim: null,
        emAndamento: true,
        descricao: "Graduação em Sistemas para Internet. Atualmente no 4º período.",
      },
      {
        instituicao: "Infinity School",
        curso: "Programação Full Stack com IA",
        nivel: "Curso profissionalizante",
        dataInicio: data("2024-05-01"),
        dataFim: data("2025-07-31"),
        emAndamento: false,
        descricao: "Curso de Programação Full Stack com Inteligência Artificial, com carga horária de 300 horas.",
      },
    ],
    experiencias: [
      {
        empresa: "PERPART — Governo de Pernambuco",
        cargo: "Estagiário de Desenvolvimento Full Stack",
        tipo: "Estágio",
        local: "Recife, PE",
        dataInicio: data("2026-06-01"),
        dataFim: null,
        emAndamento: true,
        descricao: "Desenvolvimento do Hub de Inovação para gestão de produtos digitais, organizações, setores e informações de colaboradores. Atuação com Next.js, React, TypeScript, Tailwind CSS, Node.js e NestJS. Desenvolvimento e integração de APIs REST. Criação e manutenção de testes automatizados com Vitest e Jest, mantendo cobertura superior a 90%. Uso de SonarQube, GitLab e Jira seguindo metodologia ágil Scrum.",
      },
      {
        empresa: "Infinity School",
        cargo: "Instrutor de Programação Full Stack com IA",
        tipo: "Instrutoria",
        local: "Recife, PE",
        dataInicio: data("2025-12-01"),
        dataFim: data("2026-08-31"),
        emAndamento: false,
        descricao: "Ministração de mais de 190 aulas de programação Full Stack com foco em projetos práticos. Alcance de mais de 96% de aprovação dos alunos. Criação de materiais de estudo e workshops para módulos avançados de Banco de Dados, GitHub e Inteligência Artificial. Orientação de alunos na implementação de projetos e resolução de problemas técnicos.",
      },
      {
        empresa: "Porto Digital",
        cargo: "Monitor de Laboratório de Inovação",
        tipo: "Monitoria",
        local: "Recife, PE",
        dataInicio: data("2026-02-01"),
        dataFim: data("2026-08-31"),
        emAndamento: false,
        descricao: "Suporte técnico à infraestrutura, aos computadores e aos estudantes do laboratório de inovação, garantindo o funcionamento contínuo do espaço. Apoio na organização e execução de eventos, workshops e atividades do ecossistema de inovação.",
      },
    ],
    projetos: [
      {
        nome: "Filme da Vez",
        descricao: "Plataforma de recomendação de filmes com Inteligência Artificial, analisando preferências e interações dos usuários para oferecer sugestões personalizadas. Arquitetura Full Stack em MVC, autenticação, APIs REST próprias e integração com APIs externas. Inclui funcionalidades para curtir e marcar filmes como assistidos, histórico de interações, testes automatizados e deploy via Vercel e Railway.",
        url: null,
        repositorio: null,
        tecnologias: [
          "JavaScript",
          "React",
          "Node.js",
          "APIs REST",
          "Inteligência Artificial",
          "MVC",
          "Vercel",
          "Railway",
        ],
        dataInicio: null,
        dataFim: null,
      },
      {
        nome: "Sinaliza",
        descricao: "Plataforma de tradução de vídeos para LIBRAS por meio de avatar 3D, desenvolvida no projeto da Residência Tecnológica Porto Digital em parceria com a Globo. Inclui processamento de arquivos SRT, sincronização entre legendas e animações, validação de vocabulário, sugestão de sinônimos, integração com VLibras e testes de validação da solução.",
        url: null,
        repositorio: null,
        tecnologias: [
          "Python",
          "Inteligência Artificial",
          "VLibras",
          "Processamento de arquivos SRT",
          "Testes de validação",
        ],
        dataInicio: null,
        dataFim: null,
      },
      {
        nome: "Lotus",
        descricao: "Plataforma de apoio a mulheres com endometriose, desenvolvida na Residência Tecnológica Porto Digital em parceria com a Beyond Co. Permite acompanhamento de ciclo, sintomas e medicações, com geração de relatórios personalizados. Participação em pesquisa, definição do problema e prototipação em equipe multidisciplinar.",
        url: null,
        repositorio: null,
        tecnologias: [
          "Pesquisa de produto",
          "Prototipação",
          "Design de soluções digitais",
        ],
        dataInicio: null,
        dataFim: null,
      },
    ],
    habilidades: [
      {
        nome: "JavaScript",
        nivel: "Intermediário",
      },
      {
        nome: "HTML",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "CSS",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "TypeScript",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "React",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Next.js",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Node.js",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "NestJS",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Python",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Java",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "SQL",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Flask",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Django",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "APIs REST",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "PostgreSQL",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "MySQL",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Prisma ORM",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "SQLAlchemy",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Tailwind CSS",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Mobile First",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Figma",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "UI/UX",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Jest",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Vitest",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "TDD",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "SonarQube",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "MVC",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Clean Architecture",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "SOLID",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Domain-Driven Design (DDD)",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Docker",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Git",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "GitLab",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Jira",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Vercel",
        nivel: "Não especificado no currículo",
      },
      {
        nome: "Railway",
        nivel: "Não especificado no currículo",
      },
    ],
  }

];

async function salvarCurriculo(tx, curriculo) {
  const pessoa = await tx.pessoa.upsert({
    where: { email: curriculo.pessoa.email },
    create: curriculo.pessoa,
    update: curriculo.pessoa,
  });

  if (curriculo.id && pessoa.id !== curriculo.id) {
    throw new Error("ID inesperado para " + pessoa.email + ": esperado " + curriculo.id + ", recebido " + pessoa.id);
  }

  for (const formacao of curriculo.formacoes) {
    await salvarFormacao(tx, pessoa.id, formacao);
  }
  for (const experiencia of curriculo.experiencias) {
    await salvarExperiencia(tx, pessoa.id, experiencia);
  }
  for (const projeto of curriculo.projetos) {
    await salvarProjeto(tx, pessoa.id, projeto);
  }
  for (const habilidade of curriculo.habilidades) {
    await salvarHabilidade(tx, pessoa.id, habilidade);
  }

  console.log(`Currículo seed criado/atualizado: ${pessoa.nome} (${pessoa.email})`);
}

async function main() {
  await prisma.$transaction(async (tx) => {
    for (const curriculo of curriculos) {
      await salvarCurriculo(tx, curriculo);
    }
  }, { maxWait: 10000, timeout: 30000 });
}

main()
  .catch((erro) => {
    console.error("Falha ao inserir os currículos seed:", erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
