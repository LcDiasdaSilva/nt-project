
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências, incluindo o json-server globalmente
RUN npm install && npm install -g json-server

# Copia todo o conteúdo do diretório atual para o diretório de trabalho no container
COPY . .

# Expõe a porta 8080 (ou a porta que seu servidor Vue.js usa)
EXPOSE 8080

# Expõe a porta 3000 (ou a porta que o json-server usa)
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento e o json-server em paralelo
CMD ["sh", "-c", "npm run dev & json-server --watch server/db.json --port 3000"]


