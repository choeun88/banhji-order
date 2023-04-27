/* Statement Of Profit Or Loss */
const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.income_statement_get;

// GET
module.exports.getIncomeStatement = async (params, secondary="") => {
    try {
        const response = await axios.get(urlPath + secondary, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET
module.exports.get = async (dimension, id, params) => {
    try {
        const response = await axios.get(apiUrl.accounting_report + `/reports/pnl/${dimension}/${id}`, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY PROJECT
module.exports.getByProject = async (params, projectUuid, secondary="") => {
    try {
        const response = await axios.get(urlPath + `${secondary}/project/${projectUuid}`, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY PROJECTS
module.exports.getByProjects = async (startDate, endDate, proIds, secondary="") => {
    try {
        let requests = [];
        for (const proId of proIds) {
            let request = await axios.get(urlPath + `${secondary}/project/${proId}`,{
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    group_by: "1",
                },
            })

            /* Add requests */
            requests.push(request);
        }

        let responses = await Promise.all(requests);

        let results = [];
        for (let i = 0; i < proIds.length; i++) {
            const element = responses[i];
            results.push(element.data);
        }
        return results;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY SEGMENTS
module.exports.getBySegments = async (startDate, endDate, segIds, secondary="") => {
    try {
        let requests = [];
        for (const segId of segIds) {
            let request = await axios.get(urlPath + secondary,{
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    group_by: "1",
                    segment_uuid: segId,
                },
            })

            /* Add requests */
            requests.push(request);
        }

        let responses = await Promise.all(requests);

        let results = [];
        for (let i = 0; i < segIds.length; i++) {
            const element = responses[i];
            results.push(element.data);
        }
        return results;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACCOUNT BALANCE
module.exports.getAccountBalance = async (params) => {
    try {
        const response = await axios.get(apiUrl.accounting_report + "/reports/accountsbalance", params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY BUSINESS UNIT
module.exports.getByBusinessUnit = async (params, location_id) => {
    try {
        const response = await axios.get(urlPath + `/bu/${location_id}`, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}