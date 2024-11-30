# Leaderboard Application

bu proje oyunların skorlarını saklayıp oyuncuların sıralamalarını gösteren bi projedir.
backend: nestjs
db: mongo
redis : skorları ve sıralamaları saklamak için
docker : konteyner içinde çalıştırmak icin

# gerekli paketler :

docker, nodejs ve npm

# projeyi kurma

npm install : package.jsondaki tüm bağlılıkları yükler
önermem ama sorun yasarsanız npm install -f ile calıstırılabilir.

# projeyi calıstırma :

./start.sh

# api endpointleri

POST localhost:3000/leaderboard/submit-score -> oyuncuların skorlarını görmek icin

GET /leaderboard/top -> en yuksek skora sahip olanları görmek icin

GET /leaderboard/rank?gameId=game123&userId=user12 ->belirli bir ouncunun skoru ve sıralaması

# projenin yapısı

src/ kodlar
src/user/ kullanıcılarla iligli alan
src/game/ oyunlarla ilgili alan
src/leaderboard/ ldierlik tablosu islemleri

Dockerfile : docker imaji olusturan dosya
docker-compose.yml compose yapılandrılması
start.sh hızlı baslatmak icin script

# docker ile calıstırma

docker-compose up --build

# GPT'YE YAPTIRDIGIM OZET

---

### **Özetle neler ekledik?**

- **Gereksinimler ve Bağımlılıklar:** Projeyi çalıştırmak için gereken yazılımlar ve **npm** bağımlılıklarını listeledik.
- **Kurulum ve Çalıştırma Talimatları:** Projeyi nasıl kurup çalıştıracaklarına dair adımları yazdık.
- **API Uç Noktaları:** API endpoint'lerinin açıklamaları ve örnek istek/yanıtları eklendi.
- **Proje Yapısı:** Dosya yapısının açıklaması verildi.

Bu şekilde **README.md** dosyasına eklediğimiz bilgiler sayesinde, projeyi başkaları kolayca kurabilir ve çalıştırabilir. Eğer başka bir sorunuz olursa, memnuniyetle yardımcı olurum! 😊
