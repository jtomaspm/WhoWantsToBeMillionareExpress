import fs from "fs";
import * as questionModel from "../models/question.js";

const data = fs.readFileSync('./questions.txt', 'utf8');
const questionBase = questionModel.questionBase;
let lines = data.split("\n");
let counter = 0;
let questions = [];
let question = questionBase();
for (let index = 0; index < lines.length; index++) {
    const line =  lines[index].replace(/(\r\n|\n|\r)/gm, "");
    //question
    if (counter == 0) {
        question.question = line;
    }
    if(counter > 0 && counter < 5){
        //answers
        console.log(line)
        question.answers[line.charAt(0)] = line.split(") ")[1]
    }
    if(counter == 5) {
        //correct
        question.correct = line
    }
    if(counter == 6) {
        //hint
        question.hint = line.split("int: ")[1]
    }
    counter += 1;

    if (counter == 7) {
        questions.push(question)
        question = questionBase();
        counter = 0;
    }
}
const write_data = JSON.stringify(questions);


fs.writeFile("questions.json", write_data, (err) => {
    if (err) {
        console.log(err)
    }
})