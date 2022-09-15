import mongoose, { Schema } from "mongoose";
import ICreateAssetDTO from "../interface/ICreateAssetDTO";

export const assetsSchema = new Schema<ICreateAssetDTO>({
  assetName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  assetOwner: { type: String, required: true },
  status: { type: String, required: true, default: "Running" },
  healthLevel: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: Math.floor(Math.random() * 100),
  },
  // image: { type: Buffer, required: true },
});

export const Asset = mongoose.model("Asset", assetsSchema);
