/* eslint-disable */ 
import {
  dataStore
} from '@/observable/store'
const Swal = require('sweetalert2');
import {i18n} from '@/i18n';
import kendo from "@progress/kendo-ui";
import { getPrint } from "@/form/invoices.js";
import { customerDetail } from "@/scripts/customerHandler";
import {
  getLastExchangeRateByDate,
} from "@/scripts/currency/handler/currencyHandler";
import { scheduleList, view } from '@/scripts/invoice/handler/billingHandler'

let company_data = dataStore.company
const juqery = require("jquery");

const tableExelExport =  ( function () {
  let uri = 'data:application/vnd.ms-excel;base64,',
       template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
       base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
       format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p] }) }
  return async function (table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    let ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    let downloadLink = document.createElement("a");
    let rp_name = await localStorage.getItem("@report_name")
    downloadLink.href = uri + base64(format(template, ctx));
    downloadLink.download = rp_name;
    downloadLink.click();
    // window.location.href = uri + base64(format(template, ctx))
  }
})()


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const shortMonthNames = monthNames.map(month => month.slice(0, 3));
const monthsWithYear = (year) => shortMonthNames.map(month => month + ' '+year);
const permision = {
    read_white: 'Write/ Read',
    edit: 'Edit' ,
    delete: 'Delete',
    void: 'Void'
}
const charName = [
"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"AA","AB","AC","AD","AE","AF","AG","AH",
];

const sortArray = (arr, field, type= 'asc') => {
  // type = 'desc'
  arr.sort((a, b) => {
    const nameA = a[field]; // ignore upper and lowercase
    const nameB = b[field]; // ignore upper and lowercase
    if (type == 'asc'){
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    } else {
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
    }
    // names must be equal
    return 0;
  });
  return arr;
}

const abbrSegmentPrefix   = (type, segment) => {
  // let num = ''

  let abbr = type
  // window.console.log('abbrSegmentPrefix', type)
  if(segment.checkPrefix){
    const pattern = segment.code
    abbr = abbr.replace(pattern, '')
    if(segment.position == 'Before'){
      return segment.code+abbr
    } else {
      return abbr+segment.code
    }
  }
  return abbr
}

const checkPermission = (children, action) => {
  console.log('children' , children)
  // for old
  if (children  == undefined) {
    return true
  }
  let child = children.filter(ch => ch.name == action)
  if(child.length == 0){
    return true
  }

  if(child[0].access == 0){
    return false
  }
  return true
}

const isDeleteAble = (modulesID,childID, type = permision.delete) => {
  let modules = dataStore.roles.filter(o => o.moduleId === modulesID)
  if (modules.length > 0) {
    if( modules[0].children ){
      let childAciton = modules[0].children.filter(p => p.code === childID && p.access === 1)
      if(childAciton.length > 0) {
        if(!checkPermission(childAciton[0].children, type)){
          return false
        }
      } 
      // else 
      // {
      //   return false
      // }
    
    }
  }
  return true
}

const isAccessSubModule = (modulesID,subId) => {
  let modules = dataStore.roles.filter(o => o.moduleId === modulesID)
  if (modules.length > 0) {
    if( modules[0].children ){
      let childAciton = modules[0].children.filter(p => p.code === subId && p.access === 1)
      window.console.log('childAciton' ,childAciton, modules[0].children)
      if(childAciton.length > 0) {
          return true
      }
      // return false
    }
  }
  return true
}

const notAcessRight = (msg) => {
  Swal.fire({
    position: "center",
    icon: "warning",
    title: i18n.t('not_allow'),
    text:  i18n.t(msg),
    confirmButtonText: i18n.t('ok'),
    showConfirmButton: true,
  });
}

const removeDuplicate = (array, field = 'id')  =>{
  const result = [];
  const map = new Map();
  for (const item of array) {
    if(field == ''){
      if (!map.has(item)) {
        map.set(item, true); // set any value to Map
        result.push(item);
      }
    } else {
      if (!map.has(item[field])) {
        map.set(item[field], true); // set any value to Map
        result.push(item);
      }
    }
  }
  return result;
}

const statusText = (type, num) => {
  let status = ''
  switch (num) {
    case 0:
      status = ''
      break;

    case 1:
      status = i18n.t("open");
      break;
    case 2:
      if (type === "Sale Lead" || type === "Sale Quote" || type === "Sale Order") {
        status = i18n.t("applied");
      } else {
        status = i18n.t("partially_paid");
      }
      break;
    case 3:
      status = i18n.t("paid_status");
      break;
    case 4:
      status = i18n.t("void");
      break;

  }
  return status
}
const exportExelFormat = (e, filter) => {
  company_data = dataStore.company
  /*
  == paramra===
    dataFrom: this.startDate ,
    dateTo:  this.endDate,
    title: 'Sale by customers',
    type: this.action
  */
  let myHeaders = []
  let amountSubField = [
    'Amount','Balance','Sub Total','Discount','Debit','Credit','Price','QTY', 'AVCO','Value','Qoh','Base Qty','Add. cost amount',
    'Modifier','Receipt Amount','Invoice Amount','Penalty','OTT amount','SPT amount','Vat Amount','Exchange Gain/Loss','PLT amount',
    'Open Amount',
    'ទឹកប្រាក់វិក្កយបត្រ','ទឹកប្រាក់បានទទួល','ពិន័យ','ចំណេញ/ ខាតអត្រាប្តូរប្រាក់','អាករលើតម្លៃបន្ថៃម','អាករពិសេស','អាករបំភ្លឺសាធារណៈ','អាករផ្សេងទៀត','សមតុល្យ',
    'ឥណពន្ធ','ឥណទាន','សរុបរង','តម្លៃ','បរិមាណ','ផលិតផលបន្ថែម','បញ្ចុះតម្លៃ','ចំនួនទឹកប្រាក់','ទឹកប្រាក់មិនទាន់ទូទាត់','ថ្លៃដើមបន្ថែម',
    ,'បរិមាណក្នុងដៃ','ថ្លៃដើមជាមធ្យម','ទឹកប្រាក់មិនទាន់ទូទាត់','បរិមាណគោល'
  ]
  let filedDate = [
    'កាលបរិច្ឆេទ', 'ថ្ងៃទទួលប្រាក់','កាលបរិច្ឆេទវិក្កយបត្រ',  'កាលបរិច្ឆេទចុះឈ្មោះ','ថ្ងៃខែ​ឆ្នាំ​កំណើត',
    'Registered Date','Date of birth','Invoice Date','Receipt Date','Date' ,'Year to date actual','Year to date','Current period'
  ]
  let filedNumber = [
    'លេខប្រតិបត្តិការ',
    'TXN Number'
  ]
  let statusField = [
    'Status',
    'ស្ថានភាព'
  ]
  let baseUom = [
    'ខ្នាតរង្វាស់គោល',
    'Base UOM'
  ]

  if(filter.dataFrom){
    let yearColumnName = monthsWithYear(new Date(filter.dataFrom).getFullYear())
    amountSubField =  amountSubField.concat(yearColumnName)
    console.log('amountSubField', amountSubField)
  }


  let title = company_data.name
  let rows = e.workbook.sheets[0].rows;
  myHeaders.push(  
    {
      value: company_data.name,
      textAlign: "left",
      fontFamily: "Khmer OS Siemreap" ,
      bold: true,
      // colSpan: 2,
      // wrap : true,
    }
  )

  if (filter.title!=''){
    title = title + '\n' +filter.title
    myHeaders.unshift(  
      {
        value: filter.title,
        textAlign: "left",
        fontFamily: "Khmer OS Siemreap" ,
        colSpan: 1,
        bold: true,
        // wrap : true,
      }
    )
  }


  if (filter.dataFrom !='' || filter.dateTo !=''){
    title = title  + filter.dataFrom  + ' - ' + filter.dateTo 
    if (filter.dateTo =='') {
      myHeaders.unshift(  
        {
          value: i18n.t("as_of") + " " + filter.dataFrom,
          textAlign: "left",
          fontFamily: "Khmer OS Siemreap" ,
          bold: true,
          //colSpan: 2,
          //wrap : true,
        }
      )
    } else {
      myHeaders.unshift(  
        {
          value: i18n.t("from") + " " + filter.dataFrom  + " " + i18n.t("to") + " "  + filter.dateTo ,
          textAlign: "left",
          fontFamily: "Khmer OS Siemreap" ,
          bold: true,
          //colSpan: 2,
          //wrap : true,
        }
      )
    }
    if (filter.type!=''){
      title = title + '\n' + filter.type
      myHeaders.unshift(  
        {
          value: filter.type,
          textAlign: "left",
          fontFamily: "Khmer OS Siemreap" ,
          bold: true,
          // colSpan: 2,
          // wrap : true,
        }
      )
    }
  }


  let startRow = 1;
  window.console.log('e.workbook.sheets', e.workbook.sheets)
  for (let ri = 0; ri < rows.length; ri++) {
      let row = rows[ri];
      let header = rows[0]
      // header
      if (row.type === "header") {
        header.cells.forEach(i => {
          i.bold= true,
          i.format = "dd-MM-yyyy",
          i.background="#ED1A3A"
          
        })
      }
      // group header
      if (row.type === "group-header") {
        row.cells.forEach(i => {
          i.background= '',
          i.color='Black',
          
          i.bold= true,
          i.colSpan = 1
        })
        row.cells.unshift({
          background: '#dfdfdf',
          color: '',
          value: '',
          colSpan: 1
        })
      }
    
      startRow++
      for (let ci = 0; ci < row.cells.length; ci++) {
          let cell = row.cells[ci];
          cell.fontFamily = "Khmer OS Siemreap"
          cell.fontSize = "11"

          // for row data
          if (row.type === "data") {
            if(header.cells[ci]){
              if (filedDate.includes(header.cells[ci].value)){
                cell.value =  new Date(cell.value)
                cell.format = "dd-MM-yyyy"
                cell.textAlign= "left"
                
              }
              if (filedNumber.includes(header.cells[ci].value)){
                cell.value =  cell.value
                cell.textAlign= "left"
                
              }
              // if(amountSubField.includes(header.cells[ci].value)  &&   kendo.parseFloat(cell.value)) {
              if(kendo.parseFloat(cell.value)) {
                header.cells[ci].textAlign= "right"
                cell.value = kendo.parseFloat(cell.value) ? kendo.parseFloat(cell.value) : cell.value
                cell.textAlign=  kendo.parseFloat(cell.value) ?  "right": "left" 
                cell.format = "#,##0.00_);(#,##0.00)"
              }

              if(statusField.includes(header.cells[ci].value)) {
                cell.value = statusText(filter.type, cell.value)
              }
              if (baseUom.includes(header.cells[ci].value)){
                cell.value =  cell.value
                cell.textAlign= "left"
                
              }
              // for account
              if(kendo.parseFloat(cell.value) == undefined && header.cells[0].value == 'Account'){
                cell.bold = "true"
              }
              if(e.data.filter(ac => ac.name == cell.value).length > 0){
                if(e.data.filter(ac => ac.name == cell.value)[0].hasChildren || e.data.filter(ac => ac.name == cell.value)[0].parentId !=null ){
                  cell.value = e.data.filter(ac => ac.name == cell.value)[0].number + ' - ' + cell.value
                }
              }
            
            } else {
              if(e.data.filter(ac => ac.name == cell.value).length > 0){
                cell.value = e.data.filter(ac => ac.name == cell.value)[0].number + ' - ' + cell.value
              }
              cell.value = kendo.parseFloat(cell.value) ?  kendo.parseFloat(cell.value) : cell.value
              cell.textAlign= kendo.parseFloat(cell.value) != undefined ?  "right" : "left"
              cell.format = "#,##0.00_);(#,##0.00)"
            }
          }
      }
      // for footer data
      if (row.type === "group-footer") {
        for (let ci = 0; ci < row.cells.length; ci++) { 
          let cell = row.cells[ci];
          cell.fontFamily = "Khmer OS Siemreap"
          if (cell.value != '' && kendo.parseFloat(cell.value)) {
            cell.value = kendo.parseFloat(cell.value)
            cell.format = "#,##0.00_);(#,##0.00)"
            cell.bold = "true"
            cell.background = '#dfdfdf'
            cell.color = 'black'
            cell.borderBottom = { color: "black", size: 4 };
            cell.textAlign= "right"
          }
          else {(cell.value =='សរុប' || cell.value =='Total') 
            cell.value = cell.value
            cell.background = '#dfdfdf'
            cell.color = 'black'
            cell.bold = "true"
            cell.borderBottom = { color: "black", size: 4 };
            cell.textAlign= "left"
          }
          // if(header.cells[ci].value == 'Amount') {
          //   cell.formula = `=SUM(${charName[ci]+startRow}:${charName[ci]+ startRow})`
          // }
        }
      }
  }
  e.workbook.fileName =  filter.title+' - '+filter.dataFrom  +  ' - ' + filter.dateTo 
  myHeaders.forEach(h => {
    e.workbook.sheets[0].rows.unshift({ cells: [h], type: "title"});
  })

}

