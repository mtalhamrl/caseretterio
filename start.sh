#!/bin/bash

# Başlangıç mesajı
echo "Projeyi başlatmak için Docker Compose kullanılıyor..."

# Docker Compose ile tüm servisleri başlatma
echo "MongoDB, Redis ve Uygulama konteynerleri başlatılıyor..."

docker-compose up --build

# Eğer tüm servisler zaten çalışıyorsa, sadece başlatılır.
echo "Uygulama başarıyla başlatıldı!"

