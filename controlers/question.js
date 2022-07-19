import fs from "fs";
export const getQuestion = () => {
    const fileContents = fs.readFileSync('static/questions.json', 'utf8');

    try {
        const dataJson = JSON.parse(fileContents);
        return dataJson[Math.floor(Math.random()*dataJson.length)];
    } catch(err) {
        console.error(err);
     }

}

export const validateAnswer = (guess, correct) => {
    const fileContents = fs.readFileSync('static/user.json', 'utf8');
    try {
        let user = JSON.parse(fileContents);
        const valid = guess == correct;
        if (valid) {
            user.correct += 1;
            const userJson = JSON.stringify(user);
            fs.writeFile("static/user.json", userJson, (err) => {
                if (err) {
                    console.log(err)
                }
            });
            return true
        }else{
            if (user.correct > 0){
                user.correct -= 1;
                const userJson = JSON.stringify(user);
                fs.writeFile("static/user.json", userJson, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
            
            return false
        }
    } catch(err) {
        console.error(err);
     }

}



