import React from 'react'
import { UserCircle, Ticket, Users, CreditCard, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookingCard({bookingDetails}) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getFlightTypeLabel = (type) => {
    switch (type?.toLowerCase()) {
      case 'round-trip':
        return 'Round Trip';
      case 'one-way':
        return 'One Way';
      case 'multi-city':
        return 'Multi City';
      default:
        return type;
    }
  };

  const getTotalPassengers = (passengers) => {
    return passengers.adult + passengers.child + passengers.infant;
  };

  const getPassengerSummary = (passengers) => {
    const parts = [];
    if (passengers.adult) parts.push(`${passengers.adult}A`);
    if (passengers.child) parts.push(`${passengers.child}C`);
    if (passengers.infant) parts.push(`${passengers.infant}I`);
    return parts.join(' / ');
  };

  return (
    <div 
      className="p-4 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group border-b border-gray-700 last:border-b-0" 
      onClick={() => navigate(`/details/booking/${bookingDetails.BID}`)}
    >
      <div className="flex items-start justify-between">
        {/* Left Side - Main Info */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <Ticket className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <div className="text-white font-medium text-base">{bookingDetails.BID}</div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
              <span className="flex items-center">PNR: <span className="text-white ml-1">{bookingDetails.PNR}</span></span>
              <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{getTotalPassengers(bookingDetails.passengers)}</span>
              <span className="flex items-center"><CreditCard className="w-3 h-3 mr-1" />{bookingDetails.cchName}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Tags and Additional Info */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bookingDetails.status)}`}>
              {bookingDetails.status}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
              {getFlightTypeLabel(bookingDetails.flightType)}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
              {bookingDetails.provider}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center"><UserCircle className="w-3 h-3 mr-1" />{bookingDetails.agent}</span>
            {bookingDetails.mco && (
              <span className="flex items-center"><DollarSign className="w-3 h-3 mr-1" />MCO: {bookingDetails.mco}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
