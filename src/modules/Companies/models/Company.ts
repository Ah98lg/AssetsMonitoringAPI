import mongoose, { Schema } from "mongoose";
import ICreateCompanyDTO from "../interface/ICreateCompanyDTO";

const companySchema = new Schema<ICreateCompanyDTO>({
    _id: {type: Schema.Types.ObjectId, ref: 'Id', unique:true},
    name: {type: String, required: true},
    owner: {type: String, required: true},
    area: {type: String, required: true},
    country: {type: String, required: true},
    cnpj: {type: Number,required: true},
})

export const Company = mongoose.model('Company', companySchema)
