const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Daily Journal. Please head over to the compose page by clicking the compose button and type in your entry and give it a title. To open the entry in a seperate page, click on the read more link attatched to your composition.";
const aboutContent = "My name is Shane Arland. I am a web developer and currently living in Jamshedpur. This site was created as a challenge in an online course and as you can see I've made it live on the web because why not.";
const contactContent = "Name: Shane Arland<br>Phone: 4079191767<br>Address: Jharkhand, India<br>E-mail: garlandbane@gamil.com";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    home: homeStartingContent,
    posts: posts
  })
})

app.get("/about", function (req, res) {
  res.render("about", {
    about: aboutContent
  })
})

app.get("/contact", function (req, res) {
  res.render("contact", {
    contact: contactContent
  })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/")
})






app.get("/posts/:postName", function (req, res) {
  const reqTitle = _.lowerCase(req.params.postName)

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title)

    if (storedTitle === reqTitle) {
      res.render("post", {
        compositionTitle: post.title,
        compositionContent: post.content
      })
    }

  })

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
