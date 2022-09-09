import { Schema } from "mongoose"
import ICreateUserDTO from "../interface/ICreateUserDTO"

export const userSchema = new Schema<ICreateUserDTO>({
    userName: {type: String, required: true},
    age: {type: Number, required: true},
    role: {type: String, required: true},
})