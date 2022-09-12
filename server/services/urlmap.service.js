const UrlMap = require("../models/urlmap");
const base62 = require("base62/lib/ascii");

module.exports = { generateShortUrl, getUrl };

let counter = null;
const additionalIncrement = 100000000000;

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function generateShortUrl(bodyObj) {
  if (!bodyObj || !bodyObj.url) {
    throw { status: 400, message: "Bad Request" };
  }
  const counterToEncode = await getCounter();
  const shortUrl = base62.encode(counterToEncode);
  const pattern = /^((http|https|ftp):\/\/)/;
  let longUrl = bodyObj.url;

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
  try {
    if (!counter) {
      counter = (await UrlMap.count()) + additionalIncrement;
    } else {
      counter++;
    }
    return counter;
  } catch (err) {
    console.error(err);
  }
}

async function getUrl(params) {
  if (!params || !params.code) {
    throw { status: 400, message: "Bad Request" };
  }
  const url = await UrlMap.findOne({ where: { ShortUrl: params.code } });
  if (url) {
    return url.LongUrl;
  } else {
    throw { status: 400, message: "Bad Request" };
  }
}
