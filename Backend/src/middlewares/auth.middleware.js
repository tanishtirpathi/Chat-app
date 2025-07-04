import jwt from "jsonwebtoken";
import User from "../modals/user.modal.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("COOKIES:", req.cookies); // Debug line
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ message: "Unauthorized token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("COOKIES:", req.cookies);
    console.log("Error from middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
