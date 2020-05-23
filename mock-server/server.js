const express = require('express');
const request = require('request');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(cors());


// Mocks

// Rennes
app.get('/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie/352380', function (req, res) {
    console.log(`${moment().format('ddd hh:mm:ss.SSSS')} | Mock Request : ${req.url}`);
    res.send(jsonRennesYPleut);
});

// Réaumur 
app.get('/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie/851870', function (req, res) {
    console.log(`${moment().format('ddd hh:mm:ss.SSSS')} | Mock Request : ${req.url}`);
    res.send(jsonReaumurWeird);
});


// Proxy
app.get('/*', function (req, res) {
    const timestamp = new Date();
    console.log(`${moment().format('ddd hh:mm:ss.SSSS')} | Proxy Request : ${req.url}`);

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

const jsonReaumurWeird = {
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
        "niveauPluieText": "Pas de précipitations",
        "niveauPluie": 1,
        "color": "009ee0"
    },
    {
        "niveauPluieText": "Données indisponibles",
        "niveauPluie": 0,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Pas de précipitations",
        "niveauPluie": 1,
        "color": "006ab3"
    },
    {
        "niveauPluieText": "Pas de précipitations",
        "niveauPluie": 1,
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