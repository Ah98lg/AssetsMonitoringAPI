import { Request, Response } from "express";
import Asset from "../models/Asset";

class AssetsController{
    
    async RegisterNewAsset(req: Request, res: Response) : Promise<Response>{

        const {
            name,
            description,
            model,
            owner,
            status,
            healthLevel,
        } = req.body


        const newAsset = Asset.create({
            name,
            description,
            model,
            owner,
            status,
            healthLevel,
        })

        return res.json(newAsset)
    }
}

const assetsController = new AssetsController()

export default assetsController;