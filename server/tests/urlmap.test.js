const UrlMapService = require("../services/urlmap.service");

test("Short URLs should be unique", async () => {
  let bodyObj = {
    url: "www.google.com",
  };
  expect(
    (await UrlMapService.generateShortUrl(bodyObj)).dataValues.ShortUrl
  ).not.toBe(
    (await UrlMapService.generateShortUrl(bodyObj)).dataValues.ShortUrl
  );
});
