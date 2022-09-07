import mongoose, { Schema } from "mongoose"
import ICreateUserDTO from "../interface/ICreateUserDTO"

const userSchema = new Schema<ICreateUserDTO>({
    _id: {type: Schema.Types.ObjectId, ref: 'Id', unique:true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    role: {type: String, required: true},
})

export const User = mongoose.model('User', userSchema)
