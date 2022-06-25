const csvToJson = require('csvjson');
const fs = require('fs');
const path = require('path');
const { getMatchesPlayedPerYear } = require('./getMatchesPlayedPerYear');
const { getMatchesWonPerTeamPerYear } = require('./getMatchesWonPerTeamPerYear');
const { getExtraRunsConcededPerTeam } = require('./getExtraRunsConcededPerTeam');
const { getTop10EconomicalBowlersIn2015 } = require('./getTop10EconomicalBowlersIn2015');
const { getJsonFromObject } = require('./utility');

const matchesJson = fs.readFileSync(path.join(__dirname, '../data/matches.csv'), { encoding: 'utf8' });
const deliveriesJson = fs.readFileSync(path.join(__dirname, '../data/deliveries.csv'), { encoding: 'utf8' });

const options = {
    delimiter: ',',
    quote: '"'
};

const matchesData = csvToJson.toObject(matchesJson, options);
const deliveriesData = csvToJson.toObject(deliveriesJson, options);

const dirPath = '../public/output/';

getJsonFromObject('matchesPlayedPerYear.json', dirPath, getMatchesPlayedPerYear(matchesData))
getJsonFromObject('matchesWonPerTeamPerYear.json', dirPath, getMatchesWonPerTeamPerYear(matchesData))
getJsonFromObject('extraRunsConcededPerTeam.json', dirPath, getExtraRunsConcededPerTeam(matchesData, deliveriesData))
getJsonFromObject('top10EconomicalBowlersIn2015.json', dirPath, getTop10EconomicalBowlersIn2015(matchesData, deliveriesData))

