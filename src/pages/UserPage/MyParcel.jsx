import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {

  useQuery,
} from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:parcels , refetch} = useQuery({
        queryKey: ["my-parcel", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data

        }
    });

    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .delete(`/parcels/${id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your parcel has been deleted.",
                  icon: "success",
                });
                refetch(); // ✅ refresh the table
              } else {
                toast.error("Failed to delete the parcel. It may not exist.");
              }
            })
            .catch((error) => {
              toast.error(error.message || "Delete failed");
            });
        }
      });
    };
      
   
    return (
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="table-auto w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Creation Date</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Delivery</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel) => (
              <tr key={parcel._id} className="border-b">
                <td className="px-4 py-3 capitalize">{parcel.type}</td>
                <td className="px-4 py-3">৳{parcel.cost}</td>
                <td className="px-4 py-3">
                  {new Date(parcel.creation_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      parcel.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 capitalize">
                  {parcel.deliveryStatus}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {parcel.paymentStatus === "unpaid" && (
                    <button className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      Pay
                    </button>
                  )}
                  <button className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                    View
                  </button>

                  <button onClick={()=>handleDelete(parcel._id)} className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default MyParcel;