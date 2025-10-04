import React from 'react';
import { Calendar, Heart, Leaf, TrendingUp, Star, Shield } from 'lucide-react';

interface LandingPageProps {
  onShowAuth: () => void;
}

export default function LandingPage({ onShowAuth }: LandingPageProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Period Tracking',
      description: 'Track your cycle, symptoms, and patterns with intelligent predictions',
      color: 'rose'
    },
    {
      icon: Leaf,
      title: 'Ayurvedic Remedies',
      description: 'Ancient wisdom meets modern wellness with personalized natural remedies',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Health Insights',
      description: 'Understand your body better with detailed analytics and trends',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Menopause Support',
      description: 'Comprehensive tracking and support for women over 40',
      color: 'purple'
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Teacher, Mumbai",
      quote: "Devaki has transformed how I understand my body. The Ayurvedic remedies are incredibly effective!",
      rating: 5
    },
    {
      name: "Dr. Meera Patel",
      role: "Gynecologist, Pune", 
      quote: "I recommend Devaki to my patients. The holistic approach combining tracking with traditional remedies is brilliant.",
      rating: 5
    },
    {
      name: "Sunita Devi",
      role: "Homemaker, Delhi",
      quote: "The menopause tracking feature helped me navigate this transition with confidence and natural remedies.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Devaki
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your personal wellness companion combining ancient Ayurvedic wisdom with modern period tracking technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button 
                onClick={onShowAuth}
                className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                Start Your Journey
              </button>
              <button 
                onClick={onShowAuth}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg hover:shadow-lg border border-gray-200 hover:bg-white transition-all duration-300 min-w-[200px]"
              >
                Already a Member?
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>Ayurveda Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>50,000+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tracking meets traditional healing for a holistic approach to women's health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2"
              >
                <div className={`h-16 w-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Trusted by Women Everywhere
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wellness Journey?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Join thousands of women who have discovered the power of combining modern tracking with ancient wisdom
          </p>
          <button 
            onClick={onShowAuth}
            className="px-12 py-4 bg-white text-rose-600 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Free Today
          </button>
          <p className="text-rose-100 text-sm mt-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}