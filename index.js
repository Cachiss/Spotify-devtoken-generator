import express from "express";
import * as dotenv from  "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:8000/callback";



app.get("/", (req, res) => {  
    res.redirect('https://accounts.spotify.com/authorize?' +"client_id=" + client_id + "&response_type=code&redirect_uri=" + redirect_uri+"&scope=user-read-private%20user-read-email%20user-read-currently-playing");
});


app.get('/callback', async (req, res) => {
    const {code} = req.query;
    const grant_type = "authorization_code";

    //convert body data to x-www-form-urlencoded format
    let body = {
        code,
        redirect_uri,
        grant_type
    };

    let formBody = [];

    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");


    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers:{
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody,
    });
    const data = await response.json();

    const htmlFile = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf8');
    const updatedHTML = htmlFile.replace('{{token}}', data.access_token).replace('{{refresh_token}}', data.refresh_token);

    res.send(updatedHTML);

});
app.listen(8000, () => {
    console.log("Server is running on port 8000.");
});