import mongoose, { Schema } from "mongoose";
import { imageSchema } from "../../../configs/uploads";
import ICreateAssetDTO from "../interface/ICreateAssetDTO";

export const assetsSchema = new Schema<ICreateAssetDTO>({
  assetName: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  assetOwner: { type: String, required: true },
  status: { type: String, required: true, default: "Running" },
  healthLevel: { type: Number, min: 0, max: 100, required: true, default: 100 },
  image: imageSchema,
});

export const Asset = mongoose.model("Asset", assetsSchema);
