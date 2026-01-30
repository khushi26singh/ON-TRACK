const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
  fs.readdir("./files", (err, files) => {

          res.render("index", { files });
      })
});

app.post("/add", function(req, res) {
  const fileName = req.body.task.split(" ").join("") + ".txt";

  fs.writeFile(`./files/${fileName}`, req.body.description, (err) => {
    if (err) {
      return res.status(500).send("Error creating file");
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
