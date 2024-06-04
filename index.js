import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
const port = 3011;
const API_URL = "https://v2.jokeapi.dev/joke";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/submit", async (req, res) => {
    try{
        const category = req.body["category"]
        const result = await axios.get(API_URL + "/"+category+"?");
        if (result.data.type == 'twopart'){
            res.render("index.ejs", { 
                setup: result.data.setup,
                delivery: result.data.delivery,
            });
        }else{
            res.render("index.ejs", { 
                joke: result.data.joke,
            });
        }
    }catch (error){
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  