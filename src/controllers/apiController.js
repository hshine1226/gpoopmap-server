import passport from "passport";
import Toilet from "../models/Toilet";
import User from "../models/User";

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  try {
    const user = await User({ name, email });
    await User.register(user, password);
    res.send({ success: true });
  } catch (err) {
    res.status(400);
  }
};

export const postLogin = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log(error);
    }
    if (user) {
      req.login(user, (error) => {
        if (error) {
          console.log(error);
        }
        res.send({ success: true, user });
      });
    } else {
      res.send({ success: false });
    }
  })(req, res, next);
};

export const logout = (req, res) => {
  try {
    req.logout();
    res.send({ success: true });
  } catch {
    res.send({ success: false });
  }
};

export const getMe = async (req, res) => {
  res.send({ user: req.user });
};

export const getUser = async (req, res) => {
  const {
    query: { email },
  } = req;

  const user = await User.findOne({ email });

  if (user) {
    res.send({ user, message: "User Exist" });
    res.status(200);
  } else {
    res.send({ message: "User Doesn't Exist" });
    res.status(400);
  }
};

export const postToilet = async (req, res) => {
  const {
    body: { lat, lng, name, type, memo },
  } = req;

  try {
    // 로그인한 유저만 화장실 등록 가능
    if (req.user) {
      const toilet = await Toilet({
        type,
        name,
        memo,
        location: {
          coordinates: [lng, lat],
        },
        creator: req.user.id,
        imageUrl: req.file ? req.file.location : "",
      });

      req.user.toilets.push(toilet.id);
      req.user.save();

      toilet.save();
      res.status(200);
    }
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const getNearToilets = async (req, res) => {
  const {
    query: { lat, lng },
  } = req;

  try {
    const toilet = await Toilet.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      },
    }).populate("creator");
    res.send(toilet);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  console.log("updateUser", req.file);
  const {
    body: { name, email },
    file,
    params: { id },
  } = req;

  try {
    const user = await User.findById(id);
    user.name = name;
    user.avatarUrl = file.location;
    user.save();
    res.send(user);

    // const updatedUser = await User.findByIdAndUpdate(id, {
    //   name,
    //   email,
    //   avatarUrl: file.location ? file.location : null,
    // });
    // res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
};