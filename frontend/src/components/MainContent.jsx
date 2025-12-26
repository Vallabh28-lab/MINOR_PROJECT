import React from 'react'

function MainContent() {
  const stats = [
    { title: 'Active Cases', value: '0', change: '0%', color: 'bg-blue-500' },
    { title: 'Total Clients', value: '0', change: '0%', color: 'bg-green-500' },
    { title: 'Appointments Today', value: '0', change: '0', color: 'bg-yellow-500' },
    { title: 'Success Rate', value: '0%', change: '0%', color: 'bg-purple-500' },
  ]

  const recentCases = []
  const upcomingAppointments = []
  const recentDocuments = []

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Navbar */}
      <div className="shadow-lg px-8 py-8" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-white p-3 rounded-xl mr-4 shadow-lg">
              <span className="text-3xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Legal Case Analysis Dashboard</h1>
              <p className="text-gray-300 mt-1">Welcome back! Here's what's happening with your legal practice today.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-8">


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change} from last month</span>
                </div>
              </div>
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                <span className="text-white text-2xl">📊</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg mr-3">
                  <span className="text-black text-xl">📁</span>
                </div>
                <h3 className="text-xl font-bold text-black">Recent Cases</h3>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-md border border-gray-300">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentCases.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent cases found</p>
                  <p className="text-sm text-gray-400">Start by creating your first case</p>
                </div>
              ) : (
                recentCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">{case_.id}</span>
                        <h4 className="font-medium text-gray-900">{case_.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{case_.type}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-3">
                <span className="text-black text-xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-black">Today's Appointments</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments today</p>
                  <p className="text-sm text-gray-400">Schedule your first appointment</p>
                </div>
              ) : (
                upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-900">
                      {appointment.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                      <p className="text-xs text-gray-500">{appointment.duration}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Documents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black">Recent Documents</h3>
              <button className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-3 py-1 rounded border border-gray-300">Upload New</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {recentDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No documents uploaded</p>
                  <p className="text-sm text-gray-400">Upload your first document</p>
                </div>
              ) : (
                recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm">📄</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{doc.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-green-600">➕</span>
                </div>
                <h4 className="font-medium text-gray-900">New Case</h4>
                <p className="text-sm text-gray-600">Create a new case file</p>
              </button>
              
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-blue-600">📅</span>
                </div>
                <h4 className="font-medium text-gray-900">Schedule</h4>
                <p className="text-sm text-gray-600">Book appointment</p>
              </button>
              
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-600">📊</span>
                </div>
                <h4 className="font-medium text-gray-900">Analytics</h4>
                <p className="text-sm text-gray-600">View case insights</p>
              </button>
              
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-orange-600">🔍</span>
                </div>
                <h4 className="font-medium text-gray-900">Search</h4>
                <p className="text-sm text-gray-600">Find cases & docs</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-black">Case Performance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-green-600">✅</span>
              </div>
              <h4 className="font-semibold text-gray-900">Cases Won</h4>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-yellow-600">⏳</span>
              </div>
              <h4 className="font-semibold text-gray-900">Pending</h4>
              <p className="text-2xl font-bold text-yellow-600">0</p>
              <p className="text-sm text-gray-600">In progress</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-blue-600">📈</span>
              </div>
              <h4 className="font-semibold text-gray-900">Success Rate</h4>
              <p className="text-2xl font-bold text-blue-600">0%</p>
              <p className="text-sm text-gray-600">Overall</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications & Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-black">Recent Notifications</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No notifications</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MainContent
