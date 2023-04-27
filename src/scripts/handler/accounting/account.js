let axios = require('axios');
let apiUrl = require('@/apiUrl.js');
let urlPath = apiUrl.accounts;

// GET BY ID
module.exports.getOne = async (id) => {
  try {
    let response = await axios.get(urlPath + `/${id}`);

    return response
  } catch (error) {
    window.console.error(error);
  }
}

// GET ALL
module.exports.getAll = async () => {
  try {
    let response = await axios.get(urlPath, {
      params: {
        reqeust_acc_balance: false,
        start_date: '0',
        end_date: '0',
      }
    });

    return response;
  } catch (error) {
    window.console.error(error);
  }
}

// GET ALL PAGES
module.exports.getAllPages = async () => {
  try {
    let results = [],
      page = 1,
      pageSize = 500;

    let requestUrl = urlPath, isTesting = false;
    if(isTesting){
      requestUrl = "https://apis.banhji.com/accounting-v2/inst-07716228/accounts?reqeust_acc_balance=false&start_date=0&end_date=0";
    }

    /* Lead request */
    let leadResponse = await axios.get(requestUrl, {
      params: {
        reqeust_acc_balance: false,
        start_date: '',
        end_date: '',
        page_number: page,
        item_per_page: pageSize,
      }
    });

    if (leadResponse) {
      /* Add to result */
      results = [...leadResponse.data.data];

      let requests = [],
        totalPages = Math.ceil(leadResponse.data.total_item_count / pageSize);

      if (totalPages > 1) {
        /* Increase to second page */
        page++;

        /* Loop the rest of pages */
        for (let i = page; i <= totalPages; i++) {
          /* Requests */
          let request = axios.get(requestUrl, {
            params: {
              page_number: i,
              item_per_page: pageSize,
            }
          })

          /* Add requests */
          requests.push(request);
        }

        let responses = await Promise.all(requests);
        for (let j = 0; j < totalPages - 1; j++) {
          let element = responses[j];
          if (element) {
            results = [...results, ...element.data.data];
          }
        }
      }
    }

    return results;
  } catch (error) {
    window.console.error(error);
  }
}

// GET ACCOUNT BY ACCOUNT TYPE
module.exports.getByAccountType = async (typeNumber) => {
  try {
    let response = await axios.get(apiUrl.account_types + `/${typeNumber}/accounts`);

    return response;
  } catch (error) {
    window.console.error(error);
  }
}

// SAVE
module.exports.save = async (data) => {
  try {
    const response = await axios.post(urlPath, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// GET ALL
module.exports.getMonthlyBalance = async (data) => {
  try {
    let queryStrings = `?start_date=${data.start_date}&end_date=${data.end_date}`;
    let response = await axios.post(urlPath + '/balance/monthly' + queryStrings, data.accountIds);

    return response;
  } catch (error) {
    window.console.error(error);
  }
}

// GET ALL
module.exports.getBalance = async (query) => {
  try {
    // const response = await axios.post()
    window.console.log('log==', query)
    return {
      amount: query.account[0].number || 100,
      budget: query.account[1].number || 100
    }
  } catch (error) {
    window.console.error(error)
  }
}
