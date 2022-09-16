export default interface ICreateAssetDTO {
  _id: string;
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
  // image: Buffer;
}
