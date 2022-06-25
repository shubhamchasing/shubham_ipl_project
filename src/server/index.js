
const getRequest = (resource, getData) => {

    return fetch(resource).then(response => response.json())
        .then(response => {
            getData(response)
        })
}

// Number of matches played per year for all the years in IPL.
const initialiseChart1 = (obj) => {
    const years = Object.keys(obj);
    const matches = Object.values(obj);

    Highcharts.chart('container1', {

        chart: {
            type: 'line'
        },

        title: {
            text: 'Matches Played Per Year in IPL'
        },

        yAxis: {
            title: {
                text: 'Number of Matches'
            }
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Years'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2008
            }
        },

        series: [{
            name: 'No. of matches',
            data: matches
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

getRequest('../public/output/matchesPlayedPerYear.json', initialiseChart1)

// Number of matches won per team per year in IPL.
const initialiseChart2 = (obj) => {

    const years = Object.keys(obj)
    let teams = []

    years.forEach((year) => {

        let yearData = obj[year]
        let yearteams = Object.keys(yearData)

        teams.push(...yearteams)
    })

    let uniqueTeams = [...new Set(teams)]

    let teamsPoints = years.reduce((result, currentValue) => {

        let yearData = obj[currentValue]

        uniqueTeams.forEach((value) => {

            if (value !== "") {
                let presentValue = yearData[value] ? yearData[value] : null

                if (result[value]) {
                    result[value] = [...result[value], presentValue]
                } else {
                    result[value] = [presentValue]
                }
            }
        })
        return result
    }, {})

    let arrObj = Object.keys(teamsPoints).map((value) => {
        return { name: value, data: teamsPoints[value] }
    })

    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Matches won per team per year'
        },
        xAxis: {
            categories: years,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Matches'
            }
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: arrObj
    });
}

getRequest('../public/output/matchesWonPerTeamPerYear.json', initialiseChart2)

// Extra runs conceded per team in the year 2016
const initialiseChart3 = (obj) => {
    const teams = Object.keys(obj)
    const extraRunsConceded = Object.values(obj)

    Highcharts.chart('container3', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Extra runs conceded per team in the year 2016'
        },

        xAxis: {
            categories: teams,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null ,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Extra runs',
            data: extraRunsConceded
        }]
    });
}

getRequest('../public/output/extraRunsConcededPerTeam.json', initialiseChart3)

// Top 10 economical bowlers in the year 2015
const initialiseChart4 = (arrObj) => {
    let bowlersName = [];
    let bowlersEconomy = [];

    arrObj.forEach((value) => {
        const { bowler, economy } = value;
        bowlersName.push(bowler)
        bowlersEconomy.push(parseFloat(economy))
    });

    Highcharts.chart('container4', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Top 10 economical bowlers in the year 2015'
        },

        xAxis: {
            categories: bowlersName,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Economy rate',
            data: bowlersEconomy
        }]
    });
}

getRequest('../public/output/top10EconomicalBowlersIn2015.json', initialiseChart4) 