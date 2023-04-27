const axios = require('axios')
const apiUrl = require('../apiUrl.js')

//Search URL
module.exports.searchURL = function () {
    try {
        const response = apiUrl.employee.employee_search
        return response
    } catch (error) {
        window.console.error(error)
    }
}


//Search
module.exports.search = function () {
    try {
        const response = apiUrl.employee.employee_center
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Center
module.exports.center = async function (search) {
    try {
        let response = []
        if (search !== '' && search !== null && search !== 'null' && search !== undefined) {
            response = await axios.get(apiUrl.employee.employee_center + '/' + search)
            return response
        } else {
            response = await axios.get(apiUrl.employee.employee_center)
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}
// // List
// module.exports.list = async function () {
//     try {
//         const response = await axios.get(apiUrl.customer.customer_get)
//
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }
// Get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.employee_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.employee_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id) => {
    try {
        const response = await axios.put(apiUrl.employee.employee_update + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.employee.employee_center)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createEmployment = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.employment_record_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmploymentListByEmployee = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.record_list_by_employee_get + '/' +  id)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getRecord = async function (param) {
    try {
        const response = await axios.get(apiUrl.employee.record_get,{
            params: {
                status:             param.status ? param.status: 1,
                employeeId:         param.employeeId ? param.employeeId: '',
                location_id:        param.location_id || '',
                department_id:      param.department_id || '',
                natureContract_id:  param.natureContract_id || '',
                employeeGroup_id:   param.employeeGroup_id || ''
            }
        })
        return response
        
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmploymentByEmployee = async (id) => {
    try {
        const response = await axios.get(apiUrl.employee.record_by_employee_get + `/${id}`)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createTimesheet = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.timesheet_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTimesheet = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.timesheet_get+ '/' +  id)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTimesheetSingle = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.timesheet_single+  '/' +  id)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeTransactions = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.transactions+  '/' + val.employeeUuid,{
            params: {
                start: val.start,
                end: val.end
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeInfo = async function (employeeUuid) {
    try {
        const response = await axios.get(apiUrl.employee.employee_info+  '/' +  employeeUuid)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeDashboard = async function () {
    try {
        const response = await axios.get(apiUrl.employee.employee_dashboard)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeBalance = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.employee_balance,{
            params:{
                'employeeUuid': val.employeeUuid ? val.employeeUuid: '',
                'end_date': val.end_date
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeLeave = async function (search, params) {
    try {
        let response = []
        if (search !== '' && search !== null && search !== 'null' && search !== undefined) {
            response = await axios.get(apiUrl.employee.employee_leave + '/' + search,{
                params: {
                    'year':      params.year,
                }
            })
            window.console.log('response',response)
            return response
        } else {
            response = await axios.get(apiUrl.employee.employee_leave,{
                params: {
                    'year':      params.year,
                }
            })
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLeaveSummary = async function (search, params) {
    try {
        let response = []
        if (search !== '' && search !== null && search !== 'null' && search !== undefined) {
            response = await axios.get(apiUrl.employee.leave_summary + '/' + search,{
                params: {
                    'year':      params.year,
                }
            })
            return response
        } else {
            response = await axios.get(apiUrl.employee.leave_summary,{
                params: {
                    'year':      params.year,
                }
            })
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createFringeBenefit = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.employee_benefit, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getFringeBenefit = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.employee_benefit_get,{
            params:{
                month_of: val
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLastNumber = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.last_number_get,{
            params:{
                abbr: val.abbr,
                id:   val.id || ""
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getAnalySpecifice = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.analy_specifice_get,{
            params:{
                startMonth: val.startMonth || '',
                endMonth:   val.endMonth || ''
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getAnalyProject = async function (val) {
    try {
        const response = await axios.get(apiUrl.employee.analy_project_get,{
            params:{
                startMonth: val.startMonth || '',
                endMonth:   val.endMonth || ''
            }
        })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}