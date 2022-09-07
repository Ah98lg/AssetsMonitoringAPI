import mongoose, { Schema } from "mongoose";
import ICreateUnitDTO from "../interface/ICreateUnitDTO";

const unitySchema = new Schema<ICreateUnitDTO>({
    _id: {type: Schema.Types.ObjectId, ref: 'Id', unique:true},
    name: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
})

export const Unity = mongoose.model('Unity', unitySchema)
