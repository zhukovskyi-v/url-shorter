import Url from '../models/urls.schema';
import { validateUrl } from '../utils';
import ShortUniqueId from 'short-unique-id';

export const getUrlById = async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.originalUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

export const saveUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE;

  if (validateUrl(originalUrl)) {
    try {
      const uuid = new ShortUniqueId({ length: 10 });
      const urlId = uuid();
      let url = await Url.findOne({ originalUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          originalUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
};
