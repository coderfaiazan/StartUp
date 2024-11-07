import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">CrowdFund</h3>
            <p className="text-gray-400">Empowering ideas through community support.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-blue-300">Explore Projects</Link></li>
              <li><Link to="/start-project" className="hover:text-blue-300">Start a Project</Link></li>
              <li><Link to="/how-it-works" className="hover:text-blue-300">How It Works</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-blue-300">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-blue-300">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 CrowdFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer