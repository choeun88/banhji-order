const { i18n } = require("@/i18n");

const header = `
<head>
<title>Test</title>
<style rel="stylesheet" >
* {
    -webkit-print-color-adjust: true;
    -webkit-print-color-adjust: exact;
}
@page {
    size: A4;
}
@font-face {
    font-family: 'Niradei-Bold';
    font-weight: bold;
    font-display: swap;
    font-style: normal;
    src: local('Niradei'), local('Niradei-Bold'), url('@/assetts/styles/fonts/Niradei-Bold.woff2') format('woff2');
}
@font-face {
    font-family: 'Niradei-Regular';
    font-weight: 600;
    font-display: swap;
    font-style: normal;
    src: local('Niradei'), local('Niradei-Regular'), url('@/assetts/styles/fonts/Niradei-Regular.woff2') format('woff2');
}
body { 
    -webkit-print-color-adjust: exact;
    font-family: 'Niradei-Regular' !important;
    print-color-adjust: exact;
}
table,tr,td{
    border-collapse: collapse !important; 
}
@media print {
    html, body {
        font-family: 'Niradei-Regular'  !important;
        margin: 6;
        margin-top: 20;
        margin-bottom: 30;
        margin-right: 20;
        width: 21cm;
        height: 29.7cm; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact;
    },
    .pagebreak {
        clear: both;
        margin-top: 30mm;
        page-break-before: always !important;
        page-break-after: always !important;
    }
}
</style>
</head>
`;
exports.invoices = (data, id, lang) => {
  window.console.log("import from lange", i18n.locale);

  if (lang == "kh") {
    return `
            <html>
                ${header}
                <body>
                    <h1>ខ្មែរ  id= ${id}</h1>
                    <h1>Data id= ${data}</h1>
                    <p>This is traslation: ${i18n.t("customer")}</p>
                </body>
            </html>
         `;
  } else {
    return ` 
            <html>
                ${header}
                <body>
                    <h1>I HAVE   TO Form id= ${id}</h1>
                    <h1>Data id= ${data}</h1>
                    <p>This is traslation: ${i18n.t("customer")}</p>
                </body>
            </html>
        `;
  }
};

function loadPlay(data){
    var items = ""
    window.console.log(0)
    data.forEach(element => {
        window.console.log(1)
                       
        items = items + `
            <tr>
            <td colspan="2" style="text-align: left; padding-left: 30px; border-top: none;">
                <span>ឈ្មោះ Name:</span><span style="padding-left: 10px;" >${element.name}</span><br/>
            </td>
            <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 15px;">${element.id}</td>
            <td style="width: 25%; border: 1px solid; text-align: left; padding-left: 10px;">${element.subject}</td>
            </tr>
            `;
        
    })
    window.console.log(2, items)
    return items;
}
exports.defaulFormGoute = (data, id, lang) => {
    window.console.log(data)
  return ` 
    <html>
        ${header}
        <body>
            <table class="table" style="width: 100%; border: 1px solid;">
                <tbody>
                    ${loadPlay(data)}
                    <tr>
                    <td colspan="2" style="padding: 12px; width: 50%; border: 1px solid; font-weight: bold; font-size: 22px; border-bottom: none;">ព័ត៌មានអតិថិជន ${id}</td>
                    <td colspan="2" style="width: 50%; border: 1px solid #1d365f; font-weight: bold; font-size: 22px; color: #fff!important; background-color: #1d365f!important;">VIA EMAIL:  ${lang}</td>
                    </tr>
              
             
                    <tr>
                    <td colspan="2" style="text-align: left; padding-left: 30px; border-bottom: none!important;"><span>អាស័យដ្ឋាន Address:</span><span style="padding-left: 10px;" data-bind="text: obj.contact.address"></span></td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 15px;">កាលបរិច្ឆេទ DATE</td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 10px;">ho</td>
                    </tr>
                    <tr>
                    <td colspan="2" style="text-align: left; padding-left: 30px;"><span>លេខទូរសព្ទ័ Tel:</span><span style="padding-left: 10px;" >hom</span></td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 15px;">ឈ្មោះ CONTACT</td>
                    <td style="width: 20%; border: 1px solid; text-align:left; padding-left: 10px;">
                        <span>homw</span>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="2" style="text-align: left; padding-left: 30px;"><span>អុីមែល Email:</span><span style="padding-left: 10px;">hom</span></td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 15px;">អុីមែល EMAIL</td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 10px;" >hom</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 15px;">លេខទូរស័ព្ទ TEL</td>
                    <td style="width: 20%; border: 1px solid; text-align: left; padding-left: 10px;">home</td>
                    </tr>
                </tbody>
            </table>
    
        
        </body>
    </html>
`;
};

exports.print = (data, form_id, lang) => {
  let win = window.open("", "invoice", "width=1200, height=850,left=100");
  let doc = win.document.open();
  doc.write(this.defaulFormGoute(data, form_id, lang));
//   doc.close();
  setTimeout(function() {
    win.print();
    win.close();
  }, 3000);
};
