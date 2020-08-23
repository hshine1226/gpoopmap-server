import express from "express";

const globalRouter = express.Router();

globalRouter.get("/", function (req, res) {
  res.json({ message: "대똥여지도 server입니다." });
});

export default globalRouter;
