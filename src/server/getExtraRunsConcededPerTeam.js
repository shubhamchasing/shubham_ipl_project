const getExtraRunsConcededPerTeam = (matchesData, deliveriesData) => {

    if (!matchesData || !deliveriesData) {
        return {};
    }

    const extraRuns = matchesData.reduce((details, currObj) => {

        let id = currObj.id

        if (currObj.season === "2016") {

            deliveriesData.forEach((item) => {

                if (item.match_id === id) {

                    let bowling_team = item.bowling_team

                    if (!details[bowling_team]) {
                        details[bowling_team] = 0
                    }
                    details[bowling_team] += parseInt(item.extra_runs)

                }
            })
        }
        return details;
    }, {})
    return extraRuns;
};


module.exports.getExtraRunsConcededPerTeam = getExtraRunsConcededPerTeam;