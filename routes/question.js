import fs from "fs";
import express from 'express'
import * as questionControler from '../controlers/question.js'
export const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  const question = questionControler.getQuestion();
  const user = JSON.parse(fs.readFileSync('static/user.json', 'utf8'));
  res.render("question", {question : question, user : user})
})
// define the about route
router.post('/', (req, res) => {
    questionControler.validateAnswer(req.body.answer, req.body.correct)
    res.redirect('/question');
  
})

