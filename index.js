const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const KEY = process.env.KEY;

app.use(express.json());
app.use(cors());
const profileService = require("./profile");

app.get("/", (req, res) => {
  res.send("meow");
});

app.get("/callback", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const code = req.query.code;

  if (!code) {
    let link = await profileService.redirectToAuthCodeFlow(clientId);
    res.redirect(link);
  } else {
    const accessToken = await profileService.getAccessToken(clientId, code);
    const profile = await profileService.fetchProfile(accessToken);
    console.log(profile);
    return profile;
  }
});

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: process.env.REDIRECT_URI
// });

// app.get('/authorize', (req, res) => {
//     const scopes = ['user-read-private', 'user-read-email'];
//     const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
//     res.redirect(authorizeURL);
// });

// app.get('/callback', (req, res) => {
//     const code = req.query.code;

//     spotifyApi.authorizationCodeGrant(code)
//         .then(data => {
//             spotifyApi.setAccessToken(data.body.access_token);

//             // Redirect to the profile endpoint
//             res.redirect('/profile');
//         })
//         .catch(error => {
//             console.error('Error during authorization:', error);
//             res.send('Error during authorization');
//         });
// });

// app.get('/profile', (req, res) => {
//     spotifyApi.getMe()
//         .then(data => {
//             res.send(`<html>
//                         <head>
//                             <title>Spotify Profile</title>
//                         </head>
//                         <body>
//                             <h1>Your Spotify Profile</h1>
//                             <p>Display profile information here</p>
//                             <pre>${JSON.stringify(data.body, null, 2)}</pre>
//                         </body>
//                     </html>`);
//         })
//         .catch(error => {
//             console.error('Error fetching profile:', error);
//             res.send('Error fetching profile');
//         });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
