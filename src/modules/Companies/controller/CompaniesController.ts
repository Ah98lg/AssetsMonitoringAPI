import { request, Request, Response } from "express";
import { Company } from "../models/Company";

interface ICompany {
  companyName?: string;
  companyOwner?: string;
  area?: string;
  country?: string;
  cnpj?: string;
}
class CompaniesController {
  // Create
  async registerNewCompany(req: Request, res: Response): Promise<Response> {
    const { companyName, companyOwner, area, country, cnpj } = req.body;

    const newCompany = await Company.create({
      companyName,
      companyOwner,
      area,
      country,
      cnpj,
    });

    return res.json(newCompany);
  }

  // Read
  async getAll(req: Request, res: Response): Promise<Response> {
    const companies = await Company.find({});

    return res.json(companies);
  }

  // Read by Id
  async getCompanyById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const company = await Company.findById(id);

    return res.json(company);
  }

  // Update
  async updateCompany(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { companyName, companyOwner, area, country, cnpj } = req.body;

    const company = await Company.findById(id);

    const companyUpdates: ICompany = {
      companyName: companyName ?? company?.companyName,
      companyOwner: companyOwner ?? company?.companyOwner,
      area: area ?? company?.area,
      country: country ?? company?.country,
      cnpj: cnpj ?? company?.cnpj,
    };

    const updatedCompany = await Company.findByIdAndUpdate(id, companyUpdates, {
      new: true,
    });

    return res.json(updatedCompany);
  }

  // Delete
  async deleteCompany(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Company.findByIdAndDelete(id);

    return res.json({ message: "Company deleted" });
  }
}

export const companiesController = new CompaniesController();
