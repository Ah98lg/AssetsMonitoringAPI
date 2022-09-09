import ICreateAssetDTO from "../../Assets/interface/ICreateAssetDTO";

export default interface ICreateUnitDTO{
    unityName: string,
    city: string,
    state: string,
    assets: [ICreateAssetDTO]
}