const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const {users} = require("./src/db/models")
const run = require("./src/controllers/globalFunction")
// const rootIndex = require("./src/routes/index");
const routerUsers = require("./src/routes/users");
const routerProduct = require("./src/routes/products");
const routerIn = require("./src/routes/product-in");
const routerOut = require("./src/routes/product-out");
app.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
var jsonwebtoken = require("jsonwebtoken");
var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


run.reportMonth()
run.checkStock()
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



// app.use("/", rootIndex);
app.use("/api/v1/user",passport.authenticate("jwt"), routerUsers);
app.use("/api/v1/product",passport.authenticate("jwt"), routerProduct);
app.use("/api/v1/In",passport.authenticate("jwt"), routerIn);
app.use("/api/v1/Out",passport.authenticate("jwt"), routerOut);


passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      console.log("JWT New Strategy",jwt_payload.id)
      users.findByPk( jwt_payload.id)
      .then((user) => {
        // console.log("user",user)
        
        if (user) {
          // console.log("sukses",jwt_payload.id)
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch(err => done(err, false));
    })
  );

passport.serializeUser(function (user, done) {
    console.log("TEST Serialize :",user.id)
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    console.log("\n\nTEST DESerialize :",id)
    users.findByPk(id)
    .then(res => {
      done(null,id)
    })
    .catch(err => done(err))
  });


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // console.log(author.prototype)
    const data = await users.findAll({
        where: {
          username: username
        }
      });
    //   console.log(user[0].dataValues)
      const user = data[0].dataValues
       
      if (!user) {
        return res.json({ error: "error" })
      }
      if (user.password != password) {
        return res.json({ error: "error" })
      }
        const token = jsonwebtoken.sign(user, opts.secretOrKey);
      res.json({
        status: "success",
        token
      });

      

  });





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
