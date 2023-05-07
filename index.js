import {getVersion} from "@remla23-team15/lib";

// Enable usage of getVersion in the frontend app
window.currentVersion = () => {
    document.getElementById("version").innerText = getVersion();
}

// Setup env variables from env.json file
const env_vars = require('./env.json');
Object.keys(env_vars).forEach(function(k) {
    process.env[k] = env_vars[k];
});

window.backEndUrl = () => {
    return process.env.MY_APP_URL;
}
