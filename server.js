const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configurado para aceitar frontend da Vercel e Codespaces
const corsOptions = {
  origin: [
    "https://noticias-frontend-lime.vercel.app", // Produção - Vercel
    "https://*.github.dev", // Codespaces
    "http://localhost:3000", // Local
    "http://localhost:5173", // Local (Vite)
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));

// Banco de dados fictício
let noticias = [
  {
    id: 1,
    titulo: "CI/CD revoluciona o desenvolvimento",
    descricao: "Saiba como automação melhora a produtividade",
    categoria: "Tecnologia",
    data: "2024-01-15"
  },
  {
    id: 2,
    titulo: "Render lança novos recursos gratuitos",
    descricao: "Plano free agora inclui mais memória",
    categoria: "Plataformas",
    data: "2024-01-14"
  }
];

// GET: listar todas as notícias
app.get("/noticias", (req, res) => {
  res.json({
    mensagem: "Notícias carregadas",
    total: noticias.length,
    noticias: noticias
  });
});

// GET: notícia por ID
app.get("/noticias/:id", (req, res) => {
  const noticia = noticias.find(n => n.id == req.params.id);
  if (!noticia) {
    return res.status(404).json({ erro: "Notícia não encontrada" });
  }
  res.json(noticia);
});

// POST: criar notícia
app.post("/noticias", (req, res) => {
  const { titulo, descricao, categoria } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: "Título e descrição obrigatórios" });
  }

  const novaNoticia = {
    id: Math.max(...noticias.map(n => n.id)) + 1,
    titulo,
    descricao,
    categoria: categoria || "Geral",
    data: new Date().toISOString().split('T')[0]
  };

  noticias.push(novaNoticia);
  res.status(201).json({ mensagem: "Notícia criada", noticia: novaNoticia });
});

// PUT: atualizar notícia
app.put("/noticias/:id", (req, res) => {
  const noticia = noticias.find(n => n.id == req.params.id);
  if (!noticia) {
    return res.status(404).json({ erro: "Notícia não encontrada" });
  }

  const { titulo, descricao, categoria } = req.body;

  if (titulo) noticia.titulo = titulo;
  if (descricao) noticia.descricao = descricao;
  if (categoria) noticia.categoria = categoria;

  res.json({ mensagem: "Notícia atualizada", noticia });
});

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "Backend de Notícias rodando com CI/CD",
    versao: "1.1.0",
    cors_ativo: true,
    frontend_integrado: true
  });
});

// Rota API v1
app.get("/v1", (req, res) => {
  const agora = new Date();
  const data_formatada = agora.toLocaleString("pt-BR");
  
  res.json({
    message: "Api v1 respondendo no container docker...",
    chamada_em: data_formatada
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
  console.log(`CORS habilitado para: ${corsOptions.origin}`);
});