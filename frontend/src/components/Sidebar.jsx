import React, { useState } from 'react'
import {
  LayoutDashboard,
  Search,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  User,
  MessageCircle
} from 'lucide-react'
import UserProfile from './UserProfile'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
  { id: 'case-search', label: 'Case Search', icon: Search, color: 'text-green-400' },
  { id: 'document-analysis', label: 'Document Analysis', icon: FileText, color: 'text-purple-400' },
  { id: 'lawyer-directory', label: 'Lawyer Directory', icon: Users, color: 'text-orange-400' },
  { id: 'consultation-options', label: 'Consultation Options', icon: MessageCircle, color: 'text-teal-400' },
  { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'text-pink-400' },
  { id: 'case-prediction', label: 'Case Prediction', icon: TrendingUp, color: 'text-cyan-400' },
  { id: 'past-cases', label: 'Past Case Search', icon: Search, color: 'text-indigo-400' },
]

function Sidebar({ user, onLogout, onNavigate, isOpen, onToggle }) {
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <div className={`${isOpen ? 'w-64' : 'w-16'} text-white flex flex-col h-full transition-all duration-300 shadow-2xl`} style={{backgroundColor: '#040406'}}>
      <div className="p-6 border-b border-gray-700">
        {isOpen ? (
          <div className="flex items-center">
            <div className="p-2 rounded-lg mr-3 shadow-lg" style={{backgroundColor: '#040406'}}>
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">LegalAI</h1>
              <p className="text-xs text-gray-400">Case Management</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="p-2 rounded-lg inline-block shadow-lg" style={{backgroundColor: '#040406'}}>
              <span className="text-xl">⚖️</span>
            </div>
          </div>
        )}
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id)
                    onNavigate && onNavigate(item.id)
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-lg font-semibold border border-gray-600' : 'hover:bg-gray-800 hover:shadow-md'
                  } ${!isOpen ? 'justify-center' : ''}`}
                  style={isActive ? {backgroundColor: '#040406'} : {}}
                >
                  <Icon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} ${item.color}`} />
                  {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <UserProfile user={user} onLogout={onLogout} isOpen={isOpen} />
    </div>
  )
}

export default Sidebar
