import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Nama tidak boleh kosong"],
      maxLength: [255, "Nama maksimal 255 karakter"],
      minLength: [3, "Nama minimal 3 karakter"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Email tidak boleh kosong"],
      maxLength: [255, "Panjang email maksimal 255 karakter"],

    },
    password: {
      type: String,
      required: [true, "Password tidak boleh kosong"],
      maxLength: [255, "Panjang password maksimal 255 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid`
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

const userModel = mongoose.model("Users", userSchema);

export default userModel;
