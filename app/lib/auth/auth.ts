// jp1.api.riotgames.com

// const request = require("request");
// const express = require("express");
// const app = express();
// const port = 3000;

// const clientID = "client_id",
//     clientSecret = "client_secret";

// const appBaseUrl = "http://local.example.com:3000",
//     appCallbackUrl = appBaseUrl + "/oauth";

// const provider = "https://auth.riotgames.com",
//     authorizeUrl = provider + "/authorize",
//     tokenUrl = provider + "/token";

// app.get("/", function (req, res) {
//     const link =
//         authorizeUrl +
//         "?redirect_uri=" +
//         appCallbackUrl +
//         "&client_id=" +
//         clientID +
//         "&response_type=code" +
//         "&scope=openid";
//     // create a single link, send as an html document
//     res.send('<a href="' + link + '">Sign In</a>');
// });

// app.get("/oauth", function (req, res) {
//     const accessCode = req.query.code;

//     // make server-to-server request to token endpoint
//     // exchange authorization code for tokens
//     request.post(
//         {
//             url: tokenUrl,
//             auth: {
//                 // sets "Authorization: Basic ..." header
//                 user: clientID,
//                 pass: clientSecret,
//             },
//             form: {
//                 // post information as form-data
//                 grant_type: "authorization_code",
//                 code: accessCode,
//                 redirect_uri: appCallbackUrl,
//             },
//         },
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 // parse the response to JSON
//                 const payload = JSON.parse(body);

//                 // separate the tokens from the entire response body
//                 const tokens = {
//                     refresh_token: payload.refresh_token,
//                     id_token: payload.id_token,
//                     access_token: payload.access_token,
//                 };

//                 // legibly print out our tokens
//                 res.send("<pre>" + JSON.stringify(tokens, false, 4) + "</pre>");
//             } else {
//                 res.send("/token request failed");
//             }
//         }
//     );
// });

// app.listen(port, () => console.log(`Example app listening on post ${port}!`));
