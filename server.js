import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import streamifier from 'streamifier';


const prisma = new PrismaClient();


const app = express();
app.use(express.json());
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage });


const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinaryV2.uploader.upload_stream({ folder: 'composicoes' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Rota para criar composições com upload de arquivos para Cloudinary
app.post('/composicoes', upload.fields([{ name: 'imagem' }, { name: 'imagemComp' }]), async (req, res) => {
  try {
    const { tituloCard, quandoJogar, comoJogar, itens } = req.body;
    
    const imagemResult = await uploadToCloudinary(req.files['imagem'][0]);
    const imagemCompResult = await uploadToCloudinary(req.files['imagemComp'][0]);

    const imagem = imagemResult.secure_url;
    const imagemComp = imagemCompResult.secure_url;

    await prisma.composicoes.create({
      data: {
        tituloCard,
        imagem,
        imagemComp,
        quandoJogar,
        comoJogar,
        itens
      }
    });
    
    res.status(201).json({ message: 'Composição criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar composição' });
  }
});

// Rota para listar composições
app.get('/composicoes', async (req, res) => {
  try {
    const comps = await prisma.composicoes.findMany();
    res.status(200).json(comps);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar composições' });
  }
});

// Rota para deletar composições
app.delete('/composicoes/:id', async (req, res) => {
  try {
    await prisma.composicoes.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: 'Composição deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar composição' });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
