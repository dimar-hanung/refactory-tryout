# Warehouse Management System

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
## Main Task

- [ ] Use Migrations
- [ ] Use Controller
- [ ] RESTful User
- [ ] RESTful Products
- [ ] RESTful Product IN
- [ ] RESTful Product Out
- [ ] Tiap request Body, harus di dalam variable data
  ```json
  {
    "data": {
      "full_name": "Jhon",
      "email": "email@jhon.com"
    }
  }
  ```
- [ ] Tiap Response body harus memiliki data,message dan status, untuk data yang bentuknya daftar/list, di kasih pagination
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
  dengan paginasi :
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
- [ ] gunakan base url dengan `api/{version}/:http://localhost/api/{version}`
  - http://localhost:5000/api/v1/user
  - http://localhost:5000/api/v1/product
- [ ] Cloudinary - simpan foto
- [ ] NodeMailer - kirim email
- [ ] gunakan `queue` untuk membuat laporan bulanan total dari barang masuk dan barang keluar dan di cetak dalam format pdf dan di kirim ke email pemilik setiap akhir bulan
- [ ] gunakan `authentication` untuk akses resource data , jika tidak ada, maka tidak bisa akses ke server, kecuali url untuk login dan register