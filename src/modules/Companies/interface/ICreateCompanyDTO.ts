import ICreateUnitDTO from "../../Unities/interface/ICreateUnitDTO";
import ICreateUserDTO from "../../Users/interface/ICreateUserDTO";

export default interface ICreateCompanyDTO{
    companyName: string,
    companyOwner: string,
    area: string,
    country: string,
    cnpj: string,
    unities: [ICreateUnitDTO]
    users: [ICreateUserDTO]
}