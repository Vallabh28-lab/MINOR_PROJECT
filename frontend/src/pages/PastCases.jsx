import React, { useState } from 'react'

function PastCases() {
  const [searchQuery, setSearchQuery] = useState('')
  const [uploadedDoc, setUploadedDoc] = useState(null)
  const [filters, setFilters] = useState({
    courtLevel: '',
    year: '',
    caseType: '',
    outcome: ''
  })
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCase, setSelectedCase] = useState(null)

  // Mock case data for demonstration
  const mockCases = [
    {
      id: 1,
      title: "State of Maharashtra vs. Rajesh Kumar",
      court: "Bombay High Court",
      year: "2023",
      caseType: "Criminal",
      outcome: "Convicted",
      similarity: 87,
      summary: "Case involving fraud and misrepresentation in property dealings. Defendant found guilty under IPC Section 420.",
      ipcSections: ["IPC 420", "IPC 468", "IPC 471"],
      verdict: "7 years imprisonment and ₹5 lakh fine",
      reasoning: "Clear evidence of fraudulent intent and forged documents"
    },
    {
      id: 2,
      title: "Priya Sharma vs. ABC Construction Ltd.",
      court: "Delhi District Court",
      year: "2022",
      caseType: "Civil",
      outcome: "Plaintiff Won",
      similarity: 73,
      summary: "Consumer protection case regarding defective construction and delayed possession. Compensation awarded to buyer.",
      ipcSections: ["Consumer Protection Act 2019", "RERA 2016"],
      verdict: "₹15 lakh compensation + interest",
      reasoning: "Builder failed to deliver as per agreement terms"
    },
    {
      id: 3,
      title: "Ramesh Gupta vs. State Bank of India",
      court: "Supreme Court of India",
      year: "2021",
      caseType: "Banking",
      outcome: "Settled",
      similarity: 65,
      summary: "Dispute over unauthorized loan deduction and banking malpractice. Case settled out of court.",
      ipcSections: ["Banking Regulation Act 1949", "RBI Guidelines"],
      verdict: "Out of court settlement - ₹8 lakh",
      reasoning: "Bank acknowledged procedural lapses"
    },
    {
      id: 4,
      title: "Suresh Patel vs. HDFC Bank Ltd.",
      court: "Mumbai District Court",
      year: "2023",
      caseType: "Banking",
      outcome: "Plaintiff Won",
      similarity: 82,
      summary: "Banking fraud case involving unauthorized transactions and negligence in security protocols.",
      ipcSections: ["Banking Regulation Act 1949", "IT Act 2000", "IPC 420"],
      verdict: "₹12 lakh compensation + legal costs",
      reasoning: "Bank failed to implement adequate security measures"
    },
    {
      id: 5,
      title: "Meera Singh vs. Punjab National Bank",
      court: "Delhi District Court",
      year: "2022",
      caseType: "Banking",
      outcome: "Defendant Won",
      similarity: 71,
      summary: "Dispute over loan recovery and harassment by bank officials. Court ruled in favor of bank.",
      ipcSections: ["SARFAESI Act 2002", "Banking Regulation Act 1949"],
      verdict: "Bank's recovery action upheld",
      reasoning: "Borrower defaulted on loan payments as per agreement"
    },
    {
      id: 6,
      title: "Rajesh Kumar vs. ICICI Bank",
      court: "Pune District Court",
      year: "2021",
      caseType: "Banking",
      outcome: "Settled",
      similarity: 68,
      summary: "Credit card fraud and unauthorized charges dispute resolved through mediation.",
      ipcSections: ["Payment and Settlement Systems Act 2007", "RBI Guidelines"],
      verdict: "Mutual settlement - ₹3.5 lakh refund",
      reasoning: "Both parties agreed to amicable resolution"
    }
  ]

  const handleSearch = () => {
    setLoading(true)
    // Simulate AI search
    setTimeout(() => {
      let results = [...mockCases] // Create a copy
      
      // Filter by search query
      if (searchQuery.trim()) {
        results = results.filter(case_ => 
          case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          case_.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          case_.ipcSections.some(section => section.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }
      
      // Apply filters
      if (filters.courtLevel && filters.courtLevel !== '') {
        const courtMap = {
          'supreme': 'supreme court',
          'high': 'high court', 
          'district': 'district court'
        }
        const searchTerm = courtMap[filters.courtLevel] || filters.courtLevel
        results = results.filter(case_ => 
          case_.court.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      if (filters.year && filters.year !== '') {
        results = results.filter(case_ => case_.year === filters.year)
      }
      
      if (filters.caseType && filters.caseType !== '') {
        results = results.filter(case_ => case_.caseType === filters.caseType)
      }
      
      if (filters.outcome && filters.outcome !== '') {
        results = results.filter(case_ => case_.outcome === filters.outcome)
      }
      
      setSearchResults(results)
      setLoading(false)
    }, 1500)
  }

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedDoc({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      })
    }
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return 'text-green-600 bg-green-50'
    if (similarity >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="shadow-lg px-8 py-8" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center">
          <div className="p-3 rounded-xl mr-4 shadow-lg" style={{backgroundColor: '#040406'}}>
            <span className="text-black text-3xl">🔍</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Past Occurred Cases in India</h1>
            <p className="text-gray-300 mt-1">AI-powered search for similar court cases and legal precedents</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <span className="text-white text-xl">🔎</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Search Similar Cases</h2>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter keywords or case description
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., property fraud, consumer dispute, banking issue..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Cases'}
              </button>
            </div>
          </div>
          
          {/* Document Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Document for AI Analysis (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleDocumentUpload}
                className="hidden"
                id="doc-upload"
              />
              <label htmlFor="doc-upload" className="cursor-pointer flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl mb-2 block">📄</span>
                  <p className="text-sm text-gray-600">
                    Upload FIR, Agreement, Evidence (PDF, DOC, JPG, PNG)
                  </p>
                </div>
              </label>
            </div>
            
            {uploadedDoc && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-2">📄</span>
                  <div>
                    <p className="font-medium text-blue-900">{uploadedDoc.name}</p>
                    <p className="text-sm text-blue-600">{uploadedDoc.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedDoc(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  ❌
                </button>
              </div>
            )}
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Court Level</label>
              <select
                value={filters.courtLevel}
                onChange={(e) => handleFilterChange('courtLevel', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Courts</option>
                <option value="supreme">Supreme Court</option>
                <option value="high">High Court</option>
                <option value="district">District Court</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Case Type</label>
              <select
                value={filters.caseType}
                onChange={(e) => handleFilterChange('caseType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Banking">Banking</option>
                <option value="Consumer">Consumer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Outcome</label>
              <select
                value={filters.outcome}
                onChange={(e) => handleFilterChange('outcome', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Outcomes</option>
                <option value="Convicted">Convicted</option>
                <option value="Acquitted">Acquitted</option>
                <option value="Plaintiff Won">Plaintiff Won</option>
                <option value="Defendant Won">Defendant Won</option>
                <option value="Settled">Settled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({searchResults.length} cases found)
            </h3>
            
            <div className="grid gap-6">
              {searchResults.map(case_ => (
                <div key={case_.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{case_.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {case_.court}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          {case_.year}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {case_.caseType}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {case_.outcome}
                        </span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-bold ${getSimilarityColor(case_.similarity)}`}>
                      {case_.similarity}% Match
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{case_.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Applicable Sections:</h5>
                      <div className="flex flex-wrap gap-1">
                        {case_.ipcSections.map((section, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Verdict:</h5>
                      <p className="text-sm text-gray-700">{case_.verdict}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <strong>Key Reasoning:</strong> {case_.reasoning}
                    </div>
                    <button
                      onClick={() => setSelectedCase(case_)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300"
                    >
                      View Full Case
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights Panel */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Insights & Legal Precedents</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-3">Key Legal Reasoning</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Evidence quality is crucial for case success</li>
                  <li>• Documentation timeline affects verdict strength</li>
                  <li>• Similar cases show 73% success rate in this category</li>
                  <li>• Court precedent favors detailed evidence submission</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-bold text-green-900 mb-3">Relevant Legal Precedents</h4>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Consumer Protection Act 2019 - Section 35</li>
                  <li>• IPC Section 420 - Fraud and misrepresentation</li>
                  <li>• RERA 2016 - Builder obligations and penalties</li>
                  <li>• Banking Regulation Act - Customer protection</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching cases found</h3>
            <p className="text-gray-600">Try different keywords or adjust your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PastCases