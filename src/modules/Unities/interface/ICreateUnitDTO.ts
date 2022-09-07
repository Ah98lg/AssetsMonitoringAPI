import { Types } from "mongoose";

export default interface ICreateUnitDTO{
    _id: Types.ObjectId,
    name: string,
    city: string,
    state: string,
}