const  containsNumbersAndCaracter = (str) => {
  let pattern = /^[a-zA-Z0-9]*$/;
  return Boolean(pattern.test(str));
}

const  containsOnlyNumbers = (str) => {
  return /^\d+$/.test(str);
}
const  containsOnlyCharacter = (str) => {
  return  /^[a-zA-Z.]*$/.test(str);
}

const  isHaveSpace = (str) => {
  return  /^.+\s.+$/g.test(str);
}

const invoicePrintRow  = async (invoice) => {
  if(invoice.length > 0){
    let total = invoice.length;
    let count = 0;
    let percentComplete = '0'
    Swal.fire({
      position: "center",
      icon: "warning",
      title: i18n.t('processing'),
      text: percentComplete,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    for (let index = 0; index < invoice.length; index++) {
      count++;
      percentComplete = (count / total) * 100;
      juqery('#swal2-content').text(percentComplete.toFixed(2)+'%')
      // window.console.log('percentComplete=' , percentComplete)
      let strTxnId = invoice[index].id || "";
      let extraParam = '';
      if (invoice[index].nrd) {
        extraParam = "?nrd=true&skipLine=true";
      }
      let invoiceView = await view(strTxnId + extraParam)
      if(invoiceView.data.data.length > 0) {
        invoice[index] = invoiceView.data.data[0]
      }
      // window.console.log(' invoice view=' , invoiceView)
      let pub_link = "";
      let code = "KHR";
    
      if (process.env.VUE_APP_MODE == "dev") {
        pub_link = `https://invoices.banhji.com/en/invoice/${
          invoice[index].publicLink
        }/${dataStore.company.id.split("-")[1]}`;
      } else {
        pub_link = `https://invoices.banhji.com/en/invoice/${
          invoice[index].publicLink
        }/${dataStore.company.id.split("-")[1]}`;
      }
      dataStore.publick_inv_link = pub_link;
      // window.console.log(pub_link);
    
      const invoiceScheduleList = await scheduleList(strTxnId);
    
      // if (invoice.customer.nature == "Company") {
        const strFilter = "?id=" + invoice[index].customer.id || "";
        const customerRes = await customerDetail(strFilter);
        if (customerRes.data.data.length > 0) {
          invoice[index].customer = customerRes.data.data[0];
          if(Object.keys(invoice[index].billingAddress).length == 0) {
            invoice[index].billingAddress = invoice[index].customer.billingAddress.length > 0 ?   invoice[index].customer.billingAddress[0]: {}
          }
        } else {
          invoice[index].customer.taxId = "";
        }
      // PUBLIC LINK
      // invoice.currency = invoice.baseCurrency
      if (invoice[index].baseCurrency.code == "USD") {
        const date = invoice[index].transactionDate;
        let base = dataStore.company.baseCurrency.code;
        if (dataStore.company.baseCurrency.code !== "USD") {
          code = "USD";
        }
        const getRate = await getLastExchangeRateByDate(date, code);
    
        if (getRate.data.data.length > 0) {
          invoice[index].rateKHR = getRate.data.data[0];
          invoice[index].rateKHR.base = base;
          invoice[index].rateKHR.baseSymbol = dataStore.company.baseCurrency.symbol;
        }
      }
      let isLast = false
      if(index == invoice.length-1) {
        isLast = true
        Swal.close();
      }

      getPrint(invoice[index], invoiceScheduleList.data.data, isLast);
    }

  } else {
    let strTxnId = invoice.id || "";
    let extraParam = '';
    if (invoice.nrd) {
      extraParam = "?nrd=true&skipLine=true";
    }
    let invoiceView = await view(strTxnId + extraParam)
    if(invoiceView.data.data.length > 0) {
      invoice = invoiceView.data.data[0]
    }
    // window.console.log(' invoice view=' , invoiceView)
    let pub_link = "";
    let code = "KHR";
  
    if (process.env.VUE_APP_MODE == "dev") {
      pub_link = `https://invoices.banhji.com/en/invoice/${
        invoice.publicLink
      }/${dataStore.company.id.split("-")[1]}`;
    } else {
      pub_link = `https://invoices.banhji.com/en/invoice/${
        invoice.publicLink
      }/${dataStore.company.id.split("-")[1]}`;
    }
    dataStore.publick_inv_link = pub_link;
  
    const invoiceScheduleList = await scheduleList(strTxnId);
  
    // if (invoice.customer.nature == "Company") {
      const strFilter = "?id=" + invoice.customer.id || "";
      const customerRes = await customerDetail(strFilter);
      if (customerRes.data.data.length > 0) {
        invoice.customer = customerRes.data.data[0];
        if(Object.keys(invoice.billingAddress).length == 0) {
          invoice.billingAddress = invoice.customer.billingAddress.length > 0 ?   invoice.customer.billingAddress[0]: {}
        }
      } else {
        invoice.customer.taxId = "";
      }
    // PUBLIC LINK
    // invoice.currency = invoice.baseCurrency
    if (invoice.baseCurrency.code == "USD") {
      const date = invoice.transactionDate;
      let base = dataStore.company.baseCurrency.code;
      if (dataStore.company.baseCurrency.code !== "USD") {
        code = "USD";
      }
      const getRate = await getLastExchangeRateByDate(date, code);
  
      if (getRate.data.data.length > 0) {
        invoice.rateKHR = getRate.data.data[0];
        invoice.rateKHR.base = base;
        invoice.rateKHR.baseSymbol = dataStore.company.baseCurrency.symbol;
      }
    }
    getPrint(invoice, invoiceScheduleList.data.data);
  }

}


export {
 tableExelExport,
 sortArray,
 abbrSegmentPrefix,
 permision,
 checkPermission,
 isDeleteAble,
 notAcessRight,
 isAccessSubModule,
 removeDuplicate,
 exportExelFormat,
 containsNumbersAndCaracter,
 containsOnlyNumbers,
 containsOnlyCharacter,
 isHaveSpace,
 invoicePrintRow
}
