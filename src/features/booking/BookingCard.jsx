import React from 'react'
import { UserCircle, ArrowRight, Users, CreditCard, DollarSign } from 'lucide-react';
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
      className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 hover:border-blue-500/50 transition-all duration-200 cursor-pointer" 
      onClick={() => navigate(`/details/booking/${bookingDetails.BID}`)}
    >
      {/* Main Content */}
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{bookingDetails.BID}</span>
            <span className="text-xs text-gray-400">PNR: <span className="text-white">{bookingDetails.PNR}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-purple-400" title={getPassengerSummary(bookingDetails.passengers)}>
                {getTotalPassengers(bookingDetails.passengers)}
              </span>
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span className="text-white">{bookingDetails.cchName}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
              {getFlightTypeLabel(bookingDetails.flightType)}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(bookingDetails.status)}`}>
              {bookingDetails.status}
            </span>
          </div>
          <span className="text-xs text-blue-400">
            {bookingDetails.provider}
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-end mt-2 pt-2 border-t border-gray-600/50 text-[11px]">
        <div className="flex items-center gap-3">
          {bookingDetails.mco && (
            <div className="flex items-center gap-1 text-gray-400">
              <span>MCO : </span>
              <span className="text-white">{bookingDetails.mco}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-400">
            <UserCircle className="w-3.5 h-3.5" />
            <span className="text-white">{bookingDetails.agent}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
