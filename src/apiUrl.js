'use strict'

// const billing = require("./api/billing")

module.exports = {
    nlfapp: require("./api/order"),
    commerce: require("./api/commerce"),
    loyalty: require("./api/loyalty"),
    order: require("./api/order"),
    product: require("./api/product"),
    price_promotion: require("./api/price-promotion"),
    billing: require("./api/billing")
}