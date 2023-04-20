const { createQr } = require("@/scripts/bankHandler");

exports.kQr = async (currency_code, payment) => {
  window.console.log(payment);
  try {
    const data = {
      instituteId: "inst-noir-ttp",
      clientId: "bank-2fda720a-0aac-4dfd-9ea8-c5e5ca125c4a",
      mobileNumber: "016680644",
      currency: currency_code,
      amount: payment.amount,
      number: "951357",
      customerNumber: "9999948",
      instituteName: "Cafe Shop",
    };
    let kcode = await createQr("amk", data);
    return kcode.data;
  } catch {
    return "";
  }
};
