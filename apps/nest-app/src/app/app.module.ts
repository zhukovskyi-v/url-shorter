import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UrlModule } from "./url/url.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://Vladyslav:AKgUjRiFLMeFM8mf@cluster0.95xt9pv.mongodb.net/url-shorter?retryWrites=true&w=majority&connectTimeoutMS=250000"), UrlModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
