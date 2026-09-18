# sistema-cadatro-web(Docker)

# 1. Clonar/extrair o projeto
git clone <repo> cadastro-nomes
cd cadastro-nomes

# 2. Criar a rede
docker network create cadastro-net

# 3. Subir o Mongo
docker run -d --name cadastro-mongo \
  --network cadastro-net \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  --restart unless-stopped \
  mongo:7

# 4. BUILD do backend (aqui sim!)
cd backend
docker build -t cadastro-backend .
cd ..

# 5. Rodar backend
docker run -d --name cadastro-backend \
  --network cadastro-net \
  -p 5001:5000 \
  -e MONGO_URI=mongodb://cadastro-mongo:27017/cadastro \
  -e PORT=5000 \
  --restart unless-stopped \
  cadastro-backend

# 6. BUILD do frontend
cd frontend
docker build -t cadastro-frontend .
cd ..

# 7. Rodar frontend
docker run -d --name cadastro-frontend \
  --network cadastro-net \
  -p 3000:3000 \
  -e VITE_API_URL=http://localhost:5001/api \
  --restart unless-stopped \
  cadastro-frontend
  
  
  🏠 Analogia: o container é uma casa alugada

Imagine que o container é uma casa alugada:

    Você pode mobiliar, usar, fazer bagunça

    Mas quando você sai (container é removido), tudo vai embora

    A casa é descartável — outra pessoa vai alugar depois (novo container)

O volume é um guarda-móveis do lado de fora.

    Você coloca suas coisas lá

    Sai da casa

    Suas coisas continuam no guarda-móveis ✅

    Aluga outra casa → pega as coisas de volta
    
    
    docker run -d --name mongo1 mongo:7
# Cadastra 10 pessoas

docker rm -f mongo1     # ❌ APAGA TUDO
# As 10 pessoas foram embora!

docker run -d --name mongo2 mongo:7
# Banco VAZIO de novo

  
  docker run -d --name mongo1 -v mongo_data:/data/db mongo:7
# Cadastra 10 pessoas (vão pra dentro do volume mongo_data)

docker rm -f mongo1     # Remove o container
# ✅ Dados ficam no volume!

docker run -d --name mongo2 -v mongo_data:/data/db mongo:7
# ✅ As 10 pessoas ainda estão lá!

Imagem é o código, container é a execução, volume são os dados.
