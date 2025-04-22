const express = require("express");

const app = express();

app.listen(5001, () => {
  console.log("server is running");
});

app.get("/hi",(req,res)=>{
    res.send("excellytics here");
})