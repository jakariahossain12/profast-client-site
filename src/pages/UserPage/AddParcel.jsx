// AddParcelForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddParcelForm = () => {
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const getUniqueRegions = () => {
    const regions = serviceCenters.map((center) => center.region);
    return [...new Set(regions)];
  };

  const getDistrictsByRegion = (region) => {
    const cities = serviceCenters
      .filter((center) => center.region === region)
      .map((center) => center.city);
    return [...new Set(cities)];
  };

  const calculateCost = (data) => {
    const { type, weight = 0, senderCenter, receiverCenter } = data;
    const parsedWeight = parseFloat(weight) || 0;
    const sameCity = senderCenter === receiverCenter;

    if (type === "document") return sameCity ? 60 : 80;

    if (parsedWeight <= 3) return sameCity ? 110 : 150;

    const extraWeight = parsedWeight - 3;
    const extraCost = extraWeight * 40;
    return sameCity ? 110 + extraCost : 150 + extraCost + 40;
  };

  const generateTrackingId = () => {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timePart = Date.now().toString(36).toUpperCase().slice(-6);
    return `TRK-${randomPart}-${timePart}`;
  };

  const onSubmit = (data) => {
    if (!data.senderCenter || !data.receiverCenter) {
      return toast.error(
        "Please select both sender and receiver service centers."
      );
    }

    calculateCost(data);
    const isDocument = data.type === "document";
    const weight = parseFloat(data.weight || 0);
    const sameCity = data.senderCenter === data.receiverCenter;

    let baseCost = 0,
      extraDetails = "",
      explanation = "",
      breakdownHTML = "";

    if (isDocument) {
      baseCost = sameCity ? 60 : 80;
      breakdownHTML = `
        <p><strong>Parcel Type:</strong> Document</p>
        <p><strong>Delivery Type:</strong> ${
          sameCity ? "Within City" : "Outside City/District"
        }</p>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
      `;
    } else {
      if (weight <= 3) {
        baseCost = sameCity ? 110 : 150;
        breakdownHTML = `
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Delivery Type:</strong> ${
            sameCity ? "Within City" : "Outside City/District"
          }</p>
          <p><strong>Base Cost (Up to 3kg):</strong> ৳${baseCost}</p>
        `;
      } else {
        const base = sameCity ? 110 : 150;
        const extraWeight = weight - 3;
        const weightCost = extraWeight * 40;
        baseCost = base + weightCost;

        if (!sameCity) {
          baseCost += 40;
          extraDetails += `<li>৳40 (Outside district logistics handling)</li>`;
        }

        extraDetails += `<li>৳40/kg × ${extraWeight}kg = ৳${weightCost}</li>`;

        explanation = `
          <p><strong>Why extra charges?</strong></p>
          <ul>${extraDetails}</ul>
        `;

        breakdownHTML = `
          <p><strong>Parcel Type:</strong> Non-Document</p>
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Delivery Type:</strong> ${
            sameCity ? "Within City" : "Outside City/District"
          }</p>
          <p><strong>Base Cost (Up to 3kg):</strong> ৳${base}</p>
          ${explanation}
        `;
      }
    }

    Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
        <div style="text-align:left; font-size:14px;">
          ${breakdownHTML}
          <hr />
          <p style="font-size:16px;"><strong>Total Cost:</strong> <span style="color:#10b981;">৳${baseCost}</span></p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✏️ Go Back & Edit",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const newParcel = {
          ...data,
          cost: baseCost,
          trackingId: generateTrackingId(),
          paymentStatus: "unpaid",
          deliveryStatus: "pending",
          creation_date: new Date().toISOString(),
        };

        console.log("Saved Parcel:", newParcel);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Parcel info saved.",
        });
        reset();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Parcel</h1>
      <p className="text-lg text-gray-500 mb-6">Enter your parcel details</p>

      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="document"
            {...register("type", { required: true })}
            defaultChecked
            className="accent-green-500"
          />
          <span>Document</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="non-document"
            {...register("type", { required: true })}
            className="accent-green-500"
          />
          <span>Non-Document</span>
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Parcel Name"
            {...register("title", { required: true })}
            className="border w-full p-2 rounded text-sm"
          />
          {parcelType === "non-document" && (
            <input
              type="number"
              placeholder="Parcel Weight (KG)"
              {...register("weight", { required: true, min: 0.1 })}
              className="border w-full p-2 rounded text-sm"
            />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Sender Details</h2>
            <div className="space-y-3">
              <input
                {...register("senderName", { required: true })}
                placeholder="Sender Name"
                className="border w-full p-2 rounded text-sm"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="border w-full p-2 rounded text-sm"
              >
                <option value="">Select your region</option>
                {getUniqueRegions().map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <input
                {...register("senderAddress", { required: true })}
                placeholder="Address"
                className="border w-full p-2 rounded text-sm"
              />
              <input
                {...register("senderContact", { required: true })}
                placeholder="Sender Contact No"
                className="border w-full p-2 rounded text-sm"
              />
              <select
                {...register("senderCenter", { required: true })}
                className="border w-full p-2 rounded text-sm"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <textarea
                {...register("pickupInstruction", { required: true })}
                placeholder="Pickup Instruction"
                className="border w-full p-2 rounded text-sm"
              ></textarea>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Receiver Details</h2>
            <div className="space-y-3">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                className="border w-full p-2 rounded text-sm"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="border w-full p-2 rounded text-sm"
              >
                <option value="">Select your region</option>
                {getUniqueRegions().map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Address"
                className="border w-full p-2 rounded text-sm"
              />
              <input
                {...register("receiverContact", { required: true })}
                placeholder="Receiver Contact No"
                className="border w-full p-2 rounded text-sm"
              />
              <select
                {...register("receiverCenter", { required: true })}
                className="border w-full p-2 rounded text-sm"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <textarea
                {...register("deliveryInstruction", { required: true })}
                placeholder="Delivery Instruction"
                className="border w-full p-2 rounded text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">* Pickup Time 4pm–7pm Approx.</p>

        <button
          type="submit"
          className="bg-green-500 text-white text-sm font-medium px-6 py-2 rounded hover:bg-green-600"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcelForm;
