import { Controller, Get, Post, Req } from "@nestjs/common";

import { PrintLogService } from "src/printing-setup/print.log.service";
@Controller("admin")
export class AdminController {
    constructor(private readonly printLogService: PrintLogService) {}
    @Get("admin-get-user-log")
    async get_log_from_user(@Req() req) {
        return this.printLogService.get_log(req.body.username);
    }
}
