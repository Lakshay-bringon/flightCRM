import React from 'react';
import { useParams } from 'react-router-dom';
import { RefreshCcw, PenSquare} from 'lucide-react';

export default function BookingDetails() {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const bookingData = {
    passengerDetails: [{
      type: "Adult",
      firstName: "vivek",
      middleName: "",
      lastName: "pandey",
      gender: "Male",
      dob: "10/02/2024",
      ticketNumber: ""
    }],
    billingDetails: {
      cardType: "VI",
      cchName: "Anurag",
      cardNumber: "••••••••••••••••",
      cvv: "1234",
      expiry: {
        month: "11",
        year: "33"
      },
      billingNumber: "1234567890",
      billingAddress: "1/798",
      billingAddress2: "",
      email: "anuragpandey7081@gmail.com",
      city: "lucknow",
      state: "up",
      country: "india",
      pinCode: "123456"
    },
    chargingDetails: [{
      type: "MCO",
      amount: "1.00",
      status: "",
      chargedOn: "",
      chargedBy: ""
    }],
    priceDetails: {
      airlineFare: "100.00",
      mco: "1.00",
      totalAmount: "101.00",
      currency: "USD"
    },
    itineraryDetails: {
      outboundFlights: [{
        airline: "United",
        flight: "Tty6",
        from: "Lucknow",
        to: "Nepal",
        departure: "10/02/2024 04:37 PM",
        arrival: "10/02/2024 04:37 PM",
        class: "Basic Eco",
        alLocator: "al01"
      }],
      inboundFlights: []
    },
    providerDetails: {
      bid: "BID-12",
      provider: "Air Fare/Flight",
      transactionType: "New booking",
      dateCreated: "10-02-2024 07:12 AM",
      authStatus: "Pending",
      bidStatus: "cancelled",
      agent: "vineet01"
    }
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
            <div className="text-white">{bookingData.providerDetails.provider}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">TRANSACTION TYPE</label>
            <div className="text-white">{bookingData.providerDetails.transactionType}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">DATE CREATED</label>
            <div className="text-white">{bookingData.providerDetails.dateCreated}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">AUTH STATUS</label>
            <div className="text-white">{bookingData.providerDetails.authStatus}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">BID STATUS</label>
            <div className="text-white">{bookingData.providerDetails.bidStatus}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">AGENT</label>
            <div className="text-white">{bookingData.providerDetails.agent}</div>
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
                  <td className="py-2">{charge.transactionId|| "123"}</td>
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
            <label className="block text-gray-400 text-sm mb-1">CARD TYPE</label>
            <div className="text-white">{bookingData.billingDetails.cardType}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">C.C.H. NAME</label>
            <div className="text-white">{bookingData.billingDetails.cchName}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">CARD NUMBER</label>
            <div className="text-white">{bookingData.billingDetails.cardNumber}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">CVV</label>
            <div className="text-white">{bookingData.billingDetails.cvv}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">EXPIRY</label>
            <div className="text-white">{bookingData.billingDetails.expiry.month}/{bookingData.billingDetails.expiry.year}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">BILLING NUMBER</label>
            <div className="text-white">{bookingData.billingDetails.billingNumber}</div>
          </div>
          <div className="col-span-full">
            <label className="block text-gray-400 text-sm mb-1">BILLING ADDRESS</label>
            <div className="text-white">{bookingData.billingDetails.billingAddress}</div>
          </div>
          <div className="col-span-full">
            <label className="block text-gray-400 text-sm mb-1">BILLING ADDRESS II</label>
            <div className="text-white">{bookingData.billingDetails.billingAddress2 || "Not provided"}</div>
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
            <div className="text-white">{bookingData.billingDetails.country}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">PIN CODE</label>
            <div className="text-white">{bookingData.billingDetails.pinCode}</div>
          </div>
        </div>
      </div>

      {/* Passenger Details Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">PASSENGER DETAILS</h2>
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
    </div>
  );
}
