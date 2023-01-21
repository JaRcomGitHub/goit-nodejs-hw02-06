const express = require("express");

const router = express.Router();

router.get("/", fileController);

module.exports = router;

async function fileController(req, res) {
  return res.status(200).json({ message: "fileController" });
}
