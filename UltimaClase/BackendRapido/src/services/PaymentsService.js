import Stripe from 'stripe';

export default class PaymentsService {
    constructor() {
        this.stripe = new Stripe("sk_test_51NptMWDxpQ0ZtK1y22br0aegEiatsLLXjH4BSIRJEppLX2HeZdkHBWJoWPFBDEUdFlWmI4KVpap5yUiiGR3gKos700FzVCMckT");
    }


    createPaymentIntent = paymentInfo =>{
        return this.stripe.paymentIntents.create(paymentInfo);
    }

}