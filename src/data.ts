import {ref} from "vue";

export const dataAccounts = [
    {
        account: "****3746",
        region: "europe",
        amount: 1642.66,
        transactions: [{
            amount: 56.32,
            hour: "15:23",
            date: "20/1/2023",
            name: "Airbnb",
            icon: "~/assets/airbnb.png"
        }],
        scheduledPayments: [
            {
                amount: 32,
                name: "Github",
                description: "Monthly, next payment on March 1",
                icon: "~/assets/github.png"
            },
            {
                amount: 10,
                name: "eBay",
                description: "Monthly, next payment on March 3",
                icon: "~/assets/ebay.png"
            },
            {

                amount: 5,
                name: "Twitter",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/twitter.png"
            },
        ]
    },
    {
        account: "****5871",
        region: "eeuu",
        amount: 972.11 ,
        transactions: [{
            amount: 12.10,
            hour: "18:10",
            date: "19/2/2023",
            name: "Amazon",
            icon: "~/assets/amazon.jpg"
        }],
        scheduledPayments: [
            {
                amount: 18,
                name: "Zara",
                description: "Monthly, next payment on February 28",
                icon: "~/assets/zara.jpg"
            },
        ]
    },
    {
        account: "****1485",
        region: "europe",
        amount: 52.33,
        transactions: [{
            amount: 5.63,
            hour: "15:23",
            date: "20/1/2023",
            name: "Airbnb",
            icon: "~/assets/airbnb.png"
        }],
        scheduledPayments: [
            {
                amount: 32,
                name: "Github",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/github.png"
            },
            {
                amount: 10,
                name: "Github",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/github.png"
            },
            {
                amount: 10,
                name: "Github",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/github.png"
            },
            {
                amount: 10,
                name: "Github",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/github.png"
            },
            {
                amount: 10,
                name: "Github",
                description: "Monthly, next payment on March 6",
                icon: "~/assets/github.png"
            }
        ]
    },
    {
        account: "****3698",
        region: "eeuu",
        amount: 10.55,
        transactions: [{
            amount: 105.99,
            hour: "18:10",
            date: "19/2/2023",
            name: "Amazon",
            icon: "~/assets/amazon.jpg"
        }],
        scheduledPayments: [
            {
                amount: 18,
                name: "Zara",
                description: "Monthly, next payment on February 28",
                icon: "~/assets/zara.jpg"
            },
        ]
    },
];
export const dataInversions = [
    {
        name: "Reebok",
        icon: "~/assets/reebok.png"
    }, {
        name: "Bitcoin",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
    }, {
        name: "Nike",
        icon: "https://www.brandemia.org/wp-content/uploads/2011/09/logo_nike_principal.jpg"
    }, {
        name: "Polkadot",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png"
    }, {
        name: "Polaroid",
        icon: "https://www.manualpdf.es/thumbs/brands/l/434-polaroid_logo.jpg"
    }, {
        name: "TRON",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
    }, {
        name: "AliExpress",
        icon: "https://the-eshow.com/madrid19/wp-content/uploads/2019/09/logo-aliexpress.jpg"
    }, {
        name: "Ethereum",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    }, {
        name: "Amazon",
        icon: "~/assets/amazon.jpg"
    }, {
        name: "Cardano",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
    }

]