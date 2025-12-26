import React from 'react'

function LawyerDirectory() {
  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="shadow-sm border-b border-gray-200 px-8 py-6" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center mb-2">
          <span className="text-4xl mr-4">👨‍⚖️</span>
          <h1 className="text-3xl font-bold text-white">Lawyer Directory</h1>
        </div>
        <p className="text-lg text-gray-300">Find qualified lawyers in your area with our comprehensive search system.</p>
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        {/* Search Features Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">How to Find Lawyers</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* City-based Search */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🏙️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Search by City</h4>
                <p className="text-sm text-gray-600">Find lawyers in major cities like Pune, Mumbai, Goa, and more across India.</p>
              </div>

              {/* Court-based Search */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">⚖️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Search by Court</h4>
                <p className="text-sm text-gray-600">Locate lawyers practicing in specific courts like Pune District Court, Bombay High Court.</p>
              </div>

              {/* GPS-based Search */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">📍</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Nearby Distance</h4>
                <p className="text-sm text-gray-600">Use GPS-based location to find lawyers within your preferred distance range.</p>
              </div>

              {/* Specialization Search */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">By Specialization</h4>
                <p className="text-sm text-gray-600">Filter lawyers based on their area of expertise and case specializations.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-center font-medium">
                This smart search feature helps you quickly find the most relevant lawyers based on your location, legal needs, and court requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews & Ratings Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Client Reviews & Ratings</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Professional Behavior */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">👔</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Behavior</h4>
                <p className="text-sm text-gray-600">Share your experience about the lawyer's professionalism and conduct during your case.</p>
              </div>

              {/* Response Time */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">⏱️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                <p className="text-sm text-gray-600">Rate how quickly the lawyer responded to your calls, emails, and urgent matters.</p>
              </div>

              {/* Communication Quality */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Communication Quality</h4>
                <p className="text-sm text-gray-600">Evaluate how clearly the lawyer explained legal matters and kept you informed.</p>
              </div>

              {/* Case Outcome */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Case Outcome</h4>
                <p className="text-sm text-gray-600">Optionally share details about your case results and overall satisfaction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Review System Features</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Star Ratings */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-yellow-600 text-xl">⭐</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Star Ratings</h4>
                </div>
                <p className="text-sm text-gray-700">5-star rating system displayed prominently on lawyer profiles with average scores and total review counts.</p>
              </div>

              {/* Verified Reviews */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Verified Reviews</h4>
                </div>
                <p className="text-sm text-gray-700">Only verified clients who have actually worked with the lawyer can submit reviews, ensuring authenticity.</p>
              </div>

              {/* Helpful Vote System */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">👍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Helpful Votes</h4>
                </div>
                <p className="text-sm text-gray-700">Community voting system where users can mark reviews as helpful, promoting the most useful feedback.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-center font-medium">
                These transparent review features build trust and help new clients make informed decisions when choosing the right lawyer for their legal needs.
              </p>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-black">Search Lawyers</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select City</option>
                  <option value="pune">Pune</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="goa">Goa</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Court</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Court</option>
                  <option value="pune-district">Pune District Court</option>
                  <option value="bombay-high">Bombay High Court</option>
                  <option value="supreme-court">Supreme Court</option>
                  <option value="family-court">Family Court</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Any Distance</option>
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                  <option value="25">Within 25 km</option>
                  <option value="50">Within 50 km</option>
                </select>
              </div>
            </div>
            
            <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Search Lawyers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LawyerDirectory