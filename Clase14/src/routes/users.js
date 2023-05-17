import { Router } from "express";
import userModel from "../models/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  console.log(users);
  res.send({ status: "success", payload: users });
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, course, password } = req.body;
    if (!first_name || !last_name || !email || !password){
        return res.status(400).send({ status: "error", error: "Incomplete values" });
    }
    const user = {
      first_name,
      last_name,
      email,
      password,
      course,
    };
    const result = await userModel.create(user);
    res.send({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({status:"error",error:"Internal error"})
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const userToUpdate = req.body;
    const result = await userModel.updateOne(
      { _id: userId },
      { $set: userToUpdate }
    );
    console.log(result);
    res.send({ status: "success", message: "User updated" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: "Error interno" });
  }
});

router.delete("/:uid", async (req, res) => {
  const userId = req.params.uid;
  const result = await userModel.deleteOne({ _id: userId });
  console.log(result);
  res.send({ status: "success", message: "User removed" });
});

export default router;
