import React, { useState, useEffect } from 'react';
import { Leaf, Heart, Coffee, Moon, Sun, Wind, Search } from 'lucide-react';
import { remedyService, Remedy } from '../services/remedyService';

interface RemediesViewProps {
  userProfile: any;
}

export default function RemediesView({ userProfile }: RemediesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRemedies();
  }, [selectedCategory, searchQuery]);

  const loadRemedies = () => {
    if (searchQuery) {
      setRemedies(remedyService.search(searchQuery));
    } else if (selectedCategory === 'all') {
      setRemedies(remedyService.getAllRemedies());
    } else {
      setRemedies(remedyService.getByCategory(selectedCategory));
    }
  };

  const categoryIcons: {[key: string]: any} = {
    drinks: Coffee,
    physical: Heart,
    nutrition: Leaf,
    exercise: Wind,
    aromatherapy: Moon,
    supplements: Sun,
    all: Leaf
  };

  const categoryColors: {[key: string]: string} = {
    drinks: 'blue',
    physical: 'rose',
    nutrition: 'green',
    exercise: 'purple',
    aromatherapy: 'indigo',
    supplements: 'amber',
    all: 'gray'
  };

  const categories = ['all', ...remedyService.getCategories()];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Leaf className="h-6 w-6 text-green-500 mr-3" />
            Natural Remedies & Wellness
          </h2>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category] || Leaf;
            const color = categoryColors[category] || 'gray';
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                }}
                className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? `border-${color}-500 bg-${color}-50 shadow-lg`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className={`h-5 w-5 mx-auto mb-1 ${
                  selectedCategory === category ? `text-${color}-600` : 'text-gray-500'
                }`} />
                <span className="text-xs font-medium text-gray-700 capitalize">{category}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6">
          {remedies.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No remedies found. Try a different search or category.</p>
            </div>
          ) : (
            remedies.map((remedy) => (
              <div
                key={remedy.id}
                className="bg-gradient-to-r from-gray-50 to-rose-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">{remedy.title}</h4>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-medium capitalize">
                        {remedy.category}
                      </span>
                      {remedy.phase && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
                          {remedy.phase} phase
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{remedy.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Ingredients:</h5>
                    <ul className="space-y-1">
                      {remedy.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <div className="h-1.5 w-1.5 bg-rose-400 rounded-full mr-2 mt-1.5"></div>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Instructions:</h5>
                    <p className="text-sm text-gray-600 mb-3">{remedy.instructions}</p>

                    {remedy.benefits.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <h6 className="font-medium text-green-800 text-xs mb-2">Benefits:</h6>
                        <ul className="space-y-1">
                          {remedy.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-green-700 flex items-start">
                              <div className="h-1 w-1 bg-green-500 rounded-full mr-2 mt-1"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Important Note</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          These natural remedies are traditional wellness practices. While generally safe, please consult
          with a healthcare provider before starting any new treatment, especially if you have underlying
          health conditions, are pregnant, or are taking medications.
        </p>
      </div>
    </div>
  );
}
