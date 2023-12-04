import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { SignupDto } from "./DTO/signup.dto";
import { LoginDto } from "./DTO/login.dto";
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

    async create(dto: SignupDto) {
        let hastPw = await argon.hash(dto.Password);
        const createdUser = new this.userModel({
            FullName: dto.Fullname,
            Email: dto.Email,
            BKNetID: dto.BKNetID,
            hashString: hastPw,
            PaperBalance: 20,
            StuID: dto.StuID,
            isNew: true,
        });
        try {
            let newUser;
            newUser = await createdUser.save();
            let rtInfor = dto;
            delete rtInfor.Password;
            rtInfor["message"] = "Sign up success";
            return rtInfor;
        } catch (err) {
            if (err.code === 11000) {
                throw new HttpException("BKNetID or StuID was used.", HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(err, HttpStatus.AMBIGUOUS);
            }
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    //BKNetID is username at this context
    async findUserByUsername(dto: LoginDto) {
        //find and flush out user file
        let user = await this.userModel.findOne({ BKNetID: dto.BKNetID });
        return user;
    }
    async findUserById(id) {
        return this.userModel.findOne({ _id: id });
    }
    public async updateUserPaperBalance(userBKNetID, newPaperBalance) {
        console.log(userBKNetID + ":" + newPaperBalance);
        let newUser = await this.userModel.findOneAndUpdate(
            { BKNetID: userBKNetID },
            { PaperBalance: newPaperBalance },
            { new: true, upsert: true },
        );
        delete newUser["hashString"];
        return {
            BKNetID: newUser["BKNetId"],
            Email: newUser["Email"],
            FullName: newUser["FullName"],
            StuID: newUser["StuID"],
            PaperBalance: newUser["PaperBalance"],
        };
    }
}
