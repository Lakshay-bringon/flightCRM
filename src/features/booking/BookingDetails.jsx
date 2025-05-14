import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  RefreshCcw,
  PenSquare,
  Trash,
  CloudUpload,
  Activity,
  PlusIcon,
} from "lucide-react";
import { Button } from "@headlessui/react";
import Section from "./Section"; // Assuming Section.jsx is in the same directory
import BookingDetailsHeader from "./BookingDetailsHeader";

const PROVIDER_OPTIONS = ["Air Fare/Flight", "Skyline"];

const AUTH_STATUS_OPTIONS = ["Pending", "Confirmed", "Rejected"];

const BID_STATUS_OPTIONS = [
  "Pending",
  "Active",
  "Cancelled",
  "Completed",
  "Expired",
];

export default function BookingDetails() {
  const { id } = useParams();
  const [isAnySectionEditing, setIsAnySectionEditing] = useState(false);
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

  // Local state for each section
  const [providerDetails, setProviderDetails] = useState({
    bid: "BID-12",
    provider: "Air Fare/Flight",
    transactionType: "New booking",
    dateCreated: "10-02-2024 07:12 AM",
    authStatus: "Pending",
    bidStatus: "cancelled",
    agent: "vineet01",
  });
  const [passengerDetails, setPassengerDetails] = useState([
    {
      type: "Adult",
      firstName: "vivek",
      middleName: "",
      lastName: "pandey",
      gender: "Male",
      dob: "10/02/2024",
      ticketNumber: "",
    },
  ]);
  const [billingDetails, setBillingDetails] = useState({
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
  });
  const [chargingDetails, setChargingDetails] = useState([
    {
      type: "MCO",
      amount: "1.00",
      status: "",
      chargedOn: "",
      chargedBy: "",
      merchantName: "",
      refundedOn: "",
      transactionId: "123",
    },
  ]);
  const [priceDetails, setPriceDetails] = useState({
    airlineFare: "100.00",
    mco: "1.00",
    totalAmount: "101.00",
    currency: "USD",
  });

  // Save handlers (mock API)
  const saveProviderDetails = async () => {
    await fetch(`/api/bookings/${id}/provider`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(providerDetails),
    });
  };
  const savePassengerDetails = async () => {
    await fetch(`/api/bookings/${id}/passengers`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passengerDetails),
    });
  };
  const saveBillingDetails = async () => {
    await fetch(`/api/bookings/${id}/billing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billingDetails),
    });
  };
  const saveChargingDetails = async () => {
    await fetch(`/api/bookings/${id}/charging`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chargingDetails),
    });
  };
  const savePriceDetails = async () => {
    await fetch(`/api/bookings/${id}/price`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(priceDetails),
    });
  };

  return (
    <>
      <BookingDetailsHeader isEditing={isAnySectionEditing} />
      <div className="space-y-4">
        {/* Provider Details Section */}
        <Section
          title="Provider Details"
          editable={true}
          onSave={saveProviderDetails}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-6">
              <div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    BID
                  </label>
                  <div className="h-10 flex items-center px-3 bg-gray-700/50 rounded-lg">
                    <div className="text-white">{providerDetails.bid}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    PROVIDER
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={providerDetails.provider}
                        onChange={(e) =>
                          setProviderDetails((pd) => ({
                            ...pd,
                            provider: e.target.value,
                          }))
                        }
                      >
                        {PROVIDER_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {providerDetails.provider}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    TRANSACTION TYPE
                  </label>
                  <div className="h-10 flex items-center px-3 bg-gray-700/50 rounded-lg">
                    <div className="text-white">
                      {providerDetails.transactionType}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    DATE CREATED
                  </label>
                  <div className="h-10 flex items-center px-3 bg-gray-700/50 rounded-lg">
                    <div className="text-white">
                      {providerDetails.dateCreated}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    AUTH STATUS
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={providerDetails.authStatus}
                        onChange={(e) =>
                          setProviderDetails((pd) => ({
                            ...pd,
                            authStatus: e.target.value,
                          }))
                        }
                      >
                        {AUTH_STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {providerDetails.authStatus}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    BID STATUS
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={providerDetails.bidStatus}
                        onChange={(e) =>
                          setProviderDetails((pd) => ({
                            ...pd,
                            bidStatus: e.target.value,
                          }))
                        }
                      >
                        {BID_STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {providerDetails.bidStatus}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    AGENT
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={providerDetails.agent}
                        onChange={(e) =>
                          setProviderDetails((pd) => ({
                            ...pd,
                            agent: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {providerDetails.agent}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Itinerary Details Section */}
        <Section title="Itinerary Details" editable={true}
         onSave={() => {}}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}>
          {(isEditing) => (
          <div className="p-4">
            {image ? (
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
            ) : (
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
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>)}
        </Section>

        {/* Price Details Section */}
        <Section
          title="Price Details"
          editable={true}
          onSave={savePriceDetails}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-6">
              <div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    AIRLINE FARE
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={priceDetails.airlineFare}
                        onChange={(e) =>
                          setPriceDetails((pd) => ({
                            ...pd,
                            airlineFare: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {priceDetails.airlineFare}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    MCO
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={priceDetails.mco}
                        onChange={(e) =>
                          setPriceDetails((pd) => ({
                            ...pd,
                            mco: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">{priceDetails.mco}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    TOTAL AMOUNT
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={priceDetails.totalAmount}
                        onChange={(e) =>
                          setPriceDetails((pd) => ({
                            ...pd,
                            totalAmount: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {priceDetails.totalAmount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CURRENCY
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={priceDetails.currency}
                        onChange={(e) =>
                          setPriceDetails((pd) => ({
                            ...pd,
                            currency: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {priceDetails.currency}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Charging Details Section */}
        <Section
          title="Charging Details"
          editable={true}
          onSave={saveChargingDetails}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-6">
              <div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    TYPE
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].type}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], type: e.target.value },
                          ])
                        }
                      >
                        <option value="MCO">MCO</option>
                        <option value="AUTH">AUTH</option>
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].type}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    TRANSACTION ID
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].transactionId}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], transactionId: e.target.value },
                          ])
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].transactionId || "123"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    AMOUNT
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].amount}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], amount: e.target.value },
                          ])
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].amount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    STATUS
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].status || ""}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], status: e.target.value },
                          ])
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processed">Processed</option>
                        <option value="Failed">Failed</option>
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].status || "N/A"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CHARGED ON
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="datetime-local"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].chargedOn || ""}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], chargedOn: e.target.value },
                          ])
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].chargedOn || "N/A"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CHARGED BY
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].chargedBy || ""}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], chargedBy: e.target.value },
                          ])
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].chargedBy || "N/A"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    MERCHANT NAME
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={chargingDetails[0].merchantName || ""}
                        onChange={(e) =>
                          setChargingDetails((cd) => [
                            { ...cd[0], merchantName: e.target.value },
                          ])
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {chargingDetails[0].merchantName || "N/A"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Passenger Details Section */}
        <Section
          title="Passenger Details"
          editable={true}
          onSave={savePassengerDetails}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-8">
              {passengerDetails.map((passenger, index) => (
                <div
                  key={index}
                  className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700 first:border-t-0"
                >
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      TYPE
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <select
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.type}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              type: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                        >
                          <option value="Adult">Adult</option>
                          <option value="Child">Child</option>
                          <option value="Infant">Infant</option>
                        </select>
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">{passenger.type}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      FIRST NAME
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <input
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.firstName}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              firstName: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                        />
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">
                            {passenger.firstName}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      LAST NAME
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <input
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.lastName}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              lastName: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                        />
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">{passenger.lastName}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      GENDER
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <select
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.gender}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              gender: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">{passenger.gender}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      DOB
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <input
                          type="date"
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.dob}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              dob: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                        />
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">{passenger.dob}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      TICKET NUMBER
                    </label>
                    <div className="h-10">
                      {isEditing ? (
                        <input
                          className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={passenger.ticketNumber}
                          onChange={(e) => {
                            const newPassengers = [...passengerDetails];
                            newPassengers[index] = {
                              ...passenger,
                              ticketNumber: e.target.value,
                            };
                            setPassengerDetails(newPassengers);
                          }}
                          placeholder="Enter ticket number"
                        />
                      ) : (
                        <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                          <div className="text-white">
                            {passenger.ticketNumber || "-"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="col-span-full flex justify-between items-center">
                      {passengerDetails.length > 1 && (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          onClick={() => {
                            const newPassengers = [...passengerDetails];
                            newPassengers.splice(index, 1);
                            setPassengerDetails(newPassengers);
                          }}
                        >
                          Remove Passenger
                        </button>
                      )}
                      {index === passengerDetails.length - 1 && (
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          onClick={() =>
                            setPassengerDetails([
                              ...passengerDetails,
                              {
                                type: "Adult",
                                firstName: "",
                                middleName: "",
                                lastName: "",
                                gender: "Male",
                                dob: "",
                                ticketNumber: "",
                              },
                            ])
                          }
                        >
                          Add Passenger
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Billing Details Section */}
        <Section
          title="Billing Details"
          editable={true}
          onSave={saveBillingDetails}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-6">
              <div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CARD TYPE
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <select
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.cardType}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            cardType: e.target.value,
                          }))
                        }
                      >
                        <option value="VI">VISA</option>
                        <option value="MC">MASTERCARD</option>
                        <option value="AX">AMEX</option>
                      </select>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.cardType}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    C.C.H. NAME
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.cchName}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            cchName: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.cchName}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CARD NUMBER
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.cardNumber}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            cardNumber: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.cardNumber}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CVV
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="password"
                        maxLength="4"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.cvv}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            cvv: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">••••</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    EXPIRY
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <div className="flex h-full gap-2">
                        <input
                          type="text"
                          maxLength="2"
                          placeholder="MM"
                          className="w-1/2 h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={billingDetails.expiry.month}
                          onChange={(e) =>
                            setBillingDetails((bd) => ({
                              ...bd,
                              expiry: { ...bd.expiry, month: e.target.value },
                            }))
                          }
                        />
                        <input
                          type="text"
                          maxLength="2"
                          placeholder="YY"
                          className="w-1/2 h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                          value={billingDetails.expiry.year}
                          onChange={(e) =>
                            setBillingDetails((bd) => ({
                              ...bd,
                              expiry: { ...bd.expiry, year: e.target.value },
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.expiry.month}/
                          {billingDetails.expiry.year}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    BILLING NUMBER
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.billingNumber}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            billingNumber: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.billingNumber}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-gray-400 text-sm mb-2">
                    BILLING ADDRESS
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.billingAddress}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            billingAddress: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.billingAddress}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-gray-400 text-sm mb-2">
                    BILLING ADDRESS II
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.billingAddress2}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            billingAddress2: e.target.value,
                          }))
                        }
                        placeholder="Optional"
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.billingAddress2 || "Not provided"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    EMAIL
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.email}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            email: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">{billingDetails.email}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    CITY
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.city}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            city: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">{billingDetails.city}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    STATE
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.state}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            state: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">{billingDetails.state}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    COUNTRY
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.country}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            country: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.country}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    PIN CODE
                  </label>
                  <div className="h-10">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        value={billingDetails.pinCode}
                        onChange={(e) =>
                          setBillingDetails((bd) => ({
                            ...bd,
                            pinCode: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
                        <div className="text-white">
                          {billingDetails.pinCode}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Refund Details Section */}
        <Section
          title="Refund Details"
          editable={true}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            < div  className="p-4 space-y-6">
             
               <table className="w-full table-fixed">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-gray-700">
                    <th className="text-center py-2 font-medium w-1/3 ">AMOUNT</th>
                    <th className="text-center py-2 font-medium w-1/3">REFUNDED ON</th>
                    <th className="text-center py-2 font-medium w-1/3">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingDetails.map((charge, index) => (
                    <tr
                      key={index}
                      className="text-white border-b border-gray-700/50"
                    >
                      <td className="py-3 text-center">{charge.amount}</td>
                      <td className="py-3 text-center">{charge.refundedOn || "N/A"}</td>
                      <td className="py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            charge.status === "Processed"
                              ? "bg-green-500/20 text-green-400"
                              : charge.status === "Failed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {charge.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}
        </Section>

        {/* Chargeback Details Section */}
        <Section
          title="Chargeback Details"
          editable={true}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          {(isEditing) => (
            <div className="p-4 space-y-6">
              <table className="min-w-full">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-gray-700">
                    <th className="text-center py-2 font-medium">AMOUNT</th>
                    <th className="text-center py-2 font-medium">CHARGED ON</th>
                    <th className="text-center py-2 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {chargingDetails.map((charge, index) => (
                    <tr
                      key={index}
                      className="text-white border-b border-gray-700/50"
                    >
                      <td className="py-3 text-center">{charge.amount}</td>
                      <td className="py-3 text-center">{charge.refundedOn || "N/A"}</td>
                      <td className="py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            charge.status === "Processed"
                              ? "bg-green-500/20 text-green-400"
                              : charge.status === "Failed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {charge.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Add attachments Section */}
        <Section
          title="Add Attachments"
          editable={true}
          onEditStart={() => setIsAnySectionEditing(true)}
          onEditCancel={() => setIsAnySectionEditing(false)}
          onEditSave={() => setIsAnySectionEditing(false)}
        >
          <div className="p-4 space-y-6">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-600 cursor-pointer group"
                onClick={() => handleImagePreview(index)}
              >
                <div className="flex items-center space-x-4 w-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(attachment.file)}
                    alt="thumbnail"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <p className="truncate">{attachment.file.name}</p>
                </div>

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
              className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                attachmentsInputRef.current.click();
              }}
            >
              + Add Image
            </button>
            <input
              ref={attachmentsInputRef}
              type="file"
              accept="image/*"
              onChange={handleAttachmentsUpload}
              className="hidden"
            />
          </div>
        </Section>
      </div>
    </>
  );
}
