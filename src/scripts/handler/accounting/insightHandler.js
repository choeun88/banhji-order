const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET
module.exports.getInsights = async () => {
    try {
        const response = await axios.get(apiUrl.insights_get);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ASSET LIABILITY REPORT
module.exports.getAssetLiabilityReport = async (asOfDate) => {
    try {
        const response = await axios.get(apiUrl.asset_liability_report, {
            params : {
                as_of_date: asOfDate
            }
        });

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET VARIANCE ANALYSIST
module.exports.getVarianceAnalysist = async (monthOf, compareMonthOf) => {
    try {
        const response = await axios.get(apiUrl.variance_analysist, {
            params : {
                month_of: monthOf,
                compare_moth_of: compareMonthOf
            }
        });

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET VARIANCE ANALYSIST
module.exports.getChangeInRetainEarning = async (monthOf, compareMonthOf) => {
    try {
        const response = await axios.get(apiUrl.change_in_retain_earning, {
            params : {
                month_of: monthOf,
                compare_moth_of: compareMonthOf
            }
        });

        return response;
    } catch (error) {
        window.console.error(error);
    }
}