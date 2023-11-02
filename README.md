## Spotify Token generator

This project is made for only run once, and save your credentials without make your own redirection, for example, you may be just need the Spotify api for your account, and authentication is not required in your application.

So just run this program and keep your keys in your server for start to use Spotify API.

## Use

### Create your project in Spotify Developers

* Log into developer [Spotify](https://developer.spotify.com/dashboard) 

* Create an app and select "Web API" for the question asking which APIs are you planning to use. Once you have created your app, you will have access to the app credentials.

* In Redirect URi field write http://localhost:8000

* In the settings project save CLIENT ID and CLIENT SECRET

### Set up project

Replace .env.example file to .env with your app credentials saved before.
```bash
CLIENT_ID=XXXXXXXXXXXX
CLIENT_SECRET=XXXXXXXXX
```

Install dependences

```bash
npm install
npm start
```

* Go to your browser and open http://localhost:8080
* Sign in Spotify.
* Save your tokens.

