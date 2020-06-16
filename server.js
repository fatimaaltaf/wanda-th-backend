const express = require("express");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const app = express();
const cors = require("cors");

const selector = ["h1", "h2", "h3"];

app.use(
  cors({
    origin: "*",
  })
);

// const url = req.query.url;

app.get("/", function (req, res) {
  nightmare
    .goto("https://www.lighthouselabs.ca/")
    // .goto("https://neilpatel.com/") // test site
    .wait("h1")
    .evaluate((selector) => {
      // now we're executing inside the browser scope.
      return selector.map((tag) => document.querySelector(tag).innerText);
    }, selector)
    .end()
    .then((text) => res.send(text))
    .catch((error) => {
      console.error("Search failed:", error);
    });
});

app.listen("5000");
console.log("on port 5000");
exports = module.exports = app;
