import { User } from "../model/auth.js";
import { setUser } from "../jwt-service.js";
import bcrypt from "bcryptjs";

export async function handleSignupPage(req, res) {
  try {
    const body = req.body;

    //hashpassword
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "user has been created" });
  } catch (error) {
    return res.status(401).json({ msg: "bad request", error });
  }
}

export async function handleLoginPage(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    //compare provided password with hased password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If the password matches, proceed with jwt operations
    const token = setUser(user);
    res.cookie("uid", token, {
      maxAge: 3600000, //1 hour
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log("cookie has been generated ", token);

    //routing
    return res.status(200).json({ msg: "User has logged in" });
  } catch (error) {
    console.error("Error in login:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please check the console" });
  }
}
