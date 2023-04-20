const saleQuote = () => {
  return {
    title: {
      en: {
        name: 'Sale Quote',
        status: true
      },
      kh: {
        name: 'សម្រង់លក់',
        status: true
      }
    },
    logo: {
      width: 139,
      height: 125,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 59,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: ''
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: ''
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: ''
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: ''
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: ''
      },
      option: 1,
      positon: true
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'left'
    }
  }
}
const saleOrder = () => {
  return {
    title: {
      en: {
        name: 'Sale Order',
        status: true
      },
      kh: {
        name: 'ការបញ្ជាទិញលក់',
        status: true
      }
    },
    page: 'A4',
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: ''
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: ''
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: ''
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: ''
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: ''
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'left'
    }
  }
}
const saleDeposit = () => {
  return {
    title: 'Sale Deposit',
    page: 'A4',
    logo: {
      width: 140,
      height: 80,
      position: 'left',
      hide: false
    },
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    header: false,
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By'
      },
      reviewed_by: {
        status: true,
        text: 'Prepare By'
      },
      verified_by: {
        status: true,
        text: 'Prepare By'
      },
      approved_by: {
        status: false,
        text: 'Approved By'
      },
      recorded_by: {
        status: false,
        text: 'Recorded By'
      }
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'left'
    }
  }
}
const credtNote = () => {
  return {
    title: {
      en: {
        name: 'Credit Note',
        status: true
      },
      kh: {
        name: 'បង្វិលការលក់',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 130,
      position: 'left',
      hide: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const cashReceipt = () => {
  return {
    title: {
      en: {
        name: 'Cash Receipt',
        status: true
      },
      kh: {
        name: 'បង្កាន់ដៃបង់ប្រាក់',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'អ្នករៀបចំបង្កាន់ដែ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Banhji',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const generalInvoice = () => {
  return {
    title: {
      en: {
        name: 'Invoice',
        status: true
      },
      kh: {
        name: 'វិក្កយបត្រ',
        status: true
      }
    },
    page: 'A4',
    logo: {
      width: 200,
      height: 120,
      position: 'left',
      hide: true
    },
    form_number: 1,
    table_header: 1,
    customer_address_option: 1,
    customer_address_line: 0,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    note: 'Note: Original invoice for customer, copied invoice for seller',
    note_kh: 'ចំណាំ៖ វិក្កយបត្រដើមសម្រាប់អតិថិជន វិក្កយបត្រដែលបានចម្លងសម្រាប់អ្នកលក់',
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    },
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    header: true,
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true,
      customer: {
        status: true,
        text: "Customer's Signature & Name",
        text_kh: 'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ'
      },
      seller: {
        status: true,
        text: "Seller's Signature & Name",
        text_kh: 'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់'
      }
    },
    column: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
      seven: true,
      eight: false,
      nine: true,
      ten: true,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    subtotal: true,
    discount: true,
    total: true,
    deposit: true
  }
}
const commercailInvoice = () => {
  return {
    title: {
      en: {
        name: 'Invoice',
        status: true
      },
      kh: {
        name: 'វិ​ក័​យ​ប័ត្រ​',
        status: true
      }
    },
    logo: {
      width: 148,
      height: 89,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    paymentOption: true,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 55,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#000000',
      color2: '#ffffff'
    },
    customer_address_option: 1,
    customer_address_line: 0,
    rate: true,
    show_employee: false,
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true,
      customer: {
        status: true,
        text: "Customer's Signature & Name",
        text_kh: 'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ'
      },
      seller: {
        status: true,
        text: "Seller's Signature & Name",
        text_kh: 'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់'
      }
    },
    column: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
      seven: true,
      eight: false,
      nine: true,
      ten: true,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'left'
    }
  }
}
const taxInvoice = () => {
  return {
    title: 'Invoice Tax Default ',
    logo: {
      width: 200,
      height: 200,
      position: 'center',
      hide: true
    },
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    header: false,
    page: 'A4',
    customer_address_option: 1,
    customer_address_line: 0,
    column: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
      seven: true,
      eight: true,
      nine: true,
      ten: true,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: false,
        text: 'Prepare By'
      },
      reviewed_by: {
        status: false,
        text: 'Prepare By'
      },
      verified_by: {
        status: false,
        text: 'Prepare By'
      },
      approved_by: {
        status: false,
        text: 'Approved By'
      },
      recorded_by: {
        status: false,
        text: 'Recorded By'
      }
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    },
    margin: 75
  }
}
const taxInvoice2 = () => {
  return {
    title: 'Invoice Tax Default ',
    logo: {
      width: 200,
      height: 200,
      position: 'center',
      hide: true
    },
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    header: false,
    page: 'A4',
    customer_address_option: 1,
    customer_address_line: 0,
    column: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
      seven: true,
      eight: true,
      nine: true,
      ten: true,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: false,
        text: 'Prepare By'
      },
      reviewed_by: {
        status: false,
        text: 'Prepare By'
      },
      verified_by: {
        status: false,
        text: 'Prepare By'
      },
      approved_by: {
        status: false,
        text: 'Approved By'
      },
      recorded_by: {
        status: false,
        text: 'Recorded By'
      }
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    },
    margin: 46
  }
}
const purchaseVoucherDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Purchase Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្រការទិញ',
        status: true
      }
    },
    logo: {
      width: 103,
      height: 100,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const purchaseOrderDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Purchase Order',
        status: true
      },
      kh: {
        name: 'បញ្ជារទិញ',
        status: true
      }
    },
    logo: {
      width: 91,
      height: 87,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 0,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const purchaeDepositDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Purchase Deposit',
        status: true
      },
      kh: {
        name: 'ប្រាក់កក់អ្នកផ្គត់ផ្គង់',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 80,
      position: 'left',
      hide: false
    },
    header: false,
    page: 'A4',
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#000000',
      color2: '#ffffff'
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'left'
    }
  }
}
const purchaseDebitDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Debit Note',
        status: true
      },
      kh: {
        name: 'បង្វិលការទិញ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 130,
      position: 'left',
      hide: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
// exponse
const expenseDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Expense Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្រចំណាយ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: false,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const paymentVoucherDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Payment Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្រចំណាយ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    page: 'A4',
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    column: {
      one: false,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
      seven: true,
      eight: false,
      nine: false,
      ten: false,
      ten1: true,
      ten2: true,
      ten3: false,
      ten4: true,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Verified By',
        text_kh: 'ផ្ទៀងផ្ទាត់​ដោយ'
      },
      approved_by: {
        status: true,
        text: 'Approved By',
        text_kh: 'អនុម័តដោយ'
      },
      posted_by: {
        status: true,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const reimburesmentDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Reimbursement Voucher',
        status: true
      },
      kh: {
        name: 'ចំណាយសង់ត្រលប់',
        status: true
      }
    },
    logo: {
      width: 100,
      height: 102,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const cashAdvanceSetting = () => {
  return {
    title: {
      en: {
        name: 'Advance Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្របុរេប្រទាន',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: false,
      isPrimrar: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    fontSize: 12,
    headerFontSize: 18,
    margin: 75,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      posted_by: {
        status: false,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const advanceRequestSetting = () => {
  return {
    title: {
      en: {
        name: 'Advance Request',
        status: true
      },
      kh: {
        name: 'សំណើរបុរេប្រទាន',
        status: true
      }
    },
    logo: {
      width: 89,
      height: 86,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      posted_by: {
        status: false,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const advanceSettlementSetting = () => {
  return {
    title: {
      en: {
        name: 'Advacne Settlement Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្រទូទាត់បុរេប្រទាន',
        status: true
      }
    },
    logo: {
      width: 100,
      height: 96,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: false,
      five: true,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      posted_by: {
        status: false,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const journalDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Journal Voucher',
        status: true
      },
      kh: {
        name: 'សក្ខីប័ត្រនិទ្មានុប្បវត្តិ',
        status: true
      }
    },
    logo: {
      width: 86,
      height: 80,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: false,
      six: true,
      seven: true,
      eight: true,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 1,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const cashTransactionDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Cash Transaction',
        status: true
      },
      kh: {
        name: 'ប្រតិបត្តិការសាច់ប្រាក់',
        status: true
      }
    },
    logo: {
      width: 111,
      height: 80,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    fontSize: 12,
    headerFontSize: 18,
    margin: 75,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const cashReconcilationDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Cash Reconciliation',
        status: true
      },
      kh: {
        name: 'សាច់ប្រាក់',
        status: true
      }
    },
    logo: {
      width: 118,
      height: 80,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    fontSize: 12,
    headerFontSize: 18,
    margin: 75,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: true,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: true,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const bankReconcilationSetting = () => {
  return {
    title: {
      en: {
        name: 'Bank Reconciliation',
        status: true
      },
      kh: {
        name: 'ការផ្ទៀងផ្ទាត់ សាច់ប្រាក់ក្នុងធនាគារ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 80,
      position: 'left',
      hide: false,
      isPrimary: false
    },
    header: false,
    page: 'A4',
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    color: {
      background: '#3B393E',
      color: '#ffffff',
      background2: '#3B393E',
      color2: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      ten1: false,
      ten2: false,
      ten3: false,
      ten4: false,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: true,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: true,
        text: 'Approverd By',
        text_kh: 'សំរេចដោយ'
      },
      approved_by: {
        status: false,
        text: 'Recorded By',
        text_kh: 'ទូទាត់ដោយ'
      },
      recorded_by: {
        status: false,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const inventoryCountSheetDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Inventory Count Sheet',
        status: true
      },
      kh: {
        name: 'ប័ណ្ណរាប់សន្និធិ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: true,
      isPrimary: false
    },
    header: true,
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    page: 'A4',
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      ten1: true,
      ten2: true,
      ten3: false,
      ten4: true,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: false,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: false,
        text: 'Verified By',
        text_kh: 'ផ្ទៀងផ្ទាត់​ដោយ'
      },
      approved_by: {
        status: true,
        text: 'Approved By',
        text_kh: 'អនុម័តដោយ'
      },
      posted_by: {
        status: false,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: false,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
const inventoryCountNoteDefaultSetting = () => {
  return {
    title: {
      en: {
        name: 'Inventory Adjustment Note',
        status: true
      },
      kh: {
        name: 'ប័ណ្ណកែតម្រូវសន្និធិ',
        status: true
      }
    },
    logo: {
      width: 140,
      height: 140,
      position: 'left',
      hide: true,
      isPrimary: false
    },
    header: true,
    form_number: 1,
    table_header: 1,
    margin: 75,
    fontSize: 12,
    headerFontSize: 18,
    page: 'A4',
    color: {
      background: '#3B393E',
      color: '#ffffff'
    },
    column: {
      one: true,
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: true,
      eight: true,
      nine: true,
      ten: false,
      ten1: true,
      ten2: true,
      ten3: false,
      ten4: true,
      ten5: false,
      ten6: false,
      ten7: false,
      ten8: false
    },
    signature: {
      prepared_by: {
        status: true,
        text: 'Prepare By',
        text_kh: 'រៀបចំដោយ'
      },
      reviewed_by: {
        status: false,
        text: 'Reviewed By',
        text_kh: 'ត្រួតពិនិត្យដោយ'
      },
      verified_by: {
        status: false,
        text: 'Verified By',
        text_kh: 'ផ្ទៀងផ្ទាត់​ដោយ'
      },
      approved_by: {
        status: true,
        text: 'Approved By',
        text_kh: 'អនុម័តដោយ'
      },
      posted_by: {
        status: false,
        text: 'Posted By',
        text_kh: 'ប្រកាសដោយ'
      },
      recorded_by: {
        status: false,
        text: 'Received By',
        text_kh: 'ទទួលដោយ'
      },
      option: 2,
      positon: true
    },
    language: 'English',
    address: {
      title: 'St, 120 Phnom Penh',
      align: 'center'
    }
  }
}
export {
  saleQuote,
  saleOrder,
  saleDeposit,
  credtNote,
  cashReceipt,
  generalInvoice,
  commercailInvoice,
  taxInvoice,
  taxInvoice2,
  purchaseVoucherDefaultSetting,
  purchaseOrderDefaultSetting,
  purchaeDepositDefaultSetting,
  purchaseDebitDefaultSetting,
  expenseDefaultSetting,
  paymentVoucherDefaultSetting,
  reimburesmentDefaultSetting,
  // cash advance
  cashAdvanceSetting,
  advanceRequestSetting,
  advanceSettlementSetting,
  // accounting ,
  journalDefaultSetting,
  cashTransactionDefaultSetting,
  cashReconcilationDefaultSetting,
  bankReconcilationSetting,
  // product
  inventoryCountSheetDefaultSetting,
  inventoryCountNoteDefaultSetting
}
