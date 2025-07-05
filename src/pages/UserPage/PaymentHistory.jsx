import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpiner from '../../components/LoadingSpine/LoadingSpiner';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data:payments = [] , isLoading} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-payments?email=${user.email}`);
            return res.data
        }
    })

    if (isLoading) {
        return <LoadingSpiner></LoadingSpiner>
    }
    console.log(payments);
    return (
      <div className="overflow-x-auto rounded-xl shadow-md mt-6">
        <table className="table-auto w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Parcel ID</th>
              <th className="px-4 py-2">Amount (৳)</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{payment.parcelId}</td>
                
                <td className="px-4 py-2">৳{payment.amount}</td>
               
                <td className="px-4 py-2">{payment.transactionId}</td>
                <td className="px-4 py-2">
                  {new Date(payment.paid_at).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PaymentHistory;