import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, X } from 'lucide-react'

function BookingConfirmation({ initialData, onBack }) {
  const [passengers, setPassengers] = useState([{ id: 1 }])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      pnr: '',
      customerName: '',
      totalCost: '',
      cardNumber: '4444**********0000',
      chargeAmount: '',
      airline: '',
      date: new Date().toISOString().split('T')[0],
      email: '',
      phone: '',
      billingAddress: '',
      paymentMethod: 'VISA',
      charge1Amount: '',
      charge1Merchant: '',
      authorizer: 'MARTIN F HOFFMAN',
      passengers: [{}]
    }
  })

  const addPassenger = () => {
    const newId = passengers.length + 1
    setPassengers([...passengers, { id: newId }])
  }

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index))
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <div className="mb-4 p-4 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">NEW BOOKING CONFIRMATION – PNR</h2>
          <button
            onClick={onBack}
            className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-300 text-sm">
          <div className="space-y-4">
            <p>Dear <input {...register('customerName')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />,</p>
            
            <p>Thank you for contacting us!</p>
            
            <p>You can contact us on this number +1-877-413-0030 for any related request.</p>
            
            <p>As per our conversation and as agreed, we have booked your reservation under Confirmation number <input {...register('pnr')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />. Please see the details below.</p>
            
            <p>Total Cost for all passengers- <input {...register('totalCost')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" /> USD (Including all taxes and fees)</p>
            
            <div className="p-3 border border-gray-700 rounded-lg">
              <p>As per our telephonic conversation I {register('authorizer').value} authorize Skyline Travels LLC to process the above-mentioned charges under their respective merchants for charging my visa card "{register('cardNumber').value}" for the amount of <input {...register('chargeAmount')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" /> USD for booking a new flight reservation towards below-mentioned itinerary with <input {...register('airline')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" /> AIRLINES.</p>
            </div>

            <div className="p-3 border border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Charges Description</h3>
              <p>Charge 1: <input {...register('charge1Amount')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" /> USD (Merchant Name: <input {...register('charge1Merchant')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" /> AIRLINES)</p>
              <p>Charge 2: 181.20 USD (Merchant Name: Skyline Travels LLC, includes service fee)</p>
            </div>

            <div className="p-3 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Passenger Details</h3>
                <button
                  type="button"
                  onClick={addPassenger}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Passenger
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pr-2 pb-2">S. No.</th>
                      <th className="px-2 pb-2">Type</th>
                      <th className="px-2 pb-2">First Name</th>
                      <th className="px-2 pb-2">Middle Name</th>
                      <th className="px-2 pb-2">Last Name</th>
                      <th className="pl-2 pb-2">DOB</th>
                      <th className="pl-2 pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {passengers.map((passenger, index) => (
                      <tr key={passenger.id} className="border-b border-gray-700/50">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">
                          <select
                            {...register(`passengers.${index}.type`)}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
                          >
                            <option value="ADT">Adult</option>
                            <option value="CHD">Child</option>
                            <option value="INF">Infant</option>
                          </select>
                        </td>
                        <td className="py-2">
                          <input
                            {...register(`passengers.${index}.firstName`)}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                            placeholder="First Name"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            {...register(`passengers.${index}.middleName`)}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                            placeholder="Middle Name"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            {...register(`passengers.${index}.lastName`)}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                            placeholder="Last Name"
                          />
                        </td>
                        <td className="py-2">
                          <div className="relative">
                            <input
                              type="date"
                              {...register(`passengers.${index}.dob`)}
                              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </td>
                        <td className="py-2 pl-2">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removePassenger(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 border border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Purchase Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="inline-block w-32">Card Holder:</label>
                  <input {...register('cardholderName')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="inline-block w-32">Email:</label>
                  <input type="email" {...register('email')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="inline-block w-32">Phone:</label>
                  <input {...register('phone')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="inline-block w-32">Address:</label>
                  <input {...register('billingAddress')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="inline-block w-32">Payment:</label>
                  <select {...register('paymentMethod')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm">
                    <option value="VISA">VISA</option>
                    <option value="MASTER">MASTER</option>
                    <option value="DISCOVER">DISCOVER</option>
                    <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
                  </select>
                </div>
                <div>
                  <label className="inline-block w-32">Purchase Date:</label>
                  <input type="date" {...register('date')} className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" readOnly />
                </div>
              </div>
            </div>

            {/* Policies and Information Sections */}
            <div className="space-y-3 text-xs">
              <div className="p-3 border border-gray-700 rounded-lg">
                <h4 className="font-semibold mb-1">Refund Policy</h4>
                <p>The booked air tickets are non-refundable, non-transferable, and non-cancellable in most cases. The airline may allow a ticket to be changed for a fee, plus the increased cost of the new ticket. All transaction service fees are 100% non-refundable.</p>
              </div>

              <div className="p-3 border border-gray-700 rounded-lg">
                <h4 className="font-semibold mb-1">Important Information</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Your e-tickets will be sent within 24 hours</li>
                  <li>Fares are not guaranteed until paid and ticketed</li>
                  <li>Changes after ticketing will incur penalties</li>
                  <li>Present 3 hours before international flights</li>
                  <li>Present 2 hours before domestic flights</li>
                </ul>
              </div>

              <div className="p-3 border border-gray-700 rounded-lg">
                <h4 className="font-semibold mb-1">Contact Information</h4>
                <p>For assistance: +1-877-413-0030 (24/7)</p>
                <p>Email: booking@skylinetravelsllc.com</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingConfirmation