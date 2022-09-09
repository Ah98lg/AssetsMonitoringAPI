import { Request, Response } from "express";
import { Company } from "../../Companies/models/Company";
import { Unity } from "../models/Unity";

interface IUnity {
  unityName?: string;
  city?: string;
  state?: string;
}
class UnitiesController {
  // Create
  async registerNewUnity(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { unityName, city, state, assets } = req.body;

    const newUnity = await Unity.create({
      unityName,
      city,
      state,
      assets,
    });

    await Company.findById(id).then((company) => {
      company?.unities.push(newUnity), company?.save();
    });

    return res.json(newUnity);
  }

  // Read
  async getAll(req: Request, res: Response): Promise<Response> {
    const companies = await Unity.find({});

    return res.json(companies);
  }

  // Read by Id
  public async getUnityById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const company = await Unity.findById(id);

    return res.json(company);
  }

  // Update
  /* async updateUnity(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { companyName, companyOwner, area, country, cnpj } = req.body;

    const company = await Unity.findById(id);

    const companyUpdates = {
      companyName: companyName ?? company?.companyName,
      companyOwner: companyOwner ?? company?.companyOwner,
      area: area ?? company?.area,
      country: country ?? company?.country,
      cnpj: cnpj ?? company?.cnpj,
    };

    const updatedCompany = await Unity.findByIdAndUpdate(id, companyUpdates, {
      new: true,
    });

    return res.json(updatedCompany);
  }
 */
  // Delete
  async deleteUnity(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Unity.findByIdAndDelete(id);

    return res.json({ message: "Company deleted" });
  }
}

export const unitiesController = new UnitiesController();
