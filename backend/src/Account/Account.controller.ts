import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthService } from "./Account.auth.service";
import { LoginDto } from "./DTO/login.dto";
import { SignupDto } from "./DTO/signup.dto";
import { HttpStatus } from "@nestjs/common";

@Controller('acc')
export class AccountController {
    constructor(private accService: AuthService) {
    }
    @Post('login') //  /auth/signin
    loginController(@Res() response, @Body() dto: LoginDto) {
        // console.log(this.accService.signin(dto));
        return this.accService.login(dto);
    }
    @Post('signup') //  /auth/signup
    signupController(@Body() dto: SignupDto) {
        return this.accService.signup(dto);
        // console.log(this.accService.signin(dto));
    }
    @Get('user')
    profile() {
        return 'Super secret user profile';
    }
}