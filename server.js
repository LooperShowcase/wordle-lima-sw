const express = require("express");

const app = express();
const ourword = "lucky";
const port = process.env.PORT || 3000
app.get("/wordle/:guess", function (req, res) {
  let ourWordMap = {
    l: 1,
    u: 1,
    c: 1,
    k: 1,
    y: 1,
  };

  let resArr = ["", "", "", "", ""];
  const word = req.params.guess.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ourword[i]) {
      resArr[i] = "green";
      let curLetter = ourword[i];
      ourWordMap[curLetter]--;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ourword[i]) {
      let curLetter = word[i];
      if (ourWordMap[curLetter] === undefined) {
        resArr[i] = "grey";
      } else if (ourWordMap[curLetter] > 0) {
        resArr[i] = "orange";
        ourWordMap[curLetter]--;
      } else {
        resArr[i] = "grey";
      }
    }
  }

  res.send(resArr);
});
app.use(express.static("public"));
app.listen(port);
