const express = require('express');
const request = require('request');
const cors = require('cors');


const app = express();
app.use(cors());

// app.get('/proxy/*', function (req, res) {
//     console.log(req.url);
//     const newurl = req.params[0];
//     request(newurl).pipe(res);
// });


// app.get('/mock/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie/352380', function (req, res) {
//     console.log(req.url);

//     res.send(jsonRennesYPleut);
// });

// Mocks
app.get('/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie/352380', function (req, res) {
    console.log(`Mock Request : ${req.url}`);

    res.send(jsonRennesYPleut);
});

// Proxy
app.get('/*', function (req, res) {
    console.log(`Proxy Request : ${req.url}`);
    const newurl = req.params[0];
    request(newurl).pipe(res);
});

app.listen(4000, function () {
    console.log('Dev Proxy and Mock app listening on port 4000 !')
})

const jsonRennesYPleut = {
    "idLieu": "352380",
    "echeance": "202005092255",
    "lastUpdate": "22h40",
    "isAvailable": true,
    "hasData": true,
    "niveauPluieText": [
        "De22h55 à 23h05 : Précipitations modérées",
        "De23h05 à 23h55 : Pas de précipitations"
    ],
    "dataCadran": [{
        "niveauPluieText": "Pas de précipitations",
        "niveauPluie": 1,
        "color": "ffffff"
    },
    {
        "niveauPluieText": "Précipitations modérées",
        "niveauPluie": 3,
        "color": "009ee0"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations fortes",
        "niveauPluie": 4,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Précipitations faibles",
        "niveauPluie": 2,
        "color": "5ec5ed"
    },
    {
        "niveauPluieText": "Précipitations faibles",
        "niveauPluie": 2,
        "color": "5ec5ed"
    },
    {
        "niveauPluieText": "Précipitations modérées",
        "niveauPluie": 3,
        "color": "009ee0"
    },
    {
        "niveauPluieText": "Précipitations modérées",
        "niveauPluie": 3,
        "color": "009ee0"
    }
    ]
}