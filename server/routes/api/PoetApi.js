const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/authenticate");
const CryptoJS = require("crypto-js");
const User = require("../../models/User");
const Product = require("../../models/Product");

router.get("/readers/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const poet = await User.findById(req.params.id);

    if (poet && poet.userType == "poet") {
      const readers = poet.poetCustomers;
      console.log(readers);
      if (readers.length > 0) {
        res.status(200).send(readers);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});
+router.get("/acceptedReaders/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet && poet.userType == "poet") {
      console.log(poet);
      const readers = poet.poetAccepts;
      console.log(readers);
      if (readers.length > 0) {
        const records = await User.find().where("_id").in(readers).exec();
        console.log(records);
        res.status(200).send(records);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "There is some Error " + err.message });
  }
});

router.post("/accept/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    const readerId = req.body;

    let isExist = false;
    const poetCustomers = poet.poetCustomers;
    await poetCustomers.map((value) => {
      console.log("ss" + value.id);
      console.log("pp" + readerId._id);
      if (value.id == readerId._id) {
        isExist = true;
        return;
      }
    });

    if (!isExist) {
      return res.status(422).send({
        message: "There is no Request From given reader to current poet",
      });
    } else if (poet && poet.userType == "poet") {
      const readers = poet.poetAccepts;

      readers.push(readerId);
      await User.findByIdAndUpdate(readerId, {
        $pull: { poets: { _id: req.params.id } },
      }).exec();
      await User.findByIdAndUpdate(poet, {
        $pull: { poetCustomers: { _id: readerId._id } },
      }).exec();

      poet.poetAccepts = readers;
      await poet.save();
      res.status(200).send(poet);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "There is some Error " + err.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet) {
      poet.password = CryptoJS.AES.decrypt(
        poet.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);
      res.status(200).send(poet);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const poet = await User.findById(req.params.id);
    if (poet) {
      (req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()),
        Object.assign(poet, req.body);
      poet.save();
      res.status(200).send(poet);
    } else {
      res.status(422).send({ message: "There  is no poet with this ID." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/poetries/:id",async(req, res)=>{
    const poetId = req.params.id;
    const poetries = await Product.find({poetId: poetId});
  
    if(poetries.length>0) {
         res.status(200).send(poetries);
    }else{
      res.status(422).send({ message: "There  is no poetry with this Poet" });
    }
})



module.exports = router;
