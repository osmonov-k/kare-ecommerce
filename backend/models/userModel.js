import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // 24 hours in seconds
    },
  },
  { minimize: false }
);

// Fix the typo in 'usesr' to 'user' for proper model lookup
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
