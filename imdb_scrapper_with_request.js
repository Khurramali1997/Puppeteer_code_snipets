//console.log("Hello world");
const request = require("request");
const requestPromise = require("request-promise");
const cherio = require("cheerio");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
const { error } = require("console");
const urlArray = [
  {
    url: "https://www.imdb.com/title/tt0102926/",
    id: "the_silence_of_the_lambs",
  },

  {
    url: "https://www.imdb.com/title/tt0110912/?ref_=tt_sims_tt_t_2",
    id: "pulp_fiction",
  },

  {
    url: "https://www.imdb.com/title/tt0137523/?ref_=tt_sims_tt_i_1",
    id: "fight_club",
  },

  {
    url: "https://www.imdb.com/title/tt0109830/?ref_=tt_sims_tt_i_2",
    id: "forest_gump",
  },

  {
    url: "https://www.imdb.com/title/tt1375666/?ref_=tt_sims_tt_i_3",
    id: "inseption",
  },
];
try {
  (async () => {
    let details = [];
    urlArray.forEach(async (element) => {
      const response = await requestPromise(element.url);
      //console.log(response);
      let $ = cherio.load(response);
      let title = $(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1"
      ).text();
      let poster = $(
        "div[class='ipc-media ipc-media--poster-27x40 ipc-image-media-ratio--poster-27x40 ipc-media--baseAlt ipc-media--poster-l ipc-poster__poster-image ipc-media__img']>img"
      ).attr("src");
      let summary = $(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > p > span.GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0.dcFkRD"
      )
        .text()
        .trim();
      let rating = $(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.RatingBar__RatingContainer-sc-85l9wd-0.hNqCJh.TitleBlock__HideableRatingBar-sc-1nlhx7j-4.bhTVMj > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1ll29m0-0.hmJkIS > div.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW > span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV"
      )
        .text()
        .trim();

      let file = fs.createWriteStream(`${element.id}.jpeg`);

      let image = await new Promise((resolve, rejects) => {
        let stream = request({
          uri: poster,
        })
          .pipe(file)
          .on("finish", () => {
            console.log("Finished Downloading the image");
            resolve("Done Download");
          })
          .on("error", () => {
            console.log(error);
            rejects(error);
          });
      }).catch((err) => {
        console.log(
          `Movie ${element.id} has an error on download the error is :--->${err}`
        );
      });

      details.push({ title, rating, summary });
      //let data = JSON.stringify(details);
      console.log(details);
      //console.log(data);
      //fs.writeFileSync("./data.json", JSON.stringify(details), "utf-8");
    });
  })();
} catch (err) {
  throw err;
}
