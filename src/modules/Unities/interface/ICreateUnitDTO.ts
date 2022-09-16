import ICreateAssetDTO from "../../Assets/interface/ICreateAssetDTO";

export default interface ICreateUnitDTO {
  _id?: string;
  unityName: string;
  city: string;
  state: string;
  assets: [ICreateAssetDTO];
}
