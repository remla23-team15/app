// Display version
currentVersion();

async function submit() {

    let text;
    text = document.getElementById("textInput").value.toString();
    let content = {'review':text};

    // Get backend url from env variables
    const myUrl = backEndUrl();

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

