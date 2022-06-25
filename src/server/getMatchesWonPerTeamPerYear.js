const getMatchesWonPerTeamPerYear = (matchesData) => {

    if (!matchesData) {
        return {};
    }

    const matchesWon = matchesData.reduce((details, currObj) => {

        let season = currObj.season
        let winner = currObj.winner

        if (details[season]) {

            if (details[season][winner] && details[season][winner] !== "") {
                details[season][winner] += 1
            }
            else {
                details[season][winner] = 1
            }
        }
        else {
            details[season] = {}
            details[season][winner] = 1
        }
        return details
    }, {})
    return matchesWon;
}


module.exports.getMatchesWonPerTeamPerYear = getMatchesWonPerTeamPerYear;
