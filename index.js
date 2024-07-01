const connectToMongo = require("./db");
const cors = require("cors")
connectToMongo();

const express = require('express');
const path = require("path");
const product = require("./models/product");



////////////////// 
const multer = require('multer')          
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }) // 
/////////////////


const app = express();
const port = process.env.PORT || 3000;



app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public'));
// });


// to upload a product in the database
app.post('/api/products/upload', upload.single('productImage'), async (req, res) => {
  try {
    const { category, model, serialNum, dateOfInvoice } = req.body;
    const newProduct = new product({
      category,
      model,
      serialNum, 
      dateOfInvoice,
      imagePath: req.file.path
    });

    await newProduct.save();
    res.status(200).json({newProduct});
    // res.redirect('/')

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})


// get list of all products
app.get('/api/products/details', async (req, res) => {
  try {

    const products = await product.find();
    res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// the port on which app is live
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
