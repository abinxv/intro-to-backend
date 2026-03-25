import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// before saving any password, we hash it with bcrypt
userSchema.pre("save", async function () {
    // if password is not modified, skip hashing
    if (!this.isModified("password")) return;
    
    // 10 rounds of hashing
    this.password = await bcrypt.hash(this.password, 10)
});

// compare passwords
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}



export const User = mongoose.model("User", userSchema);
