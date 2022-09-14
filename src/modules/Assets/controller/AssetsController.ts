import IUploadImageDTO from "../../../configs/uploads";
import { Request, Response } from "express";
import { Company } from "../../Companies/models/Company";
import { Asset } from "../models/Asset";
import { Unity } from "../../Unities/models/Unity";
import { Image } from "../../../configs/uploads";

var fs = require("fs");
var path = require("path");
interface IAsset {
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
  image?: IUploadImageDTO;
}

class AssetsController {
  // Create
  async registerNewAsset(req: Request, res: Response): Promise<Response> {
    const { company_id, unity_id } = req.params;

    const { assetName, description, model, assetOwner, image } = req.body;

    const newAsset = {
      assetName,
      description,
      model,
      assetOwner,
      // image,
    };

    // var obj = {
    //   data: fs.readFileSync(
    //     path.join(
    //       __dirname + "../../../../../tmp/uploads/" + req.file?.filename
    //     )
    //   ),
    //   contentType: "image/png",
    // };

    await Asset.create(newAsset);
    // await Image.create(image);

    await Company.findOneAndUpdate(
      { _id: company_id, "unities._id": unity_id },
      {
        $push: {
          "unities.$.assets": {
            assetName: newAsset.assetName,
            description: newAsset.description,
            model: newAsset.model,
            assetOwner: newAsset.assetOwner,
            // image: obj,
          },
        },
      }
    );

    await Unity.findOneAndUpdate(
      { _id: unity_id },
      {
        $push: {
          assets: {
            assetName: newAsset.assetName,
            description: newAsset.description,
            model: newAsset.model,
            assetOwner: newAsset.assetOwner,
            // image: obj,
          },
        },
      }
    );

    return res.json(newAsset);
  }

  // Read
  async getAll(req: Request, res: Response): Promise<Response> {
    const assets = await Asset.find({});

    return res.json(assets);
  }

  // Update
  async updateAsset(req: Request, res: Response): Promise<Response> {
    const { company_id, unity_id, asset_id } = req.params;
    const {
      assetName,
      description,
      model,
      assetOwner,
      // image,
      status,
      healthLevel,
    } = req.body;

    const asset = await Asset.findById(asset_id);

    const assetUpdate = {
      assetName: assetName ?? asset?.assetName,
      description: description ?? asset?.description,
      model: model ?? asset?.model,
      assetOwner: assetOwner ?? asset?.assetOwner,
      // image: image ?? asset?.image,
      status: status ?? asset?.status,
      healthLevel: healthLevel ?? asset?.healthLevel,
    };

    await Asset.findByIdAndUpdate(asset_id, assetUpdate);

    const updatedCompanyAsset = await Company.findOneAndUpdate(
      { _id: company_id, "unities._id": unity_id, "assets._id": asset_id },
      {
        $set: {
          "unities.$.assets.$": assetUpdate,
        },
      },
      {
        new: true,
      }
    );

    await Unity.findOneAndUpdate(
      { _id: unity_id, "assets._id": asset_id },
      {
        $set: {
          "assets.$": assetUpdate,
        },
      },
      {
        new: true,
      }
    );

    return res.json(updatedCompanyAsset);
  }

  // Delete
  async deleteAsset(req: Request, res: Response): Promise<Response> {
    const { company_id, unity_id, asset_id } = req.params;

    await Asset.findByIdAndDelete(asset_id);
    const unity = await Unity.findById(unity_id);

    await Company.findOneAndUpdate(
      { _id: company_id, "unities._id": unity_id },
      {
        "unities.$": {
          ...unity,
          $pull: {
            assets: { _id: asset_id },
          },
        },
      },
      (err: any, data: any) => {
        if (err) {
          throw new Error("Couldn't delete");
        }
      }
    ).clone();

    return res.json({ message: "Asset deleted" });
  }
}

const assetsController = new AssetsController();

export default assetsController;
