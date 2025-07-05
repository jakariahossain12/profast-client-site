import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpiner from '../LoadingSpine/LoadingSpiner';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
    const [error, setError] = useState('');
    const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure()
  const [prosecting, setProdecting] = useState(false);

    const { isLoading,data:parcelInfo={} } = useQuery({
      queryKey: ["parcel", parcelId],
      queryFn: async () => {
        const res = await axiosSecure.get(`parcels/${parcelId}`);
        return res.data;
      },
    });

    if (isLoading) {
        return <LoadingSpiner></LoadingSpiner>
    }

    const amount = parcelInfo.cost;
    console.log(parcelInfo);


    
  const handelSubmit = async (event) => {
  
    event.preventDefault();
    setProdecting(true)

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
    

    // payment intent

    const res = await axiosSecure.post(`/create-payment-intent/${parcelId}`, {
      amount
    });
    console.log(res);
    const clientSecret = res?.data?.clientSecret;

    // confirm payment 
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,

        }
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError('')
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!");
        console.log(result);
        // Save to MongoDB: e.g., axios.post('/save-order', {paymentIntent: result.paymentIntent})

        const paymentData = {
          parcelId,
          email: user?.email,
          amount,
          paymentMethod: result?.paymentIntent.payment_method_types,
          transactionId: result?.paymentIntent.id,
        };

        const paymentRes = await axiosSecure.post("/save-payment", paymentData);
        
        console.log(paymentRes.data);


      }
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
            className="w-full bg-primary  text-black font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50"
            type="submit"
            disabled={!stripe || prosecting}
          >
            Pay ${amount}
                </button>
                <p className='text-red-600'>{ error}</p>
        </form>
      </div>
    );
};

export default PaymentForm;