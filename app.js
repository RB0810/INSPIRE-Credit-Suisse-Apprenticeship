const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { title } = require("process");
const biasDB = require(__dirname + "/models/bias.js")
const threadDB = require(__dirname + "/models/thread.js")
const userDB = require(__dirname + "/models/user.js")
const date = require(__dirname + "/public/javascripts/date.js")

var bias=[];
var thread=[];
var username="";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function(req, res){
    res.render("login");
});

app.get("/register", async function(req, res){
    res.render("register");
});

app.get("/library", async function(req, res){
    //res.render("library");
    bias = await biasDB.findBias(); 
    res.render("library", {biasList: bias});
});

app.get("/reflection", async function(req, res){
    ref = await userDB.findReflection(username);
    res.render("reflection", {reflectionList: ref});
});

app.get("/discussion", async function(req, res){
    thread = await threadDB.findThread();
    res.render("discussion", {threadList: thread});
});

app.get("/bias/:biasId", async function(req, res){
    var biasP = req.params.biasId;
    var biasFound = await biasDB.biasPage(biasP);
    res.render("bias", {UncBias: biasFound});
});

app.get("/thread/:threadName", async function(req, res){
    var threadid = req.params.threadName;
    var ThreadFound = await threadDB.threadPage(threadid);
    res.render("thread", {postList: ThreadFound});
})

app.post("/", async function(req, res){
    console.log(req.body);
    var auth = await userDB.loginAuth(req.body.email, req.body.password);
    if(auth){
        username = auth.name;
        res.redirect("/library");
    }else{
        res.redirect("/");
        console.log("Invalid id pw");
    }
});

app.post("/register", async function(req, res){
    var user = req.body.name;
    var emailid = req.body.email;
    var pwd = req.body.password;
    newUser= {
        name: user,
        email: emailid,
        password: pwd,
        reflection: []
    }
    var inserted = userDB.insertUser(newUser);
    if(inserted){
        res.redirect("/")
    }
    else{
        res.show("Error adding user")
    }
});

app.post("/reflection", async function(req, res){
    var postTitle = req.body.titlepost;
    var postContent = req.body.descpost;
    newRef= {
        post: postContent,
        date: date.getDate(),
        title: postTitle
    }
    var added = await userDB.insertReflection(username, newRef);
    if(added){
        res.redirect("/reflection")
    }
    else{
        res.show("Error adding Reflection")
    }
});

app.post("/discussion", async function(req, res){
    console.log(req.body);
    var threadName = req.body.titlethread;
    var threadContent = req.body.descthread;
    newThread= {
        thread: threadName,
        created: username,
        desc: threadContent,
        posts: []
    }
    var inserted = threadDB.insertThread(newThread);
    if(inserted){
        res.redirect("/discussion")
    }
    else{
        res.show("Error adding thread")
    }
    
})

app.post("/thread/:threadName", async function(req, res){
    var post = req.body.postcontent;
    var threadname = req.params.threadName;
    var newPost = {
        author: username,
        content: post
    }
    var add = await threadDB.insertPost(threadname, newPost);
    if(add){
        res.redirect("/thread/" + threadname);
    } else{
        res.show("Error adding thread")
    }     
})

app.post("/experience/:biasidd", async function(req, res){
    var biasid = req.params.biasidd;
    var exp = req.body.yourExp;
    console.log(req.body);
    var nameF="";
    if("anonymous" in req.body){
        nameF="Anonymous"
    } else{
        nameF=username;
    }
    var experienceObj = {
        name: nameF,
        content: exp
    }
    var added = await biasDB.insertExperience(biasid, experienceObj);
    if(added){
        res.redirect("/bias/" + biasid);
    } else{
        res.show("Error adding experience")
    }    
});

app.listen(3000, function(){
    console.log("Server started at port 3000")
});

