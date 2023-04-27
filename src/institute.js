import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cookies : [],
        institute : {
            dateFormat : "dd-MM-yyyy",
            baseCurrency : {
                name : "United States dollar",
                symbol : "US$",
                code : "USD"
            },
            reportingCurrency : {
                name : "Cambodian riel",
                symbol : "៛",
                code : "KHR"
            },
            fiscalDate : [{
                end_date : new Date().getFullYear() + '-12-31',
                institute : "",
                uuid : "",
                first_fiscal_year : new Date().getFullYear() + '-01-01',
                start_date : new Date().getFullYear() + '-01-01'
            }],
            timeZone : {
                name : "Phnom Penh",
                value : "Asia/Phnom_Penh"
            },
        },
        user : [],
        company             : [],
        prefixes            : [],
        historyPages        : [],
        //All kind of types
        types               : [],
        //Accounting
        accounts            : [],
        accountTypes        : [],
        accountGroups       : [],
        varianceRules       : [],
        /* Working Capital */
        budgets             : [],
        budgetDS            : null,
        //Banking
        banks               : [],
        bankAccounts        : [],
        bankAccountTypes    : [],
        bankTransactionRules: [],
        bankPartners        : [],
        //Currency
        currencies          : [],
        exchangeRates       : [],
        paymentTerms        : [],
        paymentOptions      : [],
        /* Contact */
        employees           : [],
        suppliers           : [],
        /* Sidbar */
        segments            : [],
        classes             : [],
        locations           : [],
        projects            : [],
        /* Related Items */
        unitOfMeasurements  : [],
        discountItems       : [],
        taxes               : [],        
        templates			: [
            { title: 'Default' },
            { title: 'Custom' },
        ],
        avatarLetter: ''
    },
    mutations: {
        /* Accounting */
        setAccounts(state, value) {
            state.accounts = value;
        },
        setAccountTypes(state, value) {
            state.accountTypes = value;
        },
        setAccountGroups(state, value) {
            state.accountGroups = value;
        },
        setVarianceRules(state, value) {
            state.varianceRules = value;
        },
        /* Working Capital */
        setBudgets(state, value) {
            state.budgets = value;
        },
        setBudgetDS(state, value) {
            state.budgetDS = value;
        },
        /* Banking */
        setBanks(state, value) {
            state.banks = value;
        },
        setBankAccounts(state, value) {
            state.bankAccounts = value;
        },
        setBankAccountTypes(state, value) {
            state.bankAccountTypes = value;
        },
        setBankTransactionRules(state, value) {
            state.bankTransactionRules = value;
        },
        setBankPartners(state, value) {
            state.bankPartners = value;
        },
        /* Currency */
        setCurrencies(state, value) {
            state.currencies = value;
        },
        setExchangeRates(state, value) {
            state.exchangeRates = value;
        },
        setPaymentTerms(state, value) {
            state.paymentTerms = value;
        },
        setPaymentOptions(state, value) {
            state.paymentOptions = value;
        },
        /* Sidebar */
        setLocations(state, value) {
            state.locations = value;
        },
        setProjects(state, value) {
            state.projects = value;
        },
        setSegments(state, value) {
            state.segments = value;
        },
        setClasses(state, value) {
            state.classes = value;
        },
        setPrefixes(state, value) {
            state.prefixes = value;
        },
        /* Contact */
        setEmployees(state, value) {
            state.employees = value;
        },
        setSuppliers(state, value) {
            state.suppliers = value;
        },
        /* Related Items */
        setUnitOfMeasurements(state, value) {
            state.unitOfMeasurements = value;
        },
        setDiscountItems(state, value) {
            state.discountItems = value;
        },
        setTaxes(state, value) {
            state.taxes = value;
        },
        /* Company */
        setAvatarLetter(state, value) {
            state.avatarLetter = value;
        },
        setUser(state, value) {
            state.user = value;
        },
        setCompany(state, value) {
            state.company = value;
        },
        setHistoryPage(state, value) {
            state.historyPages.push(value);
        },
    },
    getters: {
        // getLoanTypes: state => {
        //     return state.loanTypes
        // },
    }
})

export default store
