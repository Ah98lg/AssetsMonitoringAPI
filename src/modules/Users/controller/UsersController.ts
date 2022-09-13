import { Request, Response } from "express";
import { Company } from "../../Companies/models/Company";
import { User } from "../models/User";

interface IUser {
  userName?: string;
  age?: string;
  role?: string;
}
class UsersController {
  // Create
  async registerNewUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { userName, age, role } = req.body;

    const newUser = await User.create({
      userName,
      age,
      role,
    });

    await Company.findById(id).then((company) => {
      company?.users.push(newUser), company?.save();
    });

    return res.json(newUser);
  }

  // Read
  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});

    return res.json(users);
  }

  // Update
  async updateUser(req: Request, res: Response): Promise<Response> {
    const { company_id, user_id } = req.params;
    const { userName, role, age } = req.body;

    const user = await User.findById(user_id);

    const userUpdate: IUser = {
      userName: userName ?? user?.userName,
      role: role ?? user?.role,
      age: age ?? user?.age,
    };

    await User.findByIdAndUpdate(user_id, userUpdate);

    const updatedCompanyUser = await Company.findOneAndUpdate(
      { _id: company_id, "users._id": user_id },
      {
        $set: {
          "users.$": userUpdate,
        },
      },
      {
        new: true,
      }
    );

    return res.json(updatedCompanyUser);
  }

  // Delete
  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { company_id, user_id } = req.params;

    await User.findByIdAndDelete(user_id);
    const company = await Company.findById(company_id);

    await Company.findOneAndUpdate(
      { _id: company_id },
      {
        ...company,
        $pull: {
          users: { _id: user_id },
        },
      },
      (err: any, data: any) => {
        if (err) {
          throw new Error("Couldn't delete");
        }
      }
    ).clone();

    return res.json({ message: "User deleted" });
  }
}

export const usersController = new UsersController();
