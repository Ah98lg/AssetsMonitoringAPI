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

  // Update
  async updateUnity(req: Request, res: Response): Promise<Response> {
    const { company_id, unity_id } = req.params;
    const { unityName, state, city } = req.body;

    const unity = await Unity.findById(unity_id);

    const unityUpdate: IUnity = {
      unityName: unityName ?? unity?.unityName,
      city: city ?? unity?.city,
      state: state ?? unity?.state,
    };

    await Unity.findByIdAndUpdate(unity_id, unityUpdate);

    const updatedCompanyUnity = await Company.findOneAndUpdate(
      { _id: company_id, "unities._id": unity_id },
      {
        $set: {
          "unities.$": unityUpdate,
        },
      },
      {
        new: true,
      }
    );

    return res.json(updatedCompanyUnity);
  }

  // Delete
  async deleteUnity(req: Request, res: Response): Promise<Response> {
    const { company_id, unity_id } = req.params;

    await Unity.findByIdAndDelete(unity_id);

    await Company.findOneAndUpdate(
      { _id: company_id },
      {
        $pull: {
          unities: { _id: unity_id },
        },
      },
      (err: any, data: any) => {
        if (err) {
          throw new Error("Couldn't delete");
        }
      }
    ).clone();

    return res.json({ message: "Unity deleted" });
  }
}

export const unitiesController = new UnitiesController();
