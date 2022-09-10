export default interface ICreateAssetDTO {
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
}
