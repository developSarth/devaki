import React, { useState } from 'react';
import { Leaf, Heart, Coffee, Moon, Sun, Wind } from 'lucide-react';

interface RemediesViewProps {
  userProfile: any;
}

export default function RemediesView({ userProfile }: RemediesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('cramps');

  const remedyCategories = {
    cramps: {
      icon: Heart,
      title: 'Menstrual Cramps',
      color: 'rose',
      remedies: [
        {
          name: 'Turmeric Golden Milk',
          description: 'Anti-inflammatory properties help reduce cramping',
          ingredients: ['1 cup warm milk', '1 tsp turmeric', '1/2 tsp ginger', 'Honey to taste'],
          instructions: 'Heat milk, add spices, simmer for 5 minutes. Drink warm before bedtime.',
          ayurvedic: 'Balances Vata dosha and reduces inflammation'
        },
        {
          name: 'Fennel Seed Tea',
          description: 'Natural antispasmodic that relieves menstrual pain',
          ingredients: ['1 tbsp fennel seeds', '1 cup hot water', 'Honey (optional)'],
          instructions: 'Steep fennel seeds in hot water for 10 minutes. Strain and drink 2-3 times daily.',
          ayurvedic: 'Calms Vata and Pitta doshas'
        },
        {
          name: 'Warm Oil Massage',
          description: 'Sesame oil massage on lower abdomen for pain relief',
          ingredients: ['Warm sesame oil', 'Few drops of lavender oil'],
          instructions: 'Gently massage warm oil in circular motions on lower abdomen and lower back.',
          ayurvedic: 'Pacifies Vata dosha and improves circulation'
        }
      ]
    },
    mood: {
      icon: Sun,
      title: 'Mood Balance',
      color: 'amber',
      remedies: [
        {
          name: 'Ashwagandha Tea',
          description: 'Adaptogenic herb that balances hormones and mood',
          ingredients: ['1 tsp ashwagandha powder', '1 cup warm milk', 'Cardamom', 'Honey'],
          instructions: 'Mix ashwagandha with warm milk, add cardamom and honey. Drink before bed.',
          ayurvedic: 'Rejuvenative rasayana that balances all doshas'
        },
        {
          name: 'Rose Petal Infusion',
          description: 'Natural mood elevator and hormone balancer',
          ingredients: ['1 tbsp dried rose petals', '1 cup boiling water', 'Rock sugar'],
          instructions: 'Steep rose petals for 10 minutes. Strain, sweeten with rock sugar.',
          ayurvedic: 'Cooling herb that pacifies Pitta and soothes emotions'
        }
      ]
    },
    bloating: {
      icon: Wind,
      title: 'Digestive Comfort',
      color: 'green',
      remedies: [
        {
          name: 'Ginger Ajwain Tea',
          description: 'Powerful digestive aid that reduces bloating',
          ingredients: ['1 inch fresh ginger', '1 tsp ajwain seeds', '1 cup water', 'Lemon juice'],
          instructions: 'Boil ginger and ajwain for 10 minutes. Strain, add lemon juice.',
          ayurvedic: 'Kindles digestive fire (Agni) and reduces Vata'
        },
        {
          name: 'Cumin Coriander Drink',
          description: 'Traditional digestive tonic for bloating relief',
          ingredients: ['1 tsp cumin seeds', '1 tsp coriander seeds', '2 cups water', 'Black salt'],
          instructions: 'Soak seeds overnight, boil and strain. Add black salt, drink warm.',
          ayurvedic: 'Balances digestive fire and eliminates toxins'
        }
      ]
    }
  };

  const menopauseRemedies = {
    hotFlashes: {
      icon: Moon,
      title: 'Hot Flashes Relief',
      color: 'blue',
      remedies: [
        {
          name: 'Shatavari Cooling Drink',
          description: 'Prime herb for female reproductive health and cooling',
          ingredients: ['1 tsp shatavari powder', '1 cup cool milk', 'Rose water', 'Sugar'],
          instructions: 'Mix shatavari with cool milk, add rose water. Drink twice daily.',
          ayurvedic: 'Nourishing rasayana specifically for women, cools Pitta'
        },
        {
          name: 'Coconut Water Mint Cooler',
          description: 'Natural cooling drink with electrolyte balance',
          ingredients: ['1 cup coconut water', 'Fresh mint leaves', '1 tsp lime juice'],
          instructions: 'Blend coconut water with mint, add lime juice. Drink chilled.',
          ayurvedic: 'Reduces excess heat in the body, balances Pitta dosha'
        }
      ]
    }
  };

  const allCategories = userProfile?.showMenopause 
    ? { ...remedyCategories, ...menopauseRemedies }
    : remedyCategories;

  const selectedRemedyData = allCategories[selectedCategory];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Leaf className="h-6 w-6 text-green-500 mr-3" />
          Ayurvedic Remedies
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.entries(allCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === key
                    ? `border-${category.color}-500 bg-${category.color}-50 shadow-lg`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className={`h-6 w-6 text-${category.color}-500 mx-auto mb-2`} />
                <span className="text-sm font-medium text-gray-700">{category.title}</span>
              </button>
            );
          })}
        </div>

        {selectedRemedyData && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <selectedRemedyData.icon className={`h-6 w-6 text-${selectedRemedyData.color}-500 mr-3`} />
              {selectedRemedyData.title} Remedies
            </h3>

            <div className="grid gap-6">
              {selectedRemedyData.remedies.map((remedy, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-rose-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{remedy.name}</h4>
                  <p className="text-gray-600 mb-4">{remedy.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Ingredients:</h5>
                      <ul className="space-y-1">
                        {remedy.ingredients.map((ingredient, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <div className="h-1.5 w-1.5 bg-rose-400 rounded-full mr-2"></div>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Instructions:</h5>
                      <p className="text-sm text-gray-600 mb-3">{remedy.instructions}</p>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <h6 className="font-medium text-amber-800 text-xs mb-1">Ayurvedic Principle:</h6>
                        <p className="text-xs text-amber-700">{remedy.ayurvedic}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Important Note</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          These Ayurvedic remedies are traditional wellness practices. While generally safe, please consult 
          with a healthcare provider or qualified Ayurvedic practitioner before starting any new treatment, 
          especially if you have underlying health conditions or are taking medications.
        </p>
      </div>
    </div>
  );
}