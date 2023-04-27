import Vue from 'vue'
import VueRouter from 'vue-router'
import {Trans} from '@/plugins/Translation'
import {dataStore} from '@/observable/store'
import {i18n} from '@/i18n'

// import store from '@/store';

function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/views/${component}.vue`)
}

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
    path: '/:locale',
    component: {
        template: "<keep-alive><router-view></router-view></keep-alive>"
        // template: "<router-view></router-view>"
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
        {
            path: '/',
            name: 'dashboard',
            component: load('HomeIndex'),
            children:
            [
                {
                    path: '',
                    name: 'Home',
                    component: load('home/Home'),
                    meta: {
                        mainMenu: 'home',
                        title: i18n.t('home')
                    }
                },
                {
                    path: 'offering',
                    name: 'Offering',
                    component: load('offering/Offering'),
                    meta: {
                        mainMenu: 'offering',
                        title: i18n.t('offering')
                    }
                },
                {
                    path: 'resources',
                    name: 'Resources',
                    component: load('resource/Resources'),
                    meta: {
                        mainMenu: 'resources',
                        title: i18n.t('resource')
                    }
                },
                {
                    path: 'locations',
                    name: 'Locations',
                    component: load('locations/Locations'),
                    meta: {
                        mainMenu: 'locations',
                        title: i18n.t('locations')
                    }
                },
                {
                    path: 'more',
                    name: 'More',
                    component: load('more/More'),
                    meta: {
                        mainMenu: 'more',
                        title: i18n.t('more')
                    }
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: load('pos/products/Products'),
                    meta: {
                        mainMenu: 'products',
                        title: i18n.t('moreportsre')
                    }
                },
                {
                    path: 'product/:id?',
                    name: 'Product',
                    component: load('products/Product'),
                    props: true,
                    meta: {
                        moduleId: 5,
                        code: 5.1,
                        mainMenu: 'products',
                        title: 'Products',
                    }
                },
                {
                    path: 'reports',
                    name: 'Reports',
                    component: load('reports/Reports'),
                    meta: {
                        mainMenu: 'reports',
                        title: i18n.t('moreportsre')
                    }
                },
                {
                    path: 'members',
                    name: 'Members',
                    component: load('members/Members'),
                    meta: {
                        mainMenu: 'members',
                        title: i18n.t('members')
                    }
                },

            ]
        },

        {
            path: 'store_',
            name: 'store',
            component: load('PosIndex'),
            meta: {
                product: true,
            },
            children:[
                {
                    path: 'product/:id?',
                    name: 'Product',
                    component: load('products/Product'),
                    props: true,
                    meta: {
                        moduleId: 5,
                        code: 5.1,
                        mainMenu: 'products',
                        title: 'Products',
                    }
                },
            ]
        },
    ]
},
    {
        path: '*',
        redirect() {
            return Trans.defaultLocale;
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    //  Receivable
    if (to.meta.moduleId == 2 && dataStore.productType == 'npo') {
        document.title = i18n.t("receipts_revenue")
        to.meta.mainMenu = "receipts_revenue"
    } else if (to.meta.moduleId == 2) {
        document.title = i18n.t("receivables_revenue")
        to.meta.mainMenu = "receivables_revenue"
    } else if (to.meta.moduleId == 3 && dataStore.productType == 'npo') {
        document.title = i18n.t("payments_expenditures")
        to.meta.mainMenu = "payments_expenditures"
    } else if (to.meta.moduleId == 3) {
        document.title = i18n.t("suppliers_purchases")
        to.meta.mainMenu = "suppliers_purchases"
    } else if (to.meta.moduleId == 5 && dataStore.productType == 'npo') {
        document.title = i18n.t("employee_payroll")
        to.meta.mainMenu = "employee_payroll"
    }

    if (dataStore.isValidUser == false) {
        document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        return
    } else {
        // // authentication for npo 
        // if (dataStore.productType == 'npo') {
        //     if (to.meta.moduleId === 11 || to.meta.moduleId === 5 || to.meta.moduleId === 6 || to.meta.moduleId === 17  || to.meta.moduleId === 16 || to.meta.moduleId === 15) {
        //         document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //         alert('Unauthorization | គ្មានការអនុញ្ញាត')
        //         window.history.go(-1);
        //         return;
        //     }
        // }
        // if(to.meta.moduleId == 11 && dataStore.productType == 'Public Sectors'){
        //     document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //     alert('Unauthorization | គ្មានការអនុញ្ញាត')
        //     window.history.go(-1);
        //     return;
        // }
        // // for micor edition
        // if (dataStore.productType === 'MicroEdition') {
        //     if (to.meta.moduleId != 15 && to.meta.moduleId != 1) {
        //         if(to.meta.code != 1.10 && to.meta.code != 1.5 && to.meta.code != 2.1 && to.meta.code != 5.1 && to.meta.code != 2.7  && to.meta.code != 1.7  && to.meta.code != 2.5 && to.meta.code != 2.3){
        //             document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //             alert(i18n.t("no_right_acess"))
        //             window.history.go(-1);
        //             return;
        //         }
        //     }
        // }
        // // 
        // if (dataStore.productType === 'Cooperative' || dataStore.productType === 'cooperative') {
        //     if (to.meta.type == 'insurance' || to.meta.type == 'compliance') {
        //         document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //         window.history.go(-1);
        //         return
        //     }
        // } else if (dataStore.productType === 'Standard') {
        //     if (to.meta.mainMenu === 'employee_payroll' || to.meta.mainMenu === 'warehouses' || to.meta.type === 'project' || to.meta.mainMenu === 'compliance' || to.meta.mainMenu === 'budgeting_meta') {
        //         document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //         window.history.go(-1);
        //         return;
        //     }
        // } else if (dataStore.productType === 'Premium') {
        //     if (to.meta.mainMenu === 'warehouses') {
        //         document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //         window.history.go(-1);
        //         return
        //     }
        // }
        // if (dataStore.roles.length > 0) {
        //     if (dataStore.roles.filter(o => o.moduleId === to.meta.moduleId).length > 0) {
        //         const rol = dataStore.roles.filter(o => o.moduleId === to.meta.moduleId)[0]
        //         if (rol.access === 0) {
        //             document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //             window.history.go(-1);
        //             return
        //         }
        //         if (rol.children) {
        //             if (rol.children.filter(p => p.code === to.meta.code && p.access === 0).length > 0) {
        //                 document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        //                 window.history.go(-1);
        //                 return
        //             }
        //         }
        //         next()
        //     }
        // }

    }
    next()
})
// Router After Hooks
// router.afterEach((to) => {
//     // store.dispatch('historyPage/addPage', to);
// })

export default router
