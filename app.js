const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "Home is not just a house it is a place. A house is just like a shelter where you live but you don't love it. Home is where you love to live in because you have your belongings in it, your toys that you grown up with your childhood memories and many more things. Even if you move to another house, you still have these things which will remind you of other homes that you have lived in. My home is in Pakistan because that is where I am originally from. In US, I lived in many places and I moved several times and I exactly don't know my real home but I have memories that shows that I lived in those homes. However, in Pakistan I only lived in one house, where I grown up and I never moved from that house. However, I don't think that if I live in only one place than it is my real home because if I move from there than this house will just remain in my memories but than my home would be another place where I am living in.";
const aboutContent =
  "Home is not just a house it is a place. A house is just like a shelter where you live but you don't love it. Home is where you love to live in because you have your belongings in it, your toys that you grown up with your childhood memories and many more things. Even if you move to another house, you still have these things which will remind you of other homes that you have lived in. My home is in Pakistan because that is where I am originally from. In US, I lived in many places and I moved several times and I exactly don't know my real home but I have memories that shows that I lived in those homes. However, in Pakistan I only lived in one house, where I grown up and I never moved from that house. However, I don't think that if I live in only one place than it is my real home because if I move from there than this house will just remain in my memories but than my home would be another place where I am living in.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
