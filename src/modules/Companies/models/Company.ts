import mongoose, { Schema } from "mongoose";
import { unitySchema } from "../../Unities/models/Unity";
import { userSchema } from "../../Users/models/User";
import ICreateCompanyDTO from "../interface/ICreateCompanyDTO";

const companySchema = new Schema<ICreateCompanyDTO>({
  companyName: { type: String },
  companyOwner: { type: String },
  area: { type: String },
  country: { type: String },
  cnpj: { type: String },
  unities: [unitySchema],
  users: [userSchema],
});

export const Company = mongoose.model("Company", companySchema);
