import mongoose, { Schema } from "mongoose";
import ICreateAssetDTO from "../interface/ICreateAssetDTO";

const assetsSchema = new Schema<ICreateAssetDTO>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    model: {type: String, required: true},
    owner: {type: String, required: true},
    status: {type: String, required: true},
    healthLevel: {type: Number,min: 0, max: 100,required: true, default:100},
})

const Asset = mongoose.model('Asset', assetsSchema)

export default Asset;
