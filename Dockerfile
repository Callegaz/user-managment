FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência primeiro para cache
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta do Vite (normalmente 5173)
EXPOSE 5173

# Inicia a aplicação
CMD ["npm", "run", "dev"]