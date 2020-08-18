const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { products } = require("../db/models");
class globalFunction {
  static isObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
      ? false
      : true;
  }

  static async checkStock() {
    let notSpam = 0;
    cron.schedule("*/10 * * * * *", async function () {
      const stock = await products.findAll({
        where: {
          stock: 0,
        },
        attributes: ["id"],
      });
      if (stock.length >= 0 && notSpam <= 1) {
        notSpam = 6;
        const data = await products
          .findAll({
            where: {
              id: {
                [Op.or]: stock.map((data) => data.id),
              },
            },
          })
          .then((data) => data.map((data) => data.name));
        console.log("sukses kirim email", data);
        await globalFunction
          .sendStockMessage(data, "dimarhanung@gmail.com")
          .then(console.log("success send email", new Date()));
      }
      console.log(notSpam);
      notSpam--;
    });
  }

  static configEmail() {
    const configMail = {
      service: "gmail",
      auth: {
        user: "group3emaildemo@gmail.com",
        pass: "msvcp100M426",
      },
    };
    return configMail;
  }

  static async sendStockMessage(stock, data) {
    const configMail = globalFunction.configEmail();
    const transporter = await nodemailer.createTransport(configMail);
    const mail = {
      to: data,
      from: configMail.auth.user,
      subject: "Stock Habis",
      html: `<h1>Ketersedian ${stock.join(",")} sudah habis</h1>${new Date()}`,
    };
    transporter.sendMail(mail);
    console.log("alhamdulillah");
  }
}

module.exports = globalFunction;
