import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    userProfile(@Req() req: Request) {
        return 'super secrect user profile'
    }
}