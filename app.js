import _ from 'remla23-team15'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'

async function submit() {

    let text;
    text = document.getElementById("textInput").valueOf().toString();
    let content = {'review':text};

    // const myUrl = "http://localhost:8080/predict"; //Should be environment variable
    const myUrl = process.env.MY_APP_URL

    let params = {
        headers: {'Content-Type':'application/json'},
        method: 'POST',
        body: JSON.stringify(content)
    }

    const response = await fetch(myUrl, params).then((response) => response.json());
    console.log(response['result']);

    if(response['result'] === "positive") {
        document.getElementById('result').innerText = ":)";
    }
    else {
        document.getElementById('result').innerText = ":(";
    }
}

