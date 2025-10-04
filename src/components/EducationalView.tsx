import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { educationalService, EducationalQA } from '../services/educationalService';

interface EducationalViewProps {
  userProfile: any;
}

export default function EducationalView({ userProfile }: EducationalViewProps) {
  const [content, setContent] = useState<EducationalQA[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadContent();
  }, [searchQuery, selectedCategory]);

  const loadContent = () => {
    if (searchQuery) {
      setContent(educationalService.search(searchQuery));
    } else if (selectedCategory === 'all') {
      setContent(educationalService.getAllContent());
    } else {
      setContent(educationalService.getByCategory(selectedCategory));
    }
  };

  const categories = ['all', ...educationalService.getCategories()];

  const categoryLabels: {[key: string]: string} = {
    all: 'All Topics',
    basics: 'Basics',
    health: 'Health',
    remedies: 'Remedies',
    education: 'Education',
    nutrition: 'Nutrition',
    fitness: 'Fitness',
    menopause: 'Menopause',
    tracking: 'Tracking'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
            Educational Resources
          </h2>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {content.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No content found. Try a different search or category.</p>
            </div>
          ) : (
            content.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-5 text-left flex items-start justify-between hover:bg-blue-100 transition-colors duration-200"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.question}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-200 text-blue-700 font-medium capitalize">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </button>

                {expandedIndex === index && (
                  <div className="px-5 pb-5 pt-2 bg-white border-t border-blue-100">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">About This Information</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          This educational content is provided for informational purposes only and should not replace
          professional medical advice. Always consult with a healthcare provider for personalized guidance
          on your menstrual health and wellness.
        </p>
      </div>
    </div>
  );
}
