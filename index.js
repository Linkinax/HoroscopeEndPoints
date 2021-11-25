const express = require("express");
const app = express();
const rp = require('request-promise');
const cheerio = require('cheerio');



let serverPort = process.env.PORT || 5000;


//endPoint Oroscopo Oggi
app.get("/oggi/:segno", function(req, res) {
    var segno = req.params.segno;
    //Storing data:
      myObj = {};
      myJSON = JSON.stringify(myObj);
    
      console.log("segno="+ segno+ "\n");
    const options = {
      uri: "https://tg24.sky.it/lifestyle/oroscopo/"+segno+"/oggi",
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    rp(options)
      .then(($) => {
        
        //body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(2) > p
        //document.querySelector("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(2)")
        myObj["Data"]= ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > time").text());
        myObj["Segno"]= (segno);
        myObj["Generale"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(2) > p").text());
        myObj["Amore"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(4) > p").text());
        myObj["Lavoro"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(5) > p").text());
  
        res.send(myObj);
      })
      .catch((err) => {
        console.log(err);
      });
  });

//EndPoint Oroscopo Domani
app.get("/domani/:segno", function(req, res) {
    var segno = req.params.segno;
    //Storing data:
      myObj = {};
      myJSON = JSON.stringify(myObj);
    
      console.log("segno="+ segno+ "\n");
    const options = {
      uri: "https://tg24.sky.it/lifestyle/oroscopo/"+segno+"/domani",
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    rp(options)
      .then(($) => {
  
        myObj["Data"]= ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > time").text());
        myObj["Segno"]= (segno);
        myObj["Generale"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(2) > p").text());
        myObj["Amore"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(4) > p").text());
        myObj["Lavoro"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(5) > p").text());
  
        res.send(myObj);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  //EndPoint Oroscopo Settimana
  app.get("/settimana/:segno", function(req, res) {
    var segno = req.params.segno;
    //Storing data:
      myObj = {};
      myJSON = JSON.stringify(myObj);
    
      console.log("segno="+ segno+ "\n");
    const options = {
      uri: "https://tg24.sky.it/lifestyle/oroscopo/"+segno+"/settimana",
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    rp(options)
      .then(($) => {
  
        myObj["Data"]= ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > time").text());
        myObj["Segno"]= (segno);
        myObj["Generale"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(2) > p").text());
        myObj["Amore"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(4) > p").text());
        myObj["Lavoro"] = ($("body > div.l-wrapper > div:nth-child(5) > div > section > div > div > div:nth-child(5) > p").text());
  
        res.send(myObj);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  

app.set("port", serverPort);
app.listen(serverPort, function() {
  console.log(`App is ready at port ${serverPort}`);
});