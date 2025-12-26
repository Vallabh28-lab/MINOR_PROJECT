import React from 'react'

function Appointments() {
  const upcomingAppointments = [
    {
      id: 1,
      lawyerName: "Adv. Priya Sharma",
      specialization: "Family Law",
      date: "2024-01-15",
      time: "10:30 AM",
      mode: "Video Call",
      status: "Confirmed",
      countdown: "2 days 3 hours",
      meetingLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      id: 2,
      lawyerName: "Adv. Rajesh Kumar",
      specialization: "Corporate Law",
      date: "2024-01-18",
      time: "2:00 PM",
      mode: "Office Visit",
      status: "Pending",
      countdown: "5 days 7 hours",
      address: "123 Legal Plaza, Pune"
    }
  ]

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="shadow-sm border-b border-gray-200 px-8 py-6" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center mb-2">
          <span className="text-4xl mr-4">📅</span>
          <h1 className="text-3xl font-bold text-white">My Appointments</h1>
        </div>
        <p className="text-lg text-gray-300">Manage all your upcoming consultations and stay organized for your legal meetings.</p>
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        {/* Appointment Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Upcoming Consultations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{appointment.lawyerName}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Specialization: {appointment.specialization}</p>
                      <p className="text-sm text-gray-600 mb-1">Date & Time: {appointment.date} at {appointment.time}</p>
                      <p className="text-sm text-gray-600 mb-1">Meeting Mode: {appointment.mode}</p>
                      <p className="text-sm font-medium text-blue-600">Next consultation in: {appointment.countdown}</p>
                    </div>
                    <div className="text-right">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm mb-2 block">
                        View Details
                      </button>
                      {appointment.meetingLink && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm block mb-2">
                          Join Meeting
                        </button>
                      )}
                      {appointment.address && (
                        <p className="text-xs text-gray-500 mb-2">{appointment.address}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      Message Lawyer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Appointment Management Features</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Document Upload */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📄</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Documents</h4>
                <p className="text-sm text-gray-600">Upload case-related documents before your consultation for better preparation.</p>
              </div>

              {/* Payment Details */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">💳</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
                <p className="text-sm text-gray-600">View consultation fees, payment status, and transaction history for each appointment.</p>
              </div>

              {/* Meeting Access */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">🔗</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Easy Access</h4>
                <p className="text-sm text-gray-600">Quick access to video meeting links or office addresses with one-click navigation.</p>
              </div>

              {/* Status Tracking */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Status Tracking</h4>
                <p className="text-sm text-gray-600">Real-time appointment status updates: confirmed, pending, or rescheduled notifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Appointment View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Detailed Appointment Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Agenda */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Meeting Agenda</h4>
                </div>
                <p className="text-sm text-gray-700">Each appointment page shows a detailed agenda with discussion points and objectives for the consultation.</p>
              </div>

              {/* Required Documents */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-yellow-600 text-xl">📁</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Required Documents</h4>
                </div>
                <p className="text-sm text-gray-700">View and upload all necessary documents as specified by your lawyer for the consultation.</p>
              </div>

              {/* Consultation Notes */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Consultation Notes</h4>
                </div>
                <p className="text-sm text-gray-700">Access post-consultation notes, action items, and follow-up recommendations from your lawyer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Organized & Prepared</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
              This comprehensive appointment management system helps you stay organized and fully prepared for all your legal meetings. 
              With countdown timers, document management, easy rescheduling options, and detailed consultation information, 
              you'll never miss important details or deadlines. Everything you need for successful legal consultations is at your fingertips.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments