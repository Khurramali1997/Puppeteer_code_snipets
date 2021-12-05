//console.log("Hello world");
const request = require("request-promise");
const cherio = require("cheerio");
const url = "https://www.imdb.com/title/tt0102926/";
async () => {
  const response = await request(url);
  let $ = cherio.load(response);
  let title = $(
    'h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 cLNRlG"]'
  ).text();
  console.log(title);
};
