export default class GeneralSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.sk = data.sk || ''
        this.timeIn = data.timeIn || false
        this.timeOut = data.timeOut || false
        this.orderNumber = data.orderNumber || false
        this.cashierName = data.cashierName || false
        this.modifier = data.modifier || false
        this.employee = data.employee || false
        this.note = data.note || false
        this.guestCount = data.guestCount || false
        this.saleUnitItem = data.saleUnitItem || false
        this.favorite = data.favorite || false
        this.takeAway = data.takeAway || false
        this.booking = data.booking || false
        this.userPin = data.userPin || false
        this.sessionPin = data.sessionPin || false
        this.allowNFCCard = data.allowNFCCard || false
        this.allowSplitItem = data.allowSplitItem || false
        this.kitchenKitCategories = data.kitchenKitCategories || []
        this.allowKitchenKit = data.allowKitchenKit || false
        this.printOrderCate = data.printOrderCate || []
        this.printOrder = data.printOrder || false
        this.cancelReasons = data.cancelReasons || []
        this.allowCancelReason = data.allowCancelReason || false
        this.decimal = data.decimal || 0
        this.appNature = data.appNature || 'Retail'
        this.screenDisplay = data.screenDisplay || 'Surface'
        this.receiptTemplate = data.receiptTemplate || '80mm'
        this.template = data.template || {
            allowLogo: false,
            allowTitle: false,
            allowVat: false,
            allowAddress: false,
            allowPhone: false,
            allowTNum: false,
            allowDate: false,
            allowStore: false,
            allowCounter: false,
            allowCashier: false,
            allowExRate: false,
            allowUom: false,
            allowTax: false,
            allowPaid: false,
            note: '',
            allowPrintTxn: false,
            mobileDevice: false
        }
        this.defaultPriceLevel = data.defaultPriceLevel || ''
        this.allowSelectPriceLevel = data.allowSelectPriceLevel || false
        this.defaultSegment = data.defaultSegment || ''
        this.allowSelectSegment = data.allowSelectSegment || false
        this.type = data.type || 'retail'
        this.orderFlow = data.orderFlow || []
        this.allowOrderFlow = data.allowOrderFlow || false
        this.paymentOption = data.paymentOption || []
        this.userPinData = data.userPinData || []
        this.orderTypes = data.orderTypes || []
        this.usedCategory = data.usedCategory || []
        this.otherFunction = data.otherFunction || []
        this.defaultCustomer = data.defaultCustomer || {}
        this.allowSelectCustomer = data.allowSelectCustomer || false
        this.saleUnitFlow = data.saleUnitFlow || 1
        this.itemFlow = data.itemFlow || 1
        this.productFlow = data.productFlow || 1
        this.bankWallet = data.bankWallet || []
        this.addItemFlow = data.addItemFlow || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
        this.txnNumber = data.txnNumber || {}
        this.orderNum = data.orderNum || {}
        this.shiftBy = data.shiftBy || 1
        this.sessionBy = data.sessionBy || 1
        this.paymentLayout = data.paymentLayout || 1
        this.sessionForm = data.sessionForm || {
            showTxn: 1,
            showCredit: 1,
            bankW: 1,
            cardP: 1,
            loyaltyCrCard: 1,
            campaign: 1,
            internal: 1,
            loyalty: 1,
            countNote: 1,
            partner: 1,
            orderT: 1,
            guestC: 1,
            saleU: 1,
            preOrder: 1,
            clearServe: 1
        }
        this.checkOutFlow = data.checkOutFlow || 1
        this.loyaltyProgram = data.loyaltyProgram || {}
        this.rewardProgram = data.rewardProgram || {}
        this.saleUnitStatus = data.saleUnitStatus || 1
        this.telegramGroup = data.telegramGroup || ''
        this.telCashierGroup = data.telCashierGroup || ''
        this.telCookGroup  = data.telCookGroup || ''
        this.rpin = data.rpin || false 
        this.rguestcount = data.rguestcount || false 
        this.rsaleunit = data.rsaleunit || false 
        this.rordertype = data.rordertype || false
        this.remp = data.remp || false
        this.localServer = data.localServer || ''
        this.allowLabelP = data.allowLabelP || false
        this.labelCate = data.labelCate || []
        this.labelPName = data.labelPName || ''
        this.mirrorDisplay = data.mirrorDisplay || false
        this.khqrMerchantId = data.khqrMerchantId || ''
        this.allowLoyalty = data.allowLoyalty || false
        this.allowTopUp = data.allowTopUp || false
        this.allowGCard = data.allowGCard || false 
        this.allowCatalog = data.allowCatalog || false
        this.editPrice = data.editPrice || false 
        this.editQTY = data.editQTY || false
        this.editDis = data.editDis || false
        this.allowDelItem = data.allowDelItem || false
        this.allowVoid = data.allowVoid || false
        this.allowOthOrder = data.allowOthOrder || false
        this.allowSVoucher = data.allowSVoucher || false
    }

    constuct(data) {
        this.constructor(data);
    }
}