import React from 'react';
import { Heart, Mail, Shield, BookOpen, Users, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-rose-900 to-pink-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Devaki</h3>
            </div>
            <p className="text-rose-100 text-sm leading-relaxed">
              Empowering women with ancient Ayurvedic wisdom and modern technology for holistic menstrual health.
            </p>
            <div className="flex space-x-4">
              <button className="h-8 w-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Mail className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Globe className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Cycle Tracking</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Ayurvedic Remedies</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Health Insights</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Menopause Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                <BookOpen className="h-3 w-3 mr-2" />
                Ayurvedic Guide
              </a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                <Users className="h-3 w-3 mr-2" />
                Community Support
              </a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Expert Consultations</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Privacy */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Contact Us</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                <Shield className="h-3 w-3 mr-2" />
                Privacy Policy
              </a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-rose-100 hover:text-white transition-colors duration-200 text-sm">Data Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-rose-100 text-sm">
              © 2024 Devaki. Made with love for women's wellness.
            </p>
            <p className="text-rose-100 text-xs mt-2 md:mt-0">
              Powered by ancient Ayurvedic wisdom • Modern technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}