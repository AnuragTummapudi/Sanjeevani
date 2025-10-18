'use client'

import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import {
  Search,
  User,
  Bell,
  BarChart3,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Video,
  History,
  ClipboardList,
  Settings
} from 'lucide-react'

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { id: 'consultation', label: 'Consultation', path: '/consultation', icon: Video },
    { id: 'health-history', label: 'Health History', path: '/health-history', icon: History },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <>
            {/* Non-sticky Sanjeevan Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-6 left-8 z-40"
            >
              <motion.button
                onClick={() => router.push('/')}
                className="text-4xl font-creepster text-black hover:text-sanjeevan-purple transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sanjeevan
              </motion.button>
            </motion.div>

      {/* Fixed Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 px-8"
      >
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          
          {/* Center - Navigation Pills */}
          <div className="relative">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl"></div>
          
          {/* Navigation Items */}
          <div className="relative flex items-center space-x-1 px-6 py-3">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Active Background */}
                {pathname === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-sanjeevan-purple rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon */}
                <span className={`relative z-10 transition-colors duration-300 ${
                  pathname === item.path ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  <item.icon className="w-5 h-5" />
                </span>
                
                {/* Label */}
                <span className={`relative z-10 font-inter font-medium text-sm transition-colors duration-300 ${
                  pathname === item.path ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

          {/* Right Side - Search, Notifications, Profile */}
          <div className="absolute right-8 flex items-center space-x-4">
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-lg"></div>
            <div className="relative flex items-center px-4 py-3">
              <Search className="w-5 h-5 text-gray-600 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none font-inter text-sm w-48"
              />
            </div>
          </div>

          {/* Notifications */}
          <motion.button
            className="relative p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </motion.button>

          {/* Profile */}
          <motion.button
            className="relative p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-gray-600" />
          </motion.button>
          
          </div>
        </div>
      </motion.nav>
    </>
  )
}