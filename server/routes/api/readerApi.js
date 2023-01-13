const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../../models/User");
const axios = require("axios");
const { verifyToken } = require("../../middlewares/authenticate");


router.get("/poets/:id", verifyToken, async (req, res) => {
  try {
    const reader = await User.findById(req.params.id);
    if (reader && reader.userType == "reader") {
      const poets = reader.poets;
      if (poets.length > 0) {
        const records = await User.find().where("_id").in(poets).exec();
        res.status(200).send(records);
      } else {
        res.status(422).send({
          message: "There  is no Poet Appointed by current reader",
        });
      }
    } else {
      res.status(422).send({ message: "There  is no reader with this ID" });
    }
  } catch (err) {
    console.log(err);
  }
});



router.get("/:id", verifyToken, async (req, res) => {
  const reader = await User.findById(req.params.id);
  if (reader) {
    res.status(200).send(reader);
  } else {
    res.status(422).send({ message: "There  is no Reader with this ID" });
  }
});

router.post("/request/poet/:id", verifyToken, async (req, res) => {
  try {
    let reader = await User.findById(req.params.id);
    let poet = await User.findById(req.body.poetId);
    if (reader && poet) {
      var check = 0;
      await reader.poets.forEach((value, index) => {
        if (value.id == poet.id) {
          check = 1;
          return;
        }
      });

      await poet.poetCustomers.forEach((value, index) => {
        if (value.id == reader.id) {
          check = 2;
          return;
        }
      });
      if (check === 1) {
        return res.status(422).json({
          message: "This poet is already Appointed by current reader",
        });
      } else if (check === 2) {
        return res.status(422).json({
          message: "This Customer is already in contact with current poet",
        });
      }

      const object = {
        readerId: req.params.id,
        username: reader.username,
        email: reader.email,
        img: reader.img,
        data: req.body.data,
      };

      reader.poets.push(poet.id);
      poet.poetCustomers.push(object);
      await poet.save();
      await reader.save();

      const response = await axios.post(
        "http://localhost:3000/api/checkout/payment",
        {
          tokenId: req.body.tokenId,
          amount: req.body.amount,
        }
      );
      return res
        .status(200)
        .json({ reader: reader, poet: poet, Response: response });
    } else {
      return res
        .status(422)
        .json({ message: "reader or poet Id is incorrect" });
    }
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
});


module.exports = router;
