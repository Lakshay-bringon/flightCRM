import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TRANSACTION_TYPES } from '../constants'
import BookingConfirmation from '../features/booking/BookingConfirmation'

const formSchema = z.object({
  transactionType: z.string().min(1, { message: 'Transaction type is required' }),
  provider: z.string().min(1, { message: 'Provider is required' })
})

function CreatePNR() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data) => {
    setFormData(data)
    setShowConfirmation(true)
  }

  if (showConfirmation) {
    return <BookingConfirmation initialData={formData} onBack={() => setShowConfirmation(false)} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 p-4 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-300 mb-1">
              Transaction Type
            </label>
            <select
              id="transactionType"
              {...register('transactionType')}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            >
              <option value="">Select Transaction Type</option>
              {Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <p className="mt-1 text-xs text-red-400">{errors.transactionType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-300 mb-1">
              Provider
            </label>
            <select
              id="provider"
              {...register('provider')}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            >
              <option value="">Select Provider</option>
              <option value="provider1">Air Fare/ Flight Fare</option>
              <option value="provider2">Skyline</option>
            </select>
            {errors.provider && (
              <p className="mt-1 text-xs text-red-400">{errors.provider.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm"
          >
            Create PNR
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePNR