'use strict';
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQnbeaqAwgb1zZEZPQrZ6hEdTEFgOAX-12gCHVpKpcUv9sQPkXfqk2DrbDAoYKvAPRCnbZlNI4HLWFlc',
    'client_secret': 'EDov7T6aVb74509W9xzb855SLZFT275Rbno1oXLf7Mw5Yz_yPEYg3ja0WNJvP8gJYgUCM7skVgkJXjIc'
});
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


var amt = null
var description = null
var productsMessages = null
module.exports = {

    async pay(ctx) {
        amt = ctx.params.amt;
        description = ctx.params.description;
        productsMessages = ctx.params.productsMessages;
        
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `https://pymes-shop-strapi.herokuapp.com/success`,
                "cancel_url": `https://pymes-shop-strapi.herokuapp.com/cancel`
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": productsMessages,
                        "sku": "001",
                        "price": amt,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": amt
                },
                "description": description
            }]
        };
        const responsePaypal = await payPalPromise(create_payment_json)
        ctx.redirect(responsePaypal);
    },

    async create(ctx) {
        const { addressShipping, idUser, products, tokenPaypal } = ctx.request.body
        let totalPayment = 0
        products.forEach((product) => {
            const currentPrice = calculatePrice(product.price, product.discount)
            totalPayment += currentPrice * product.quantity
        })
        const createOrder = []
        for await (const product of products) {
            const currentPrice = calculatePrice(product.price, product.discount)
            const data = {
                product: product.id,
                user: idUser,
                totalPayment,
                productsPayment: currentPrice * product.quantity,
                quantity: product.quantity,
                idPayment: tokenPaypal,
                addressShipping
            }
            const validData = await strapi.entityValidator.validateEntityCreation(
                strapi.models.order,
                data
            )

            const entry = await strapi.query('order').create(validData)
            createOrder.push(entry)
        }
        return createOrder
    },

    async success(ctx) {
        const payerId = ctx.query.PayerID;
        const paymentId = ctx.query.paymentId;
        
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": amt
                }
            }]
        };
        await payPalExecute(paymentId, execute_payment_json)
        
    }
};

const calculatePrice = (price, discount) => {
    if (!discount) return price

    const discountPrice = (price * discount) / 100
    return (price - discountPrice).toFixed(2)
}

const payPalPromise = (create_payment_json) => {
    return new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                reject(error);
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        console.log(payment.links[i].href)
                        resolve(payment.links[i].href)
                    }
                }
            }
        });
    })
}

const payPalExecute = (paymentId, execute_payment_json)=>{
    return new Promise((resolve, reject)=>{
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log("error", error.response);
                reject(error)
            } else {
                resolve(payment)
            }
        });
    })
}