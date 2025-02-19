import Users from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendNotificationToQueue from "../config/sentNotification.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  try {
    const existingUser = await Users.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      res.status(400).json({ message: "Invalid Email" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }
    if (isPasswordCorrect) {
      const token = generateToken(existingUser);

      existingUser.password = undefined;
      existingUser.token = token;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token: token,
        existingUser,
      });
    } else {
      res.status(400);
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error("something went wrong",error);
  }
};
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  if (!email.trim() || !password.trim() || !name.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      username: name,
      email,
      password: hashedPassword,
    });
    console.log(user)
    if (user) {
      const token = generateToken(user);
      console.log(token)

      user.password = undefined;
      user.token = token;
      sendNotificationToQueue(email, 'Welcome to Our Service', 'Thank you for registering!');

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token: token,
        existingUser,
      });
    } else {
      res.status(400);
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error("something wrong",error);
  }
};
