import { Types } from "mongoose";

export default interface ICreateCompanyDTO{
    _id: Types.ObjectId,
    name: string,
    owner: string,
    area: string,
    country: string,
    cnpj: number,
}