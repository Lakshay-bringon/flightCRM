import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { RefreshCcw, PenSquare, Trash, CloudUpload, Activity } from "lucide-react";
import { Button } from "@headlessui/react";

export default function BookingDetails() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const attachmentsInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageRemove = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input so the same file can be selected again
    }
  };

  const handleAttachmentsUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newImages]);

    // reset file input so same file can be reselected
    event.target.value = "";
  };

  const handleAttachmentsRemove = (indexToRemove) => {
    const updatedImages = attachments.filter(
      (_, index) => index !== indexToRemove
    );
    setAttachments(updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Mock data - replace with actual API call
  const bookingData = {
    passengerDetails: [
      {
        type: "Adult",
        firstName: "vivek",
        middleName: "",
        lastName: "pandey",
        gender: "Male",
        dob: "10/02/2024",
        ticketNumber: "",
      },
    ],
    billingDetails: {
      cardType: "VI",
      cchName: "Anurag",
      cardNumber: "••••••••••••••••",
      cvv: "1234",
      expiry: {
        month: "11",
        year: "33",
      },
      billingNumber: "1234567890",
      billingAddress: "1/798",
      billingAddress2: "",
      email: "anuragpandey7081@gmail.com",
      city: "lucknow",
      state: "up",
      country: "india",
      pinCode: "123456",
    },
    chargingDetails: [
      {
        type: "MCO",
        amount: "1.00",
        status: "",
        chargedOn: "",
        chargedBy: "",
      },
    ],
    priceDetails: {
      airlineFare: "100.00",
      mco: "1.00",
      totalAmount: "101.00",
      currency: "USD",
    },
    itineraryDetails: {
      outboundFlights: [
        {
          airline: "United",
          flight: "Tty6",
          from: "Lucknow",
          to: "Nepal",
          departure: "10/02/2024 04:37 PM",
          arrival: "10/02/2024 04:37 PM",
          class: "Basic Eco",
          alLocator: "al01",
        },
      ],
      inboundFlights: [],
    },
    providerDetails: {
      bid: "BID-12",
      provider: "Air Fare/Flight",
      transactionType: "New booking",
      dateCreated: "10-02-2024 07:12 AM",
      authStatus: "Pending",
      bidStatus: "cancelled",
      agent: "vineet01",
    },
  };

  return (
    <div className="space-y-6">
      {/* Provider Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">PROVIDER DETAILS</h2>
          <div className="flex  items-center gap-2">
            <button className="bg-red-500 h-full text-white px-4 py-2 rounded hover:bg-red-600">
              CLOSE BOOKING
            </button>
            <button className="bg-blue-500 h-full text-white px-4 py-2 rounded hover:bg-blue-600">
              AUTH
            </button>
            <button className="bg-green-500 h-full text-white px-4 py-2 rounded hover:bg-green-600">
              <RefreshCcw className="h-full transition-transform duration-1000 rotate-180" />
            </button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">BID</label>
            <div className="text-white">{bookingData.providerDetails.bid}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">PROVIDER</label>
            <div className="text-white">
              {bookingData.providerDetails.provider}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              TRANSACTION TYPE
            </label>
            <div className="text-white">
              {bookingData.providerDetails.transactionType}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              DATE CREATED
            </label>
            <div className="text-white">
              {bookingData.providerDetails.dateCreated}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              AUTH STATUS
            </label>
            <div className="text-white">
              {bookingData.providerDetails.authStatus}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              BID STATUS
            </label>
            <div className="text-white">
              {bookingData.providerDetails.bidStatus}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">AGENT</label>
            <div className="text-white">
              {bookingData.providerDetails.agent}
            </div>
          </div>
        </div>
      </div>

      {/* Price Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">PRICE DETAILS</h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">AIRLINE FARE</th>
                <th className="text-left py-2">MCO</th>
                <th className="text-left py-2">TOTAL AMOUNT</th>
                <th className="text-left py-2">CURRENCY</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white">
                <td className="py-2">{bookingData.priceDetails.airlineFare}</td>
                <td className="py-2">{bookingData.priceDetails.mco}</td>
                <td className="py-2">{bookingData.priceDetails.totalAmount}</td>
                <td className="py-2">{bookingData.priceDetails.currency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charging Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">CHARGING DETAILS</h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">TYPE</th>
                <th className="text-left py-2">TRANSACTION ID</th>
                <th className="text-left py-2">AMOUNT</th>
                <th className="text-left py-2">STATUS</th>
                <th className="text-left py-2">CHARGED ON</th>
                <th className="text-left py-2">CHARGED BY</th>
                <th className="text-left py-2">MERCHANT NAME</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.chargingDetails.map((charge, index) => (
                <tr key={index} className="text-white">
                  <td className="py-2">{charge.type}</td>
                  <td className="py-2">{charge.transactionId || "123"}</td>
                  <td className="py-2">{charge.amount}</td>
                  <td className="py-2">{charge.status || "N/A"}</td>
                  <td className="py-2">{charge.chargedOn || "N/A"}</td>
                  <td className="py-2">{charge.chargedBy || "N/A"}</td>
                  <td className="py-2">{charge.merchantName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">BILLING DETAILS</h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              CARD TYPE
            </label>
            <div className="text-white">
              {bookingData.billingDetails.cardType}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              C.C.H. NAME
            </label>
            <div className="text-white">
              {bookingData.billingDetails.cchName}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              CARD NUMBER
            </label>
            <div className="text-white">
              {bookingData.billingDetails.cardNumber}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">CVV</label>
            <div className="text-white">{bookingData.billingDetails.cvv}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">EXPIRY</label>
            <div className="text-white">
              {bookingData.billingDetails.expiry.month}/
              {bookingData.billingDetails.expiry.year}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              BILLING NUMBER
            </label>
            <div className="text-white">
              {bookingData.billingDetails.billingNumber}
            </div>
          </div>
          <div className="col-span-full">
            <label className="block text-gray-400 text-sm mb-1">
              BILLING ADDRESS
            </label>
            <div className="text-white">
              {bookingData.billingDetails.billingAddress}
            </div>
          </div>
          <div className="col-span-full">
            <label className="block text-gray-400 text-sm mb-1">
              BILLING ADDRESS II
            </label>
            <div className="text-white">
              {bookingData.billingDetails.billingAddress2 || "Not provided"}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">EMAIL</label>
            <div className="text-white">{bookingData.billingDetails.email}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">CITY</label>
            <div className="text-white">{bookingData.billingDetails.city}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">STATE</label>
            <div className="text-white">{bookingData.billingDetails.state}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">COUNTRY</label>
            <div className="text-white">
              {bookingData.billingDetails.country}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">PIN CODE</label>
            <div className="text-white">
              {bookingData.billingDetails.pinCode}
            </div>
          </div>
        </div>
      </div>

      {/* Refund Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">REFUND DETAILS</h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">AMOUNT</th>
                <th className="text-left py-2">REFUNDED ON</th>
                <th className="text-left py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.chargingDetails.map((charge, index) => (
                <tr key={index} className="text-white">
        
                  <td className="py-2">{charge.amount}</td>
                  <td className="py-2">{charge.refundedOn || "N/A"}</td>
                  <td className="py-2">{charge.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     {/* Chargeback Details Section */}
     <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">CHARGEBACK DETAILS</h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">AMOUNT</th>
                <th className="text-left py-2">CHARGED ON</th>
                <th className="text-left py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.chargingDetails.map((charge, index) => (
                <tr key={index} className="text-white">
        
                  <td className="py-2">{charge.amount}</td>
                  <td className="py-2">{charge.refundedOn || "N/A"}</td>
                  <td className="py-2">{charge.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Itinerary Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            ITINERARY DETAILS
          </h2>
        </div>
        <div className="p-4">
          <div
            className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <p className="text-gray-400 flex flex-col items-center justify-center">
              <CloudUpload className="w-10 h-10" />
              Drag and drop an image here, or click to select an image
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {image && (
            <div className="mt-4 relative">
              {/* Delete button */}
              <button
                onClick={handleImageRemove}
                className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700"
                title="Delete Image"
              >
                <Trash className="w-5 h-5" />
              </button>

              <h3 className="text-white">Image Preview:</h3>
              <img
                src={image}
                alt="Itinerary"
                className="mt-2 max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Add attachments Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">ADD IMAGES</h2>
        </div>
        <div className="p-4">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 text-white px-4 py-2 rounded mb-2 hover:bg-gray-600 cursor-pointer group"
              onClick={() => handleImagePreview(index)}
            >
              {/* Image + Filename container */}
              <div className="flex items-center space-x-4 w-full overflow-hidden">
                <img
                  src={URL.createObjectURL(attachment.file)}
                  alt="thumbnail"
                  className="w-12 h-12 object-cover rounded"
                />
                <p className="truncate">{attachment.file.name}</p>
              </div>

              {/* Delete button (prevent click propagation) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAttachmentsRemove(index);
                }}
                className="ml-4"
              >
                <Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}

          <button
            className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              attachmentsInputRef.current.click();
            }}
          >
            {" "}
            + add Image{" "}
          </button>
          <input
            ref={attachmentsInputRef}
            type="file"
            accept="image/*"
            onChange={handleAttachmentsUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Passenger Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            PASSENGER DETAILS
          </h2>
          <button className="p-1 hover:bg-gray-600 rounded text-blue-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">TYPE</th>
                <th className="text-left py-2">FIRST NAME</th>
                <th className="text-left py-2">MIDDLE NAME</th>
                <th className="text-left py-2">LAST NAME</th>
                <th className="text-left py-2">GENDER</th>
                <th className="text-left py-2">DOB</th>
                <th className="text-left py-2">TICKET NUMBER</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.passengerDetails.map((passenger, index) => (
                <tr key={index} className="text-white">
                  <td className="py-2">{passenger.type}</td>
                  <td className="py-2">{passenger.firstName}</td>
                  <td className="py-2">{passenger.middleName}</td>
                  <td className="py-2">{passenger.lastName}</td>
                  <td className="py-2">{passenger.gender}</td>
                  <td className="py-2">{passenger.dob}</td>
                  <td className="py-2">{passenger.ticketNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Email Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            SEND EMAIL
          </h2>
          
        </div>
        <div className="p-4 flex justify-center gap-4">

              <button className="bg-blue-500 flex-1 text-white px-4 py-2 rounded hover:bg-blue-600">Send Confirmation Email</button>
              <button className="bg-blue-500 flex-1 text-white px-4 py-2 rounded hover:bg-blue-600">Send Card Declined Email</button>
        </div>
      </div>
    </div>

    
  );
}
