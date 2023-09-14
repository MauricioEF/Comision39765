import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import Wrapper from '../../components/Wrapper';
import styles from './Stripe.module.scss';
import ProductCard from './components/ProductCard';
import PaymentService from '../../services/paymentService';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [clientSecret,setClientSecret] = useState(null);

    const mockCart = [
        { id: 1, name: "papas", price: 1000 },
        { id: 2, name: "queso", price: 500 },
        { id: 3, name: "hamburguesa", price: 1500 },
        { id: 4, name: "soda", price: 1000 },
        { id: 5, name: "golosinas", price: 800 }
    ]

    useEffect(() => {
        const getClientSecret = async () => {
            console.log(currentProduct);
            const service = new PaymentService();
            service.createPaymentIntent({productId:currentProduct,callbackSuccess:callbackSuccessPaymentIntent,callbackError:callbackErrorPaymentIntent})
        }
        currentProduct&&getClientSecret();
    }, [currentProduct])

    const callbackSuccessPaymentIntent = (res) =>{
        setClientSecret(res.data.payload.client_secret)
    }

    const callbackErrorPaymentIntent = err => {
        console.log(err);
    }
    return (<>
        <div className={styles.container}>
            <h1 className={styles.title}>Stripe</h1>
        </div>
        <div className={classnames([styles.container, styles.highlighted])}>
            <Wrapper hidden={currentProduct}>
                <div className={styles.productsContainer}>
                    {mockCart.map(product => <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} />)}
                </div>
            </Wrapper>
            <Wrapper hidden={!clientSecret||!stripePromise}>
                <Elements stripe={stripePromise} options={{clientSecret:clientSecret}}>
                    <PaymentForm/>
                </Elements>
            </Wrapper>
        </div>
    </>)
}

export default Stripe;