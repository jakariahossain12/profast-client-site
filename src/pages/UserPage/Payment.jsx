import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
const stripePromise = loadStripe(
  "pk_test_51Re6W0KHEkXvw65FCKsnPFet2aLc5998AoE9INx55D3rI2z8RNpqTV2cSLqNdRdRi77LHnGngevV78OZSHerYoRE009exgQfPL"
);
const Payment = () => {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    );
};

export default Payment;