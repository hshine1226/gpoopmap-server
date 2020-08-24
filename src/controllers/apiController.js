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

export const postLogin = (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log(error);
    }
    if (user) {
      req.logIn(user, (error) => {
        if (error) {
          console.log(error);
        }
        res.send({ user: req.user });
      });
    } else {
      res.send({});
    }
  })(req, res);
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
    res.send({ user });
    res.status(200);
  } else {
    res.send({ user: null });
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
    } else {
      res.status(400);
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
  const {
    body: { name },
    file,
    params: { id },
  } = req;

  try {
    const user = await User.findById(id);
    user.name = name;
    user.avatarUrl = file.location;
    user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
