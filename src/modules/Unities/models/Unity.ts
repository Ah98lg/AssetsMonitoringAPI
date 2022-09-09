import mongoose, { Schema } from "mongoose";
import { assetsSchema } from "../../Assets/models/Asset";
import ICreateUnitDTO from "../interface/ICreateUnitDTO";

export const unitySchema = new Schema<ICreateUnitDTO>({
  unityName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  assets: [assetsSchema],
});

export const Unity = mongoose.model("Unity", unitySchema);
