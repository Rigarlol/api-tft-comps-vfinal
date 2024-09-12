# Backend - API TFTComps

Este projeto é um backend para gerenciamento de composições do jogo Teamfight Tactics (TFT). Ele permite o upload, listagem e exclusão de composições, com informações detalhadas sobre como e quando usá-las, além de imagens ilustrativas. As imagens são armazenadas utilizando o serviço de armazenamento na nuvem Cloudinary.

## Funcionalidades

- **Listar Composições:** Exibe todas as composições cadastradas no banco de dados, retornando informações como o título da composição, quando jogá-la, como jogá-la e itens recomendados
- **Criar Composição:** Permite a criação de uma nova composição com o upload de duas imagens (uma ilustrativa e outra da composição). As imagens são armazenadas no Cloudinary.
- **Deletar Composição:** Remove composições do banco de dados.
- **Armazenamento de Imagens:** Utiliza o Cloudinary para armazenar imagens relacionadas às composições.

## Stack utilizada

- Node.js
- Express.js
- PrismaORM
- MongoDB

## Ferramentas e Outras Tecnologias

- Render: Serviço de hospedagem utilizado para subir a API do backend online.
- Cloudinary: Armazenamento em nuvem para gerenciar as imagens das composições.
- Multer Storage Cloudinary: Integração entre Multer e Cloudinary para fazer upload direto de arquivos para a nuvem.

