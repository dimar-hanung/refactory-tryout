# Warehouse Management System
END - Of - Deadline
Sadar masih sangat berantakan :D
## Package
- [x] nodemon (dev)
- [x] sequelize
- [x] sequelize-cli
- [x] express
- [x] nodemailer
- [x] passport-jwt
- [x] mysql2
- [x] dotenv
- [ ] puppetear

## just test ( belum di implementasi )
- [x] Nodemailers 
- [x] Queue
- [x] make pdf

## Main Task

- [x] Use Migrations
- [x] Use Controller
- [x] RESTful User
- [x] RESTful Products
- [x] RESTful Product IN
- [x] RESTful Product Out
- [x] Relational REST product, product_in, product_out
- [x] Tiap request Body, harus di dalam variable data (baru sebagian)
  ```json
  {
    "data": {
      "full_name": "Jhon",
      "email": "email@jhon.com"
    }
  }
  ```
- [x] Tiap Response body harus memiliki data,message dan status, untuk data yang bentuknya daftar/list, di kasih pagination ( baru sebgaian )
  ```json
  {
    "message": "succes get data",
    "status": "success",
    "data": {
      "full_name": "Jhon",
      "email": "email@jhon.com"
    }
  }
  ```
  -[ ] dengan paginasi :
  ```json
  {
      "message":"succes get data",
      "status": "success",
      "data" :{
          data:[
              {...}
              {...}
          ],
          "totalItems": 8,
          "totalPages": 3,
          "currentPage": 1
      }
  }
  ```
- [x] gunakan base url dengan `api/{version}/:http://localhost/api/{version}`
  - http://localhost:5000/api/v1/user
  - http://localhost:5000/api/v1/product
- [ ] Cloudinary - simpan foto
- [ ] NodeMailer - kirim email
- [ ] gunakan `queue` untuk membuat laporan bulanan total dari barang masuk dan barang keluar dan di cetak dalam format pdf dan di kirim ke email pemilik setiap akhir bulan
- [ ] gunakan `authentication` untuk akses resource data , jika tidak ada, maka tidak bisa akses ke server, kecuali url untuk login dan register