// Display version
window.onload = (event) => {
    document.getElementById("version").innerText = "Loading components versions...";
    setTimeout(currentVersion, 3000);
};

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
        document.getElementById('result').innerText = "Positive :)";
        document.getElementById('result').style.color = "Green";
    }
    else {
        document.getElementById('result').innerText = "Negative :(";
        document.getElementById('result').style.color = "Red";

    }

    // Show feedback elements
    document.getElementById('SubmitBtn').style.visibility = 'hidden';
    document.getElementById('feedbackSubmit').style.visibility = 'visible';
    document.getElementById('feedbackMessage').style.visibility = 'hidden';
}

async function submitFeedback(feedback) {
    // Get feedback url from env variables
    const feedbackBackendUrl = feedbackUrl();

    let content = {'feedback':parseInt(feedback)};

    let params = {
        headers: {'Content-Type':'application/json'},
        method: 'POST',
        body: JSON.stringify(content)
    }

    const response = await fetch(feedbackBackendUrl, params).then((response) => response.json());
    console.log(response['model_accuracy']);

    // Hide feedback elements
    document.getElementById('SubmitBtn').style.visibility = 'visible';
    document.getElementById('feedbackSubmit').style.visibility = 'hidden';
    document.getElementById('feedbackMessage').style.visibility = 'visible';
}

function getAndDisplaySliderValue() {
    var slider = document.getElementById("ratingSlider");
    var sliderValue = document.getElementById("sliderValue");
    sliderValue.innerHTML = slider.value;
}