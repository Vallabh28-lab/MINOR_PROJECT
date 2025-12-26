import React, { useState } from 'react'

function CasePrediction() {
  const [formData, setFormData] = useState({
    // Case Background
    incidentDate: '',
    location: '',
    description: '',
    partiesInvolved: '',
    damages: '',
    
    // Prior Legal Actions
    firFiled: '',
    firCopy: null,
    courtNotice: '',
    lawyerConsulted: '',
    previousCaseHistory: '',
    
    // Desired Outcome
    desiredOutcome: '',
    otherOutcome: ''
  })

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const desiredOutcomes = [
    'Compensation',
    'Settlement',
    'Bail',
    'Punishment',
    'Property recovery',
    'Divorce decree',
    'Child custody',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.split('/')[0],
      progress: 100
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const calculatePrediction = () => {
    setLoading(true)
    
    // AI-based prediction logic (simplified)
    setTimeout(() => {
      let score = 50 // Base score
      
      // Increase score based on evidence
      if (uploadedFiles.length > 0) score += 10
      if (uploadedFiles.length > 3) score += 10
      
      // Increase score if FIR filed
      if (formData.firFiled === 'yes') score += 15
      
      // Increase score if lawyer consulted
      if (formData.lawyerConsulted === 'yes') score += 10
      
      // Decrease score if court notice received (indicates complexity)
      if (formData.courtNotice === 'yes') score -= 5
      
      // Random factor for demonstration
      score += Math.floor(Math.random() * 20) - 10
      
      // Ensure score is between 0-100
      score = Math.max(0, Math.min(100, score))
      
      let label = ''
      let color = ''
      
      if (score >= 70) {
        label = 'Strong case'
        color = 'text-green-600'
      } else if (score >= 50) {
        label = 'Mildly favorable case'
        color = 'text-yellow-600'
      } else {
        label = 'Uncertain/Weak case'
        color = 'text-red-600'
      }
      
      setPrediction({ score, label, color })
      setLoading(false)
    }, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    calculatePrediction()
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="shadow-lg px-8 py-8" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center">
          <div className="p-3 rounded-xl mr-4 shadow-lg" style={{backgroundColor: '#040406'}}>
            <span className="text-black text-3xl">🔮</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Legal Case Prediction</h1>
            <p className="text-gray-300 mt-1">AI-powered case analysis and success probability assessment</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Case Background Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Case Background & Incident Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Incident</label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter incident location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description of What Happened</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Provide detailed description of the incident..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parties Involved</label>
                <textarea
                  name="partiesInvolved"
                  value={formData.partiesInvolved}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List all parties involved..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loss/Damages Experienced</label>
                <textarea
                  name="damages"
                  value={formData.damages}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe financial/physical damages..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Evidence Upload Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">📎</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Evidence Upload System</h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.mp4,.mov,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-gray-600">
                  <span className="text-4xl mb-4 block">📁</span>
                  <p className="text-lg font-semibold">Click to upload evidence</p>
                  <p className="text-sm">Photos (JPG, PNG), Videos (MP4, MOV), Documents (PDF)</p>
                </div>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {file.type === 'image' ? '🖼️' : file.type === 'video' ? '🎥' : '📄'}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-600">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prior Legal Actions Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">⚖️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prior Legal Actions</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">FIR Filed?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="firFiled"
                      value="yes"
                      checked={formData.firFiled === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="firFiled"
                      value="no"
                      checked={formData.firFiled === 'no'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Court Notice Received?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="courtNotice"
                      value="yes"
                      checked={formData.courtNotice === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="courtNotice"
                      value="no"
                      checked={formData.courtNotice === 'no'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Lawyer Consulted Earlier?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lawyerConsulted"
                      value="yes"
                      checked={formData.lawyerConsulted === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lawyerConsulted"
                      value="no"
                      checked={formData.lawyerConsulted === 'no'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Related Case History</label>
                <textarea
                  name="previousCaseHistory"
                  value={formData.previousCaseHistory}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe any previous related cases..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Desired Outcome Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-orange-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Desired Outcome</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {desiredOutcomes.map(outcome => (
                <label key={outcome} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="desiredOutcome"
                    value={outcome}
                    checked={formData.desiredOutcome === outcome}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {outcome}
                </label>
              ))}
            </div>
            
            {formData.desiredOutcome === 'Other' && (
              <div className="mt-4">
                <input
                  type="text"
                  name="otherOutcome"
                  value={formData.otherOutcome}
                  onChange={handleInputChange}
                  placeholder="Specify other desired outcome..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Analyzing Case...' : 'Analyze Case & Get Prediction'}
            </button>
          </div>
        </form>

        {/* AI Prediction Results */}
        {prediction && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI-Based Probability of Success</h2>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <div className="text-6xl font-bold mb-4" style={{color: prediction.color.replace('text-', '')}}>
                  {prediction.score}%
                </div>
                <div className={`text-2xl font-bold ${prediction.color} mb-2`}>
                  {prediction.label}
                </div>
                <p className="text-gray-600">Likelihood of Success</p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Strong Case</div>
                  <div className="text-green-600">70% - 100%</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-yellow-800">Mildly Favorable</div>
                  <div className="text-yellow-600">50% - 69%</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-800">Uncertain/Weak</div>
                  <div className="text-red-600">0% - 49%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CasePrediction