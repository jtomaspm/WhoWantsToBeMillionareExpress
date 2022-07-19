import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import * as questionsRouter from "./routes/question.js"
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("test")
})

app.use('/question', questionsRouter.router)


app.listen("80")