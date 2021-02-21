# Trendyol-Web-Scraping
Girdiğiniz trendyol linkindeki ürünü eğer farklı satıcılar daha ucuz fiyata satıyor ise size mail gönderir.

## Nasıl Yüklenir
````
git clone https://github.com/OmBayus/Trendyol-Web-Scraping.git
cd Trendyol-Web-Scraping
npm install
````

## Program ayarları
.env dosyası içerisinde; <br/>
EMAIL ve PASS kısımlarına gönderici mail adresini giriyoruz.<br/>
TOEMAIL kısmına alıcı mail adresinin giriyoruz.

### Örnek .env dosyası
````
EMAIL='deneme@gmail.com'
PASS='123'
TOEMAIL='ombayus@gmail.com'
````

### Programı çalıştırma
````
node app.js "trendyol-urun-linki"
````
Örnek çalıştırma:

````
node app.js "https://www.trendyol.com/apple/iphone-11-64gb-beyaz-cep-telefonu-apple-turkiye-garantili-aksesuarsiz-kutu-p-65149494"
````
