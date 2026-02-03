import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Scale } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen overflow-hidden" style={{
      background: 'radial-gradient(circle at top, #1a2332 0%, #0b1220 40%, #020617 100%)'
    }}>
      {/* Slow moving gradient overlay */}
      <div className="slow-gradient absolute inset-0" />
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Logo */}
        <div className="flex items-center mb-8 animate-fade-in">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-lg">
            <Scale className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">LegalAI</h1>
        </div>

        {/* Hero Card */}
        <div className="max-w-4xl animate-fade-in-delay">
          <h2 className="page-title text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered Legal Case
            <span className="text-amber-400 block">Intelligence</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
            Analyze cases, predict outcomes, and manage your legal workflow with intelligent AI assistance.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/login')}
            className="cta-btn px-12 py-4 text-lg font-semibold text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-transparent border-amber-600/30"
          >
            Start the Legal Journey
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-slate-400 text-sm animate-fade-in-delay-2">
          © LegalAI — Intelligent Legal Assistance
        </div>
      </div>
    </div>
  )
}

export default Landing