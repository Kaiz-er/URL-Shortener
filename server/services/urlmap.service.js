const UrlMap = require("../models/urlmap");
const base62 = require("base62/lib/ascii");
const { response } = require("express");

module.exports = { generateShortUrl, getUrl };

let counter = null;
const additionalIncrement = 100000000000;

async function generateShortUrl(bodyObj) {
  if (!bodyObj || !bodyObj.url) {
    return response.status(400).send("Invalid Request");
  }
  const counterToEncode = await getCounter();
  const shortUrl = base62.encode(counterToEncode);
  const pattern = /^((http|https):\/\/)/;
  let longUrl = bodyObj.url;

  // Add http header prefix if does not exist
  if (!pattern.test(longUrl)) {
    longUrl = "http://" + longUrl;
  }

  const NEW_URLMAP = {
    LongUrl: longUrl,
    ShortUrl: shortUrl,
  };
  const newUrlMap = await UrlMap.create(NEW_URLMAP);
  return newUrlMap;
}

async function getCounter() {
  if (!counter) {
    counter = (await UrlMap.count()) + additionalIncrement;
  } else {
    counter++;
  }
  return counter;
}

async function getUrl(params) {
  if (!params || !params.code) {
    return response.status(400).send("Invalid Request");
  }
  const url = await UrlMap.findOne({ where: { ShortUrl: params.code } });
  if (url) {
    return url.LongUrl;
  } else {
    return response.status(400).send("Invalid Url");
  }
}
