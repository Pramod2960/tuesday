import { User } from "../model/auth.js";
import { setUser } from "../jwt-service.js";
import bcrypt from "bcrypt";

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
      res.status(400).send({ msg: "user not found" });
    }

    //compare provided password with hased password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If the password matches, proceed with jwt operations
    const token = setUser(user);
    res.cookie("uid", token, { maxAge: 3600000, httpOnly: true });
    console.log("cookie has been generated ", token);

    //routing
    res.status(200).send({ msg: "User has logged in" });
  } catch (error) {
    res.send({ msg: "Something went wrong please check console" });
    console.log("error in find the user", error);
    res.status(400).end();
  }
}
