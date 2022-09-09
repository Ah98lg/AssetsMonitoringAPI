import mongoose, { Schema } from "mongoose";
import { unitySchema } from "../../Unities/models/Unity";
import { userSchema } from "../../Users/models/User";
import ICreateCompanyDTO from "../interface/ICreateCompanyDTO";

const companySchema = new Schema<ICreateCompanyDTO>({
  companyName: { type: String, required: true },
  companyOwner: { type: String, required: true },
  area: { type: String, required: true },
  country: { type: String, required: true },
  cnpj: { type: String, required: true },
  unities: [unitySchema],
  users: [userSchema],
});

export const Company = mongoose.model("Company", companySchema);
