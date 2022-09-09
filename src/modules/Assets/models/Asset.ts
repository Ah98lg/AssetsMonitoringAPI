import { Schema } from "mongoose";
import ICreateAssetDTO from "../interface/ICreateAssetDTO";

export const assetsSchema = new Schema<ICreateAssetDTO>({
    assetName: {type: String, required: true},
    description: {type: String, required: true},
    model: {type: String, required: true},
    assetOwner: {type: String, required: true},
    status: {type: String, required: true},
    healthLevel: {type: Number,min: 0, max: 100,required: true, default:100},
})