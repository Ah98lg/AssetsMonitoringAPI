import mongoose, { Schema } from "mongoose";
import { unitySchema } from "../../Unities/models/Unity";
import { userSchema } from "../../Users/models/User";
import ICreateCompanyDTO from "../interface/ICreateCompanyDTO";

const companySchema = new Schema<ICreateCompanyDTO>({
  companyName: String,
  companyOwner: String,
  area: String,
  country: String,
  cnpj: String,
  unities: [unitySchema],
  users: [userSchema],
});

export const Company = mongoose.model("Company", companySchema);
