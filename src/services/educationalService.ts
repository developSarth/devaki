export interface EducationalQA {
  question: string;
  answer: string;
  category: string;
}

const educationalData: EducationalQA[] = [
  {
    question: "What is a normal menstrual cycle length?",
    answer: "A normal menstrual cycle typically ranges from 21 to 35 days, with the average cycle lasting around 28 days.",
    category: "basics"
  },
  {
    question: "What are common causes of irregular periods?",
    answer: "Common causes of irregular periods include hormonal imbalances, stress, excessive exercise, weight changes, thyroid disorders, and certain medical conditions.",
    category: "health"
  },
  {
    question: "How can I alleviate menstrual cramps?",
    answer: "Menstrual cramps can be alleviated through various methods including over-the-counter pain relievers, applying heat to the abdomen, gentle exercise, relaxation techniques, and dietary changes.",
    category: "remedies"
  },
  {
    question: "What are the phases of menstrual cycle?",
    answer: "The menstrual cycle consists of four main phases: the follicular phase, ovulation, the luteal phase, and menstruation. During the follicular phase, follicle-stimulating hormone (FSH) stimulates follicles in the ovary to mature. Ovulation occurs when a mature egg is released from the ovary. The luteal phase follows ovulation, during which the ruptured follicle forms the corpus luteum and secretes progesterone. If fertilization does not occur, the uterine lining sheds during menstruation, marking the end of the cycle.",
    category: "education"
  },
  {
    question: "What is the ideal diet for each phase of menstrual cycle?",
    answer: "During the menstrual cycle, dietary needs may vary across phases. In the follicular phase, focus on iron-rich foods like leafy greens and lean meats to replenish iron lost during menstruation. Prioritize complex carbohydrates such as whole grains and legumes to maintain energy levels. Incorporate foods rich in omega-3 fatty acids like salmon and flaxseeds to help alleviate menstrual cramps. During ovulation, emphasize foods high in antioxidants like berries and vegetables to support egg health. In the luteal phase, include calcium-rich foods like dairy and leafy greens to ease premenstrual symptoms.",
    category: "nutrition"
  },
  {
    question: "What is the ideal exercise for each phase of menstrual cycle?",
    answer: "The ideal exercise varies across the phases of the menstrual cycle. During the follicular phase (days 1-14), low to moderate intensity aerobic exercises like walking, cycling, and swimming are beneficial as estrogen levels rise, enhancing energy levels and endurance. In the ovulatory phase (around day 14), high-intensity interval training (HIIT) or strength training can be effective, capitalizing on peak energy and strength levels. In the luteal phase (days 15-28), focusing on yoga, Pilates, and lower-intensity workouts helps manage premenstrual symptoms and stress.",
    category: "fitness"
  },
  {
    question: "What is menopause?",
    answer: "Menopause is a natural biological process that marks the end of menstruation and fertility in women. It occurs when a woman has not had a menstrual period for 12 consecutive months, typically between the ages of 45 and 55.",
    category: "menopause"
  },
  {
    question: "What are the common symptoms of menopause?",
    answer: "Common symptoms of menopause include hot flashes, night sweats, vaginal dryness, mood swings, sleep disturbances, and changes in libido. These symptoms are caused by hormonal fluctuations, particularly declining estrogen levels.",
    category: "menopause"
  },
  {
    question: "What is Premenstrual Syndrome (PMS)?",
    answer: "PMS is a combination of physical and emotional symptoms that occur in the days or weeks before menstruation and typically resolve once menstruation begins.",
    category: "health"
  },
  {
    question: "How can I track my menstrual cycle effectively?",
    answer: "You can track your menstrual cycle by keeping a calendar, using smartphone apps designed for menstrual tracking, or using a physical tracker to monitor the start and end dates of your periods, as well as any associated symptoms.",
    category: "tracking"
  }
];

export class EducationalService {
  getAllContent(): EducationalQA[] {
    return educationalData;
  }

  getByCategory(category: string): EducationalQA[] {
    return educationalData.filter(item => item.category === category);
  }

  search(query: string): EducationalQA[] {
    const lowerQuery = query.toLowerCase();
    return educationalData.filter(item =>
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery)
    );
  }

  getCategories(): string[] {
    const categories = new Set(educationalData.map(item => item.category));
    return Array.from(categories);
  }
}

export const educationalService = new EducationalService();
