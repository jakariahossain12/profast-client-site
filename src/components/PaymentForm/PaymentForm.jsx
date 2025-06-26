import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const handelSubmit =async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
        const card = elements.getElement(CardElement)
        
        if (card == null) {
          return;
        }

         // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
    });
        
        
    if (error) {
        console.log('[error]', error);
        setError(error.message)
    } else {
        setError('')
        console.log('[PaymentMethod]', paymentMethod);
      }
    

    }
    return (
      <div>
        <form
          onSubmit={handelSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Payment Information
          </h2>

          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50"
            type="submit"
            disabled={!stripe}
          >
            Pay
                </button>
                <p>{ error}</p>
        </form>
      </div>
    );
};

export default PaymentForm;