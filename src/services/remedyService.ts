export interface Remedy {
  id: string;
  title: string;
  description: string;
  category: string;
  phase?: string;
  ingredients: string[];
  instructions: string;
  benefits: string[];
}

const remedies: Remedy[] = [
  {
    id: '1',
    title: 'Turmeric Golden Milk',
    description: 'Anti-inflammatory drink to ease menstrual cramps and reduce inflammation',
    category: 'drinks',
    phase: 'menstrual',
    ingredients: [
      '1 cup warm milk (dairy or plant-based)',
      '1/2 teaspoon turmeric powder',
      '1/4 teaspoon cinnamon',
      '1 pinch black pepper',
      'Honey to taste'
    ],
    instructions: 'Heat milk in a saucepan. Add turmeric, cinnamon, and black pepper. Whisk well and simmer for 2-3 minutes. Add honey and enjoy warm before bedtime.',
    benefits: [
      'Reduces inflammation and pain',
      'Improves sleep quality',
      'Boosts immune system',
      'Natural pain relief'
    ]
  },
  {
    id: '2',
    title: 'Ginger Tea',
    description: 'Warming tea to reduce nausea and menstrual pain',
    category: 'drinks',
    phase: 'menstrual',
    ingredients: [
      '1-inch fresh ginger root, sliced',
      '2 cups water',
      'Lemon juice (optional)',
      'Honey to taste'
    ],
    instructions: 'Boil water with ginger slices for 10 minutes. Strain, add lemon juice and honey. Drink 2-3 times daily during menstruation.',
    benefits: [
      'Reduces nausea',
      'Eases cramps',
      'Improves digestion',
      'Anti-inflammatory properties'
    ]
  },
  {
    id: '3',
    title: 'Heat Therapy',
    description: 'Apply heat to relax muscles and ease cramping',
    category: 'physical',
    phase: 'menstrual',
    ingredients: [
      'Heating pad or hot water bottle',
      'Warm towel'
    ],
    instructions: 'Apply heat to lower abdomen for 15-20 minutes. Can be repeated every few hours as needed. Ensure temperature is comfortable to avoid burns.',
    benefits: [
      'Relaxes uterine muscles',
      'Increases blood flow',
      'Immediate pain relief',
      'Safe and natural'
    ]
  },
  {
    id: '4',
    title: 'Magnesium-Rich Foods',
    description: 'Incorporate magnesium to reduce PMS symptoms',
    category: 'nutrition',
    phase: 'luteal',
    ingredients: [
      'Dark leafy greens (spinach, kale)',
      'Almonds and cashews',
      'Dark chocolate',
      'Avocados',
      'Bananas'
    ],
    instructions: 'Include these foods in your daily diet, especially during the week before your period. Aim for 300-400mg of magnesium daily.',
    benefits: [
      'Reduces bloating',
      'Improves mood',
      'Decreases water retention',
      'Eases muscle tension'
    ]
  },
  {
    id: '5',
    title: 'Gentle Yoga Flow',
    description: 'Restorative yoga poses for menstrual relief',
    category: 'exercise',
    phase: 'menstrual',
    ingredients: [
      'Yoga mat',
      'Comfortable clothing',
      'Cushions or bolsters'
    ],
    instructions: 'Practice Child\'s Pose, Cat-Cow, and Reclining Bound Angle Pose for 5-10 minutes each. Focus on deep breathing and relaxation.',
    benefits: [
      'Reduces cramping',
      'Improves circulation',
      'Relieves back pain',
      'Promotes relaxation'
    ]
  },
  {
    id: '6',
    title: 'Chamomile Tea',
    description: 'Calming herbal tea for stress relief and better sleep',
    category: 'drinks',
    phase: 'all',
    ingredients: [
      '1 chamomile tea bag or 1 tablespoon dried chamomile',
      '1 cup boiling water',
      'Honey (optional)'
    ],
    instructions: 'Steep chamomile in boiling water for 5-7 minutes. Add honey if desired. Drink before bedtime or when feeling anxious.',
    benefits: [
      'Reduces anxiety and stress',
      'Improves sleep quality',
      'Anti-inflammatory',
      'Eases digestive issues'
    ]
  },
  {
    id: '7',
    title: 'Iron-Rich Meal Plan',
    description: 'Boost iron levels during and after menstruation',
    category: 'nutrition',
    phase: 'follicular',
    ingredients: [
      'Lean red meat or fish',
      'Lentils and beans',
      'Spinach and kale',
      'Quinoa',
      'Vitamin C-rich foods (for better absorption)'
    ],
    instructions: 'Plan meals that combine iron-rich foods with vitamin C sources. Include at least one iron-rich food in each meal.',
    benefits: [
      'Prevents anemia',
      'Increases energy levels',
      'Supports hemoglobin production',
      'Combats fatigue'
    ]
  },
  {
    id: '8',
    title: 'Peppermint Oil Massage',
    description: 'Topical application for pain relief',
    category: 'aromatherapy',
    phase: 'menstrual',
    ingredients: [
      '2-3 drops peppermint essential oil',
      '1 tablespoon carrier oil (coconut or jojoba)',
      'Warm towel'
    ],
    instructions: 'Mix peppermint oil with carrier oil. Gently massage onto lower abdomen in circular motions. Cover with warm towel for 10 minutes.',
    benefits: [
      'Natural pain relief',
      'Relaxes muscles',
      'Reduces tension',
      'Aromatherapy benefits'
    ]
  },
  {
    id: '9',
    title: 'Black Cohosh Supplement',
    description: 'Natural supplement for menopause symptoms',
    category: 'supplements',
    phase: 'menopause',
    ingredients: [
      'Black cohosh supplement (40-80mg daily)',
      'Water'
    ],
    instructions: 'Take as directed by healthcare provider. Typically one tablet daily with meals. Consult doctor before starting.',
    benefits: [
      'Reduces hot flashes',
      'Alleviates night sweats',
      'Improves mood',
      'Natural hormone support'
    ]
  },
  {
    id: '10',
    title: 'Evening Primrose Oil',
    description: 'Supplement for PMS and breast tenderness',
    category: 'supplements',
    phase: 'luteal',
    ingredients: [
      'Evening primrose oil capsules (500-1000mg)',
      'Water'
    ],
    instructions: 'Take 1-2 capsules daily during the second half of your cycle. Start after ovulation.',
    benefits: [
      'Reduces breast tenderness',
      'Eases PMS symptoms',
      'Balances hormones',
      'Improves skin health'
    ]
  }
];

export class RemedyService {
  getAllRemedies(): Remedy[] {
    return remedies;
  }

  getByCategory(category: string): Remedy[] {
    return remedies.filter(remedy => remedy.category === category);
  }

  getByPhase(phase: string): Remedy[] {
    return remedies.filter(remedy => remedy.phase === phase || remedy.phase === 'all');
  }

  getById(id: string): Remedy | undefined {
    return remedies.find(remedy => remedy.id === id);
  }

  getCategories(): string[] {
    const categories = new Set(remedies.map(remedy => remedy.category));
    return Array.from(categories);
  }

  getPhases(): string[] {
    return ['menstrual', 'follicular', 'ovulatory', 'luteal', 'menopause', 'all'];
  }

  search(query: string): Remedy[] {
    const lowerQuery = query.toLowerCase();
    return remedies.filter(remedy =>
      remedy.title.toLowerCase().includes(lowerQuery) ||
      remedy.description.toLowerCase().includes(lowerQuery) ||
      remedy.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const remedyService = new RemedyService();
