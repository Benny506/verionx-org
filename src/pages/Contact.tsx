import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { SEO_CONFIG } from '../config/seo'
import { FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pillarInterest: 'General Question',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageWrapper seo={SEO_CONFIG.contact} className="pt-32 pb-24">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            We’d Love to Hear From You
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
            Have a question about our apps, want to pick up new skills, or want help building your
            startup idea? Send us a message and our team will get right back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold mb-4">
                <FiMail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-1">
                Direct Email
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                Send us a note anytime. We reply within 24 hours.
              </p>
              <a
                href="mailto:hello@verionx.org"
                className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                hello@verionx.org
              </a>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-4">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-1">
                Community Chat
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                Join our free community to chat with fellow builders and learners.
              </p>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                discord.gg/verionx
              </span>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-4">
                <FiHelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-1">
                Startup Help Desk
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Got a fresh idea or a growing business? We give friendly feedback to help you take the next step.
              </p>
            </div>
          </div>

          {/* Right Column: Friendly Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
                    Thanks for writing to us. One of our friendly team members will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', pillarInterest: 'General Question', message: '' })
                    }}
                    className="px-6 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      What can we help you with?
                    </label>
                    <select
                      value={formData.pillarInterest}
                      onChange={(e) => setFormData({ ...formData, pillarInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all cursor-pointer"
                    >
                      <option value="General Question">General Question</option>
                      <option value="AI & Agentic Engineering (UloX, ZeusX)">
                        AI & Agentic Engineering (UloX, ZeusX)
                      </option>
                      <option value="AgriTech & Healthcare (RadX, OmegaX)">
                        AgriTech & Healthcare (RadX, OmegaX)
                      </option>
                      <option value="Commerce & Financial Ops (BuzX, MarketX, FinX)">
                        Commerce & Financial Ops (BuzX, MarketX, FinX)
                      </option>
                      <option value="Non-Repayable Grants & Funding (GrantX)">
                        Non-Repayable Grants & Funding (GrantX)
                      </option>
                      <option value="Strategy, Math & Education (CalX, LearnX, MatriX, ResearchX)">
                        Strategy, Math & Education (CalX, LearnX, MatriX, ResearchX)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you are working on or ask any question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm shadow-xl shadow-primary-500/25 active:scale-[0.99] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Contact
