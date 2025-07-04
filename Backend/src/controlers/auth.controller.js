import User from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import { generate_token } from "../lib/utils.js";
import cloudinary from "../lib/cloudnary.js";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 7 characters long." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generate_token(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "User creation failed." });
    }
  } catch (error) {
    console.log("Signup controller error:", error.message);
    res.status(500).json({ message: "Internal server  mne error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email password" });
    }
    const ifpasswordcorrect = await bcrypt.compare(password, user.password);
    if (!ifpasswordcorrect) {
      return res.status(400).json({ message: "invalid email password" });
    }
    generate_token(user._id, res);
    res.status(200).json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log("error in login side ", error.message);
    res.status(500).json({ message: "Internal server error." });

  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge:0 // Expire cookie immediately
    });

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Logout controller error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const profileUp = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s

    let uploadedResponse;
    try {
      uploadedResponse = await cloudinary.uploader.upload(profilePic, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch (err) {
      console.error("❌ Upload failed or timed out:", err);
      return res
        .status(500)
        .json({ message: "Upload failed or timed out", error: err.message });
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated", user: updateUser });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
    console.log("✅ checkAuth route hit");

  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};