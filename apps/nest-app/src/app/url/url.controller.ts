import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  Res,
  HttpStatus
} from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UserIpAddress } from "../decorator";

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {
  }

  @Get("info")
  async find(
    @UserIpAddress() ipAddress: string
  ) {
    return this.urlService.getUserInfo(ipAddress);
  }

  // @Get(":id")
  // @Redirect()
  // async findOne(
  //   @Param("id") id: string,
  //   @Res() res,
  //   @UserIpAddress() ipAddress: string
  // ) {
  //   const url = await this.urlService.findOne(id);
  //   return { statusCode: HttpStatus.FOUND, url };
  // }

  @Post("short")
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }
}
