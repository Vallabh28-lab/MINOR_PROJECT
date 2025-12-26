import React, { useState } from 'react'

function CaseSearch() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const caseTypes = [
    {
      category: 'Criminal Law',
      icon: '⚖️',
      cases: [
        {
          name: 'Murder Cases',
          description: 'Cases involving unlawful killing of another person',
          reasons: ['Personal disputes', 'Property conflicts', 'Domestic violence', 'Gang wars'],
          precautions: ['Avoid confrontational situations', 'Report threats to police', 'Install security systems', 'Maintain peaceful relationships']
        },
        {
          name: 'Theft & Robbery',
          description: 'Cases involving stealing of property or money',
          reasons: ['Economic hardship', 'Drug addiction', 'Unemployment', 'Greed'],
          precautions: ['Secure your property', 'Use CCTV cameras', 'Avoid displaying wealth', 'Be cautious in isolated areas']
        },
        {
          name: 'Fraud Cases',
          description: 'Cases involving deception for financial gain',
          reasons: ['Online scams', 'Investment frauds', 'Identity theft', 'Credit card frauds'],
          precautions: ['Verify before investing', 'Protect personal information', 'Use secure payment methods', 'Be wary of too-good-to-be-true offers']
        },
        {
          name: 'Domestic Violence',
          description: 'Cases involving violence within family or household',
          reasons: ['Alcohol abuse', 'Mental health issues', 'Financial stress', 'Cultural factors'],
          precautions: ['Seek counseling', 'Know your legal rights', 'Have emergency contacts', 'Document incidents']
        }
      ]
    },
    {
      category: 'Civil Law',
      icon: '🏛️',
      cases: [
        {
          name: 'Property Disputes',
          description: 'Conflicts over land, house, or property ownership',
          reasons: ['Unclear documentation', 'Family inheritance disputes', 'Boundary issues', 'Fraudulent sales'],
          precautions: ['Verify property documents', 'Conduct proper due diligence', 'Register property legally', 'Maintain clear records']
        },
        {
          name: 'Contract Disputes',
          description: 'Disagreements over contract terms or breach',
          reasons: ['Unclear contract terms', 'Non-performance', 'Changed circumstances', 'Bad faith'],
          precautions: ['Draft clear contracts', 'Include dispute resolution clauses', 'Document all communications', 'Seek legal review']
        },
        {
          name: 'Divorce Cases',
          description: 'Legal dissolution of marriage',
          reasons: ['Incompatibility', 'Infidelity', 'Domestic violence', 'Financial issues'],
          precautions: ['Marriage counseling', 'Prenuptial agreements', 'Open communication', 'Financial transparency']
        },
        {
          name: 'Debt Recovery',
          description: 'Cases for recovering unpaid debts',
          reasons: ['Business failures', 'Personal financial crisis', 'Willful default', 'Economic downturns'],
          precautions: ['Credit verification', 'Written agreements', 'Regular follow-ups', 'Legal documentation']
        }
      ]
    },
    {
      category: 'Corporate Law',
      icon: '🏢',
      cases: [
        {
          name: 'Company Disputes',
          description: 'Conflicts between shareholders, directors, or companies',
          reasons: ['Breach of fiduciary duty', 'Minority oppression', 'Corporate governance issues', 'Merger conflicts'],
          precautions: ['Clear corporate governance', 'Regular board meetings', 'Transparent reporting', 'Compliance with regulations']
        },
        {
          name: 'Employment Disputes',
          description: 'Conflicts between employers and employees',
          reasons: ['Wrongful termination', 'Wage disputes', 'Discrimination', 'Harassment'],
          precautions: ['Clear employment contracts', 'Regular HR training', 'Document performance issues', 'Follow labor laws']
        },
        {
          name: 'Intellectual Property',
          description: 'Cases involving patents, trademarks, copyrights',
          reasons: ['Patent infringement', 'Trademark violations', 'Copyright theft', 'Trade secret misuse'],
          precautions: ['Register IP rights', 'Monitor for infringement', 'Use proper licensing', 'Maintain confidentiality']
        },
        {
          name: 'Tax Disputes',
          description: 'Conflicts with tax authorities',
          reasons: ['Tax evasion', 'Incorrect filings', 'Disputes over assessments', 'GST issues'],
          precautions: ['Maintain proper records', 'File returns on time', 'Seek professional help', 'Regular compliance audits']
        }
      ]
    },
    {
      category: 'Constitutional Law',
      icon: '📜',
      cases: [
        {
          name: 'Fundamental Rights',
          description: 'Cases involving violation of constitutional rights',
          reasons: ['Government overreach', 'Discrimination', 'Freedom of speech issues', 'Privacy violations'],
          precautions: ['Know your rights', 'Document violations', 'Seek legal counsel', 'Use proper legal channels']
        },
        {
          name: 'Public Interest Litigation',
          description: 'Cases filed for public welfare',
          reasons: ['Environmental issues', 'Corruption', 'Public safety', 'Social justice'],
          precautions: ['Gather evidence', 'Build public support', 'Follow proper procedures', 'Engage with media responsibly']
        },
        {
          name: 'Writ Petitions',
          description: 'Direct petitions to High Court or Supreme Court',
          reasons: ['Administrative failures', 'Illegal detention', 'Procedural violations', 'Rights enforcement'],
          precautions: ['Exhaust other remedies first', 'Prepare strong case', 'Engage experienced counsel', 'Follow court procedures']
        }
      ]
    },
    {
      category: 'Family Law',
      icon: '👨‍👩‍👧‍👦',
      cases: [
        {
          name: 'Child Custody',
          description: 'Disputes over child care and custody',
          reasons: ['Divorce proceedings', 'Parental disputes', 'Child welfare concerns', 'Relocation issues'],
          precautions: ['Prioritize child welfare', 'Maintain good relationship with ex-spouse', 'Document parenting', 'Seek mediation']
        },
        {
          name: 'Adoption Cases',
          description: 'Legal procedures for child adoption',
          reasons: ['Infertility', 'Single parent adoption', 'Step-parent adoption', 'Relative adoption'],
          precautions: ['Follow legal procedures', 'Complete background checks', 'Prepare financially', 'Understand responsibilities']
        },
        {
          name: 'Maintenance Cases',
          description: 'Cases for spousal or child support',
          reasons: ['Divorce settlements', 'Separation agreements', 'Child support needs', 'Elderly parent care'],
          precautions: ['Document income accurately', 'Negotiate fairly', 'Consider future needs', 'Maintain payment records']
        }
      ]
    }
  ]

  const filteredCases = selectedCategory === 'all' 
    ? caseTypes.flatMap(category => category.cases.map(case_ => ({...case_, category: category.category, icon: category.icon})))
    : caseTypes.find(cat => cat.category === selectedCategory)?.cases.map(case_ => ({
        ...case_, 
        category: selectedCategory, 
        icon: caseTypes.find(cat => cat.category === selectedCategory)?.icon
      })) || []

  const searchFilteredCases = filteredCases.filter(case_ =>
    case_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="shadow-sm border-b border-gray-200 px-8 py-6" style={{backgroundColor: '#040406'}}>
        <div className="flex items-center mb-2">
          <span className="text-4xl mr-4">🔍</span>
          <h1 className="text-3xl font-bold text-white">Case Search & Legal Information</h1>
        </div>
        <p className="text-lg text-gray-300">Explore different types of legal cases in India, their causes, and prevention measures</p>
      </div>

      <div className="p-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search case types, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {caseTypes.map(category => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          {/* Category Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {caseTypes.map(category => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.category
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-900">{category.category}</div>
                <div className="text-xs text-gray-500">{category.cases.length} types</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchFilteredCases.map((case_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{case_.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{case_.name}</h3>
                      <p className="text-sm text-gray-600">{case_.category}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{case_.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Common Reasons:</h4>
                    <div className="flex flex-wrap gap-2">
                      {case_.reasons.map((reason, idx) => (
                        <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prevention Measures:</h4>
                    <div className="flex flex-wrap gap-2">
                      {case_.precautions.map((precaution, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {precaution}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {searchFilteredCases.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <span className="text-yellow-600 text-xl mr-3">⚠️</span>
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Legal Disclaimer</h4>
              <p className="text-sm text-yellow-700">
                This information is for educational purposes only and should not be considered as legal advice. 
                Always consult with a qualified legal professional for specific legal matters. Laws may vary by 
                jurisdiction and are subject to change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseSearch