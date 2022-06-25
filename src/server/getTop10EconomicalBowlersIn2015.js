const getTop10EconomicalBowlersIn2015 = (matchesData, deliveriesData) => {

    if (!matchesData || !deliveriesData) {
        return {};
    }

    const bowlersDetails = matchesData.reduce((details, currObj) => {


        let id = currObj.id

        if (currObj.season === "2015") {
            deliveriesData.forEach((item) => {
                let bowler = item.bowler
                let total_runs = item.total_runs
                if (item.match_id === id) {

                    if (!details[bowler]) {
                        details[bowler] = { balls: 0, total: 0 }
                    }

                    details[bowler]["balls"] += 1
                    details[bowler]["total"] += parseInt(total_runs)
                }
            })
        }
        return details
    }, {})

    let economicalBowlers = [];

    Object.keys(bowlersDetails).forEach(item => {

        let overs = bowlersDetails[item]["balls"] / 6
        let economy = (bowlersDetails[item]["total"] / overs).toFixed(2)
        let bowler = item

        economicalBowlers.push({ bowler, economy })
    })

    let sortedEconomicalBowlers = economicalBowlers.sort((bowler1, bowler2) => bowler1.economy - bowler2.economy).slice(0, 10)

    return sortedEconomicalBowlers;
}


module.exports.getTop10EconomicalBowlersIn2015 = getTop10EconomicalBowlersIn2015
