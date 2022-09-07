import { Types } from "mongoose";

export default interface ICreateUserDTO{
    _id: Types.ObjectId,
    name: string,
    age: number,
    role: string,
}