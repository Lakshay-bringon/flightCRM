import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, FileText, DollarSign, AlertTriangle, RotateCcw } from 'lucide-react';
import { currencyFormatter } from "../../utils/formatters";

function RevenueDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state?.searchParams || {};

  // Sample data - replace with actual API call
  const revenueData = {
    totalRevenue: 1250000,
    totalBookings: 145,
    averageBookingValue: 8620,
    refunds: [
      {
        id: 1,
        bookingId: 'BK001',
        amount: 2500,
        date: '2024-03-15',
        reason: 'Customer Cancellation',
        status: 'Processed'
      },
      {
        id: 2,
        bookingId: 'BK002',
        amount: 1800,
        date: '2024-03-14',
        reason: 'Service Issue',
        status: 'Pending'
      }
    ],
    chargebacks: [
      {
        id: 1,
        bookingId: 'BK003',
        amount: 4200,
        date: '2024-03-13',
        reason: 'Dispute',
        status: 'Under Review'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/revenue')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h2 className="text-xl font-semibold text-white">Revenue Details</h2>
            </div>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Total Revenue</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {currencyFormatter.format(revenueData.totalRevenue)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Total Bookings</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {revenueData.totalBookings}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Average Booking Value</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {currencyFormatter.format(revenueData.averageBookingValue)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Total Refunds & Chargebacks</span>
              </div>
              <div className="text-2xl font-semibold text-red-400">
                {currencyFormatter.format(
                  revenueData.refunds.reduce((sum, r) => sum + r.amount, 0) +
                  revenueData.chargebacks.reduce((sum, c) => sum + c.amount, 0)
                )}
              </div>
            </div>
          </div>

          {/* Refunds Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-400" />
              Refunds
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Reason</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {revenueData.refunds.map(refund => (
                    <tr key={refund.id} className="border-b border-gray-700/50">
                      <td className="py-3 text-white">{refund.bookingId}</td>
                      <td className="py-3 text-red-400">{currencyFormatter.format(refund.amount)}</td>
                      <td className="py-3 text-gray-300">{refund.date}</td>
                      <td className="py-3 text-gray-300">{refund.reason}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          refund.status === 'Processed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {refund.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chargebacks Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Chargebacks
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Reason</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {revenueData.chargebacks.map(chargeback => (
                    <tr key={chargeback.id} className="border-b border-gray-700/50">
                      <td className="py-3 text-white">{chargeback.bookingId}</td>
                      <td className="py-3 text-red-400">{currencyFormatter.format(chargeback.amount)}</td>
                      <td className="py-3 text-gray-300">{chargeback.date}</td>
                      <td className="py-3 text-gray-300">{chargeback.reason}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                          {chargeback.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueDetails; 