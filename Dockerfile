# Estágio 1: Build
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install --only=production

# Copia todo o código da aplicação
COPY . .

# Expõe a porta padrão
EXPOSE 5000

# Define variáveis de ambiente padrão
ENV PORT=5000
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
