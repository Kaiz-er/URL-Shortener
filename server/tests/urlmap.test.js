const UrlMapService = require("../services/urlmap.service");

test("Short URLs should be unique", async () => {
  let bodyObj = {
    url: "https://blog.gds-gov.tech/terragrunt-in-retro-i-would-have-done-these-few-things-e5aaac451942",
  };
  expect(
    (await UrlMapService.generateShortUrl(bodyObj)).dataValues.ShortUrl
  ).not.toBe(
    (await UrlMapService.generateShortUrl(bodyObj)).dataValues.ShortUrl
  );
});
