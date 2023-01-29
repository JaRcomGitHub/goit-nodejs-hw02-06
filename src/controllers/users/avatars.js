const { User } = require("../../schemas/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

async function avatars(req, res, next) {
  // console.log("file", req.file);
  const filename = req.file.filename;
  const filepath = req.file.path;
  const storeImage = path.resolve(
    __dirname,
    "../../../public/avatars/",
    filename
  );

  await Jimp.read(filepath)
    .then((photo_test) => {
      return photo_test
        .resize(250, 250) // resize
        .quality(80) // set JPEG quality
        .write(storeImage); // save
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });

  try {
    await fs.unlink(filepath);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }

  req.user.avatarURL = `/avatars/${filename}`;
  try {
    const storedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      req.user,
      {
        new: true,
      }
    ).select({
      avatarURL: 1,
      _id: 0,
    });
    return res.status(200).json(storedUser);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = avatars;
