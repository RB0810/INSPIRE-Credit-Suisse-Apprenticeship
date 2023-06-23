const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { title } = require("process");
const biasDB = require(__dirname + "/models/bias.js")
const threadDB = require(__dirname + "/models/thread.js")
var bias=[];
var thread=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/library", async function(req, res){
    //res.render("library");
    bias = await biasDB.findBias(); 
    res.render("library", {biasList: bias});
});

app.get("/reflection", function(req, res){
    res.render("reflection");
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

app.post("/discussion", async function(req, res){
    console.log(req.body);
    var threadName = req.body.titlethread;
    var threadContent = req.body.descthread;
    newThread= {
        thread: threadName,
        created: "User",
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
        author: "User",
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
        nameF="User"
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

