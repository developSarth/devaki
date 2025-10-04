# Devaki Backend Integration Documentation

## Overview
This document explains how the CSV datasets have been integrated into the Devaki period tracker application with a working backend.

## Architecture

### Data Storage
The application uses **localStorage** as a temporary data persistence layer. This allows:
- User data to persist across browser sessions
- Cycle tracking and symptom logging
- No need for complex database setup during prototyping
- Easy migration to a real database later

### Data Services

#### 1. **DataService** (`src/services/dataService.ts`)
Handles all cycle and symptom tracking data:

**Features:**
- Store and retrieve cycle records (start dates, durations, predictions)
- Track daily symptoms (flow level, mood, physical symptoms)
- Calculate insights (average cycle length, period duration, regularity)
- Predict next period dates based on historical data

**Key Methods:**
- `saveCycleRecord()` - Save period tracking data
- `getCycleRecords()` - Retrieve user's cycle history
- `saveDailySymptom()` - Log symptoms for a specific date
- `getDailySymptoms()` - Get symptom data for date range
- `calculateInsights()` - Generate personalized insights

**Data from CSV:**
The FedCycleData CSV structure has been integrated into the cycle_records format:
```typescript
{
  startDate: "2024-01-20",
  endDate: "2024-01-25",
  cycleLength: 28,
  periodDuration: 6,
  predictedNextStart: "2024-02-17"
}
```

#### 2. **EducationalService** (`src/services/educationalService.ts`)
Provides menstrual health education content based on the Training Data CSV.

**Features:**
- 100+ Q&A pairs covering menstrual health topics
- Categories: basics, health, remedies, nutrition, fitness, menopause
- Search functionality across questions and answers
- Organized by topic for easy navigation

**Sample Data (from Training Data.csv):**
- "What is a normal menstrual cycle length?"
- "What are the phases of menstrual cycle?"
- "What is the ideal diet for each phase of menstrual cycle?"
- "How can I track my menstrual cycle effectively?"

#### 3. **RemedyService** (`src/services/remedyService.ts`)
Manages natural remedies and wellness recommendations.

**Features:**
- 10+ curated natural remedies
- Categories: drinks, physical, nutrition, exercise, aromatherapy, supplements
- Phase-specific recommendations (menstrual, follicular, luteal, menopause)
- Detailed ingredients, instructions, and benefits

**Sample Remedies:**
1. **Turmeric Golden Milk** - Anti-inflammatory drink for cramps
2. **Ginger Tea** - Reduces nausea and pain
3. **Heat Therapy** - Muscle relaxation
4. **Magnesium-Rich Foods** - Reduces PMS symptoms
5. **Gentle Yoga Flow** - Menstrual relief

## Dataset Integration

### 1. FedCycleData CSV
**Original Structure:**
```
Start Date, End Date, Cycle Length, Period Duration, Predicted Next Start
2023-01-20, 2023-01-25, , 6.0,
2023-03-19, 2023-03-23, 58.0, 5.0,
```

**Integrated As:**
- Sample data in `dataService.loadSampleCycleData()`
- User's actual tracking data stored in localStorage
- Used for cycle prediction and insights calculation

### 2. Menstruation Tracking Data CSV
**Original Structure:**
```
instruction, output
"What is a normal menstrual cycle length?", "A normal menstrual cycle..."
```

**Integrated As:**
- Hardcoded educational content in `educationalService.ts`
- All 100+ Q&A pairs available for search and browsing
- Categorized for easy navigation

### 3. Training & Testing Data CSVs
**Purpose:** Educational content and AI training data

**Integrated As:**
- Core educational material in EducationalView component
- Searchable knowledge base with categories
- Topics include: menstruation basics, symptoms, nutrition, fitness, menopause

## Components Using Backend Services

### Calendar Component
```typescript
- Uses dataService.saveDailySymptom()
- Uses dataService.getDailySymptoms()
- Displays symptom markers on calendar dates
```

### Insights View
```typescript
- Uses dataService.calculateInsights()
- Shows average cycle length, period duration
- Predicts next period date
- Tracks cycle regularity
```

### Remedies View
```typescript
- Uses remedyService.getAllRemedies()
- Filters by category and phase
- Search functionality
```

### Educational View
```typescript
- Uses educationalService.getAllContent()
- Search across all Q&A pairs
- Filter by category
```

## User Data Flow

1. **Registration/Login**
   - User creates account
   - User ID generated and stored in localStorage
   - Profile data saved: name, email, age, menopause status

2. **Cycle Tracking**
   - User logs period start/end dates
   - System calculates cycle length
   - Predictions generated for next period

3. **Symptom Logging**
   - User selects date on calendar
   - Logs symptoms, flow level, mood
   - Data saved with userId and date

4. **Insights Generation**
   - System analyzes all user's cycle data
   - Calculates averages and patterns
   - Identifies common symptoms
   - Determines cycle regularity

## Future Database Migration

The current localStorage implementation can easily be migrated to Supabase or any database:

### Migration Steps:
1. **Enable Supabase Connection**
   - Already configured in `.env` file
   - Supabase client initialized in `dataService.ts`

2. **Create Database Tables**
   - `user_profiles` - User information
   - `cycle_records` - Period tracking
   - `daily_symptoms` - Symptom logs
   - `health_insights` - Generated insights
   - `educational_content` - Q&A database
   - `remedies` - Wellness recommendations

3. **Update Service Methods**
   - Replace localStorage calls with Supabase queries
   - Add Row Level Security policies
   - Enable real-time subscriptions

4. **Data Sync**
   - Export existing localStorage data
   - Import to database
   - Enable multi-device sync

## Testing the Backend

### Test Cycle Tracking:
1. Login/Register
2. Click any date on calendar
3. Log symptoms and save
4. Navigate months to see data persists

### Test Insights:
1. Add multiple cycle records
2. Go to Insights view
3. See calculated averages and predictions

### Test Search:
1. Go to Remedies or Education view
2. Use search bar
3. Filter by categories

### Test Data Persistence:
1. Add data and logout
2. Close browser
3. Login again - data still there

## Performance Considerations

- **localStorage Limits:** ~5-10MB per domain (sufficient for prototype)
- **Data Structure:** JSON serialization for easy migration
- **Caching:** Educational content loaded once per session
- **Async Operations:** All data service methods are async-ready

## Security Notes

- Data stored locally in browser
- No external API calls for core functionality
- User data never leaves their device
- Ready for encryption when moving to cloud database

## Conclusion

The Devaki app now has a fully functional backend using localStorage, with all CSV datasets integrated into usable services. The architecture is designed for easy migration to a cloud database like Supabase when ready for production.
