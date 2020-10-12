const express = require("express");
const Product = require("../models/inventory/product");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({}).select("-__v -_id");

  try {
    if (products == null || products == "") {
      return res.send({ message: "No products found" });
    }
    res.send(products);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: "Error Occured on server!",
    });
  }
});

router.post("/", async (req, res) => {
  const {
    productId,
    name,
    qty,
    unit,
    unitPrice,
    purchasedPrice,
    partyName,
    personToContact,
    address,
    telephone,
    mobile,
    email,
    website,
    refNo,
    ref,
    nameAddress,
  } = req.body;

  try {
    const newProduct = new Product({
      productId: productId,
      name: name,
      qty: qty,
      unit: unit,
      unitPrice: unitPrice,
      purchasedPrice: purchasedPrice,
      partyName: partyName,
      personToContact: personToContact,
      address: address,
      telephone: telephone,
      mobile: mobile,
      email: email,
      website: website,
      refNo: refNo,
      ref: ref,
      nameAddress: nameAddress,
    });

    await newProduct.save();

    res.send({
      data: newProduct,
      message: "Your data has been successfully saved on database! :)",
    });
  } catch (e) {
    res.status(400).send({
      error: e,
      message: "Error Occured on server!",
    });
  }
});

router.post("/find", async (req, res) => {
  //res.send("HEY");
  try {
    let { ReferenceNo } = req.body;
    const data = await Product.find({ refNo: ReferenceNo });

    res.send(data);

    // res.render("/views/slip", {
    //   data: data,
    // });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/getParty", async (req, res) => {
  //res.send("HEY");
  try {
    let { partyName } = req.body;

    if (partyName == null || partyName == "") {
      return res.send("No PartyName Recieved");
    }

    const getPartyInfo = await Product.findOne({
      partyName: partyName,
    });

    res.send(getPartyInfo);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  // res.send("HEY THERE");
  //   try {
  //     let { partyName } = req.body;

  //     const getPartyInfo = await Product.findOne({ partyName: partyName });

  //     res.send(getPartyInfo);
  //   } catch {
  //     res.status(500).send(e);
  //   }
});

router.delete("/:productId", async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId });

  if (product == null || product == "") {
    return res
      .status(404)
      .send(
        `No product with ID: ${req.params.productId} is found in the database!`
      );
  }

  try {
    product.delete();
    res.send({
      data: product,
      message: "Product is has been successfully deleted!",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.get("/:productId", async (req, res) => {
//   const product = await Product.findOne({ productId: req.params.productId });
//   if (product == null || product == "") {
//     return res.send(
//       `No Product have been found with ${req.body.params} ID on database.`
//     );
//   }
//   try {
//     res.send(product);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;

// res.send("HEY THERE");
//   try {
//     let { partyName } = req.body;

//     const getPartyInfo = await Product.findOne({ partyName: partyName });

//     res.send(getPartyInfo);
//   } catch {
//     res.status(500).send(e);
//   }
