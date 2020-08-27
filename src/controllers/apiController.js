import passport from "passport";
import Toilet from "../models/Toilet";
import User from "../models/User";

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, passwordConfirm },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send({ error: "User exist." });
    }
    if (password !== passwordConfirm) {
      res.status(400).send("Invalid confirm password.");
    } else {
      const user = await User({ name, email });
      await User.register(user, password);
      res.send({ user });
    }
  } catch (err) {
    res.status(400).send("An error has occured. Please try again.");
  }
};

export const postLogin = (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      res
        .status(400)
        .send({ error: "An error has occured. Please try again." });
    }
    if (user) {
      req.logIn(user, (error) => {
        if (error) {
          res
            .status(400)
            .send({ error: "An error has occured. Please try again." });
        }
        res.send({ user: req.user });
      });
    } else {
      res.status(400).send({ error: "User does not exist." });
    }
  })(req, res);
};

export const logout = (req, res) => {
  try {
    req.logout();
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ error: "Failed logout." });
  }
};

export const getUserByEmail = async (req, res) => {
  const {
    query: { email },
  } = req;

  const user = await User.findOne({ email });

  if (user) {
    res.send({ user });
  } else {
    res.status(400).send({ error: "User does not exist." });
  }
};

export const postToilet = async (req, res) => {
  const {
    body: { lat, lng, name, type, memo },
  } = req;

  try {
    if (req.user) {
      const toilet = await Toilet({
        type,
        name,
        memo,
        location: {
          coordinates: [lng, lat],
        },
        creator: req.user._id,
        imageUrl: req.file ? req.file.location : "",
      });

      req.user.toilets.push(toilet.id);
      req.user.save();
      toilet.save();

      res.send({ toilet });
    } else {
      res.status(400).send({ error: "Login status is required." });
    }
  } catch (error) {
    res.status(400).send({ error: "An error has occured. Please try again." });
  }
};

export const getToilet = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const toilet = await Toilet.findById(id);
    res.send({ toilet });
  } catch (error) {
    res.status(400).send({ error: "An error has occured. Please try again" });
  }
};

export const getNearToilets = async (req, res) => {
  const {
    query: { lat, lng, maxDistance },
  } = req;

  try {
    const toilets = await Toilet.find({
      location: {
        $near: {
          $maxDistance: parseInt(maxDistance, 10),
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      },
    }).populate("creator");
    res.send({ toilets });
  } catch (error) {
    res.status(400).send({ error: "An error has occured. Please try again." });
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
    if (file?.location) {
      user.avatarUrl = file.location;
    }
    user.save();
    res.send({ user });
  } catch (error) {
    res.status(400).send({ error: "An error has occured. Please try again." });
  }
};
