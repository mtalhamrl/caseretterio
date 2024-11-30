# 1. Node.js bazlı bir imaj kullanıyoruz
FROM node:16-alpine

# 2. Çalışma dizinini ayarlıyoruz
WORKDIR /app

# 3. Proje bağımlılıklarını kopyalıyoruz ve kuruyoruz
COPY package*.json ./
RUN npm install

# 4. Tüm proje dosyalarını çalışma dizinine kopyalıyoruz
COPY . .

# 5. Uygulama portunu tanımlıyoruz
EXPOSE 3000

# 6. Uygulama başlatma komutu
CMD ["npm", "run", "start"]
