import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CycleRecord {
  id?: string;
  userId: string;
  startDate: string;
  endDate?: string;
  cycleLength?: number;
  periodDuration?: number;
  predictedNextStart?: string;
}

export interface DailySymptom {
  id?: string;
  userId: string;
  date: string;
  symptoms: {
    cramps?: boolean;
    bloating?: boolean;
    headache?: boolean;
    fatigue?: boolean;
    moodSwings?: boolean;
    acne?: boolean;
    backPain?: boolean;
    breastTenderness?: boolean;
  };
  flowLevel?: 'none' | 'light' | 'medium' | 'heavy';
  mood?: string;
  notes?: string;
}

export interface EducationalContent {
  id?: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
}

export interface Remedy {
  id?: string;
  title: string;
  description: string;
  category: string;
  phase?: string;
  ingredients?: string[];
  instructions: string;
  benefits?: string[];
}

const STORAGE_KEYS = {
  CYCLES: 'devaki_cycles',
  SYMPTOMS: 'devaki_symptoms',
  INSIGHTS: 'devaki_insights',
  USER: 'devaki_user'
};

class DataService {
  private getFromStorage<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async saveCycleRecord(record: CycleRecord): Promise<void> {
    const cycles = this.getFromStorage<CycleRecord>(STORAGE_KEYS.CYCLES);
    const newRecord = { ...record, id: record.id || crypto.randomUUID() };
    const index = cycles.findIndex(c => c.id === newRecord.id);

    if (index >= 0) {
      cycles[index] = newRecord;
    } else {
      cycles.push(newRecord);
    }

    this.saveToStorage(STORAGE_KEYS.CYCLES, cycles);
  }

  async getCycleRecords(userId: string): Promise<CycleRecord[]> {
    const cycles = this.getFromStorage<CycleRecord>(STORAGE_KEYS.CYCLES);
    return cycles.filter(c => c.userId === userId);
  }

  async saveDailySymptom(symptom: DailySymptom): Promise<void> {
    const symptoms = this.getFromStorage<DailySymptom>(STORAGE_KEYS.SYMPTOMS);
    const newSymptom = { ...symptom, id: symptom.id || crypto.randomUUID() };
    const index = symptoms.findIndex(s => s.userId === symptom.userId && s.date === symptom.date);

    if (index >= 0) {
      symptoms[index] = newSymptom;
    } else {
      symptoms.push(newSymptom);
    }

    this.saveToStorage(STORAGE_KEYS.SYMPTOMS, symptoms);
  }

  async getDailySymptoms(userId: string, startDate?: string, endDate?: string): Promise<DailySymptom[]> {
    const symptoms = this.getFromStorage<DailySymptom>(STORAGE_KEYS.SYMPTOMS);
    let filtered = symptoms.filter(s => s.userId === userId);

    if (startDate) {
      filtered = filtered.filter(s => s.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(s => s.date <= endDate);
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getSymptomByDate(userId: string, date: string): Promise<DailySymptom | null> {
    const symptoms = this.getFromStorage<DailySymptom>(STORAGE_KEYS.SYMPTOMS);
    return symptoms.find(s => s.userId === userId && s.date === date) || null;
  }

  calculateInsights(userId: string): {
    averageCycleLength: number;
    averagePeriodDuration: number;
    nextPeriodPrediction: string | null;
    commonSymptoms: string[];
    cycleRegularity: 'regular' | 'irregular' | 'unknown';
  } {
    const cycles = this.getFromStorage<CycleRecord>(STORAGE_KEYS.CYCLES)
      .filter(c => c.userId === userId)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (cycles.length === 0) {
      return {
        averageCycleLength: 28,
        averagePeriodDuration: 5,
        nextPeriodPrediction: null,
        commonSymptoms: [],
        cycleRegularity: 'unknown'
      };
    }

    const cycleLengths = cycles.filter(c => c.cycleLength).map(c => c.cycleLength!);
    const periodDurations = cycles.filter(c => c.periodDuration).map(c => c.periodDuration!);

    const avgCycle = cycleLengths.length > 0
      ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
      : 28;

    const avgPeriod = periodDurations.length > 0
      ? Math.round(periodDurations.reduce((a, b) => a + b, 0) / periodDurations.length)
      : 5;

    let nextPrediction: string | null = null;
    if (cycles.length > 0) {
      const lastCycle = cycles[cycles.length - 1];
      const lastDate = new Date(lastCycle.startDate);
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + avgCycle);
      nextPrediction = nextDate.toISOString().split('T')[0];
    }

    const symptoms = this.getFromStorage<DailySymptom>(STORAGE_KEYS.SYMPTOMS)
      .filter(s => s.userId === userId);

    const symptomCounts: { [key: string]: number } = {};
    symptoms.forEach(s => {
      Object.entries(s.symptoms).forEach(([symptom, present]) => {
        if (present) {
          symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
        }
      });
    });

    const commonSymptoms = Object.entries(symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([symptom]) => symptom);

    const variance = cycleLengths.length > 1
      ? cycleLengths.reduce((sum, len) => sum + Math.pow(len - avgCycle, 2), 0) / cycleLengths.length
      : 0;

    const cycleRegularity = variance > 16 ? 'irregular' : variance > 0 ? 'regular' : 'unknown';

    return {
      averageCycleLength: avgCycle,
      averagePeriodDuration: avgPeriod,
      nextPeriodPrediction: nextPrediction,
      commonSymptoms,
      cycleRegularity
    };
  }

  async loadSampleCycleData(userId: string): Promise<void> {
    const sampleCycles: CycleRecord[] = [
      {
        userId,
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        cycleLength: 28,
        periodDuration: 6,
        predictedNextStart: '2024-02-17'
      },
      {
        userId,
        startDate: '2024-02-18',
        endDate: '2024-02-22',
        cycleLength: 29,
        periodDuration: 5,
        predictedNextStart: '2024-03-18'
      },
      {
        userId,
        startDate: '2024-03-18',
        endDate: '2024-03-23',
        cycleLength: 29,
        periodDuration: 6,
        predictedNextStart: '2024-04-16'
      }
    ];

    for (const cycle of sampleCycles) {
      await this.saveCycleRecord(cycle);
    }
  }
}

export const dataService = new DataService();
