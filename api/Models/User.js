const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparepassword = function (userpassword) {
  return bcrypt.compareSync(userpassword, this.password);
};

userSchema.methods.gettoken = function () {
  return jwt.sign({ id: this._id }, "asdfghjkl", { expiresIn: "4h" });
};

module.exports = mongoose.model("User", userSchema);
