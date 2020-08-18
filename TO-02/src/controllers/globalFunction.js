const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { products, product_out, product_in, users } = require("../db/models");
var fs = require("fs");

// Define font files
var fonts = {
  Roboto: {
    normal: "src/fonts/Roboto-Regular.ttf",
    bold: "src/fonts/Roboto-Medium.ttf",
    italics: "src/fonts/Roboto-Italic.ttf",
    bolditalics: "src/fonts/Roboto-MediumItalic.ttf",
  },
};

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);

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
        // await globalFunction
        //   .sendStockMessage(data, "dimarhanung@gmail.com")
        //   .then(console.log("success send email", new Date()));
      }
      console.log(notSpam);
      notSpam--;
    });
  }

  static async reportMonth() {
    const productin = await product_in.findAll({
      include: [
        {
          model: products,
          include: [users],
        },
      ],
    });
    const productout = await product_in.findAll();

    console.log(productin[0].product.user.id);


    cron.schedule("0 0 1 * *", async function () {
      var docDefinition = {
          content: [
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ '*', 'auto', 100, '*' ],
                body: [
                  [ 'nama produk', 'pemasukan', 'pengeluaran'],
                  [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                  [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
                ]
              }
            }
          ]
        };
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream('document.pdf'));
          pdfDoc.end();
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
