import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));


// Configuração de armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Define a pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Define o nome único do arquivo
    }
})

const upload = multer({ storage: storage })

// Criar composições com upload de arquivos
app.post('/composicoes', upload.fields([{ name: 'imagem' }, { name: 'imagemComp' }]), async (req, res) => {
    const { tituloCard, quandoJogar, comoJogar, itens } = req.body
    const imagem = req.files['imagem'][0].path // Caminho da imagem enviada
    const imagemComp = req.files['imagemComp'][0].path // Caminho da composição enviada

    await prisma.composicoes.create({
        data: {
            tituloCard,
            imagem,
            imagemComp,
            quandoJogar,
            comoJogar,
            itens
        }
    })
    
    res.status(201).json({ message: 'Composição criada com sucesso!' })
})

// Rota para listar composições
app.get('/composicoes', async (req, res) => {
    const comps = await prisma.composicoes.findMany()
    res.status(200).json(comps)
})

app.delete('/composicoes/:id', async (req, res) => {
    await prisma.composicoes.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Composição deletada com sucesso!' })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
