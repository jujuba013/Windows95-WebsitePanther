import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Chat fake (simula banco de dados)
let chat = [
  {
    name: "Panther",
    chat: "Oi!",
    date: new Date().toISOString(),
    bot: false
  },
  {
    name: "Gabi",
    chat: "Olá!",
    date: new Date().toISOString(),
    bot: false
  }
]

// POST chat (opcional, pra adicionar mensagem)
app.get("/chat/getchat", (req, res) => {
  res.json({ chat });
});

app.post("/chat/send", (req, res) => {
  const newMessage = req.body;
  chat.push(newMessage);
  res.json({ success: true });


    



});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
