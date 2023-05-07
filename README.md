# app
Contains a frontend web application that brings together all pieces.

## How To Run It

Make sure that you have NodeJS (>=14) and NPM installed.

#### Clone

Clone this repo to your local machine using
```
git clone https://github.com/remla23-team15/app.git
```

#### Run
Move to  the application folder and run in your terminal:
```
# Add GitHub Personal Access Token to environment (linux)
export NPM_TOKEN=the_token_goes_here

# Add GitHub Personal Access Token to environment (windows)
set NPM_TOKEN=the_token_goes_here
```

```
# Docker build
docker build -t ghcr.io/remla23-team15/app:VERSION --build-arg npm_token=${NPM_TOKEN} .

# Docker container
docker run -p <port>:80 ghcr.io/remla23-team15/app:VERSION

# App
Available at localhost:<port>
```

**`<port>` indicates the port you want to access the app from using your browser, for example 8081.**

**VERSION indicates the version that you want to apply to the Docker image, for example 1.0.0, latest or so.**

## Contributors

REMLA 2023 - Group 15
