import express from "express";
import routes from "../routes";
import {
  postToilet,
  postJoin,
  postLogin,
  logout,
  getNearToilets,
  updateUser,
  getToilet,
  getUserByEmail,
} from "../controllers/apiController";
import { uploadImage, uploadAvatar } from "../ middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.join, postJoin);
apiRouter.post(routes.login, postLogin);
apiRouter.get(routes.logout, logout);
apiRouter.get(routes.getUserByEmail, getUserByEmail);
apiRouter.post(routes.user, uploadAvatar, updateUser);
apiRouter.post(routes.postToilet, uploadImage, postToilet);
apiRouter.get(routes.getToilet, getToilet);
apiRouter.get(routes.nearToilets, getNearToilets);

export default apiRouter;
