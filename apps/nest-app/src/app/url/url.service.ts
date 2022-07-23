import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url, UrlDocument } from './entities/url.entity';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    @InjectConnection() private connection: Connection
  ) {}

  async create({ originalUrl }: CreateUrlDto) {
    const uuid = new ShortUniqueId({ length: 10 });
    const urlId = uuid();
    const base = process.env.BASE;
    const shortUrl = `${base}/${urlId}`;
    const existingUrl = await this.urlModel.findOne({ originalUrl }).exec();
    if (existingUrl) {
      return existingUrl;
    }
    const url = new this.urlModel({
      originalUrl,
      urlId,
      shortUrl,
    });
    return url.save();
  }

  async findOne(urlId: string): Promise<string> {
    const url = await this.urlModel.findOne({ urlId });

    if (url) {
      url.update({ clicks: url.clicks++ });
      url.save();
      return url.originalUrl;
    }
  }
}
