const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const pathToFile = path.join(__dirname, "countersPages.json");

let counterIndex = 0;
let counterAbout = 0;

function countersPages(url) {
  const objCounters = JSON.parse(fs.readFileSync(pathToFile));
  objCounters[url] += 1;
  counter = objCounters[url];
  const newStrCounters = JSON.stringify(objCounters, null, 2);
  fs.writeFileSync(pathToFile, newStrCounters);
  return counter;
}

app.use(express.static("static"));

app.get("/", (req, res) => {
  //   const objCounters = JSON.parse(fs.readFileSync(pathToFile));
  //   objCounters[req.url] += 1;
  //   counterIndex = objCounters[req.url];
  //   const newStrCounters = JSON.stringify(objCounters, null, 2);
  //   fs.writeFileSync(pathToFile, newStrCounters);

  counterIndex = countersPages(req.url);
  res.send(
    `<h1>Главная express Page 1</h1><a href='/about'>Ссылка на страницу Обо мне</a><p>Количество посещений Главной: ${counterIndex}</p>`
  );
});

app.get("/about", (req, res) => {
  counterAbout = countersPages(req.url);
  res.send(
    `<h1>Обо мне express Page 2</h1><a href='/'>Ссылка на страницу Главная</a> <p>lol ${req.url}</p> <p>Количество посещений Главной: ${counterAbout}</p>`
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту: ${port}`);
});

// в папке static имена прописаны как index2 и about2
// чтобы не занимать эти имена и дать их js
