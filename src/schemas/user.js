const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

// userSchema.pre("save", async function () {
//   if (this.isNew || this.isModified) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//   }
// });

const User = mongoose.model("users", schema);

module.exports = {
  User,
};
