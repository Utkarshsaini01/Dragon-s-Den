const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const SHA256 = require("crypto-js/sha256")
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const SoldProduct = require("./db/SoldProduct");
var fs = require("fs");
var path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

app.post("/register", async (req, res) => {
  let obj = {
    name : req.body.name,
    email: req.body.email,
    password: SHA256(req.body.password)
  };
  let user = new User(obj);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  if (req.body.password && req.body.email) {
    let obj = {
      email : req.body.email,
      password: SHA256(req.body.password).toString()
    };
    let user = await User.findOne(obj).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user Found" });
    }
  } else {
    res.send({ result: "No user Found" });
  }
});

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/add-product", upload.single("image"), async (req, res) => {
  var obj = {
    name: req.body.name,
    price: req.body.price,
    equity: req.body.equity,
    userId: req.body.userId,
    productname: req.body.productname,
    videoURL: req.body.videoURL,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/images/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    description: req.body.description,
  };

  await Product.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      // console.log("Data Successfully Feeded");
      res.send({ result: "Successfully Added" });
    }
  });

  //  console.log("File Successfully Sent");
  // let product = new Product(req.body);
  // let result = await product.save();
  // res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find().select("-userId");
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});

app.get("/profile/:userId", async (req, res) => {
  let x = await Product.find({ userId: req.params.userId }, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });

  let y = await SoldProduct.find(
    { userId: req.params.userId },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  let z = x.concat(y);
  res.send(z);
});

app.get("/details/:id", async (req, res) => {
  let x = await Product.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  res.send(x);
});

app.post("/pay/:id/:userId", async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  // console.log(id);
  // console.log(userId);
  let x = await Product.findOne({ _id: id });
  if (x) {
    var obj = {
      name: x.name,
      price: x.price,
      equity: x.equity,
      userId: userId,
      productname: x.productname,
      videoURL: x.videoURL,
      img: {
        data: x.img.data,
        contentType: x.img.contentType,
      },
      description: x.description,
    };

    await SoldProduct.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // item.save();
        console.log("Data Successfully Feeded");
      }
    });

    Product.deleteOne({ _id: id })
      .then(function () {
        console.log("Data deleted"); // Success
        res.send({ result: "Successfully Added" });
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  }
});

app.get("/soldproducts", async (req, res) => {
  let products = await SoldProduct.find().select("-userId");
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
})

app.listen(8000);
