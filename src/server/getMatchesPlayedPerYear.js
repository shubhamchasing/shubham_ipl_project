const getMatchesPlayedPerYear = (matchesData) => {

    if (!matchesData) {
        return {};
    }

    const matchesPerYear = matchesData.reduce((details, currObj) => {

        let year = currObj.season

        if (!details[year]) {
            details[year] = 0;
        }

        details[year]++;

        return details
    }, {})
    return matchesPerYear
}

module.exports.getMatchesPlayedPerYear = getMatchesPlayedPerYear;