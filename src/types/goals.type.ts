type WeekValues = [number, number, number, number, number, number, number];

export interface GoalsResponse {
  nutrition: {
    totalCal: number;
    totalCarbonhydrate: number;
    totalFat: number;
    totalFibre: number;
    totalProtein: number;
    carbonhydrate: WeekValues;
    fat: WeekValues;
    fibre: WeekValues;
    protein: WeekValues;
    tkcal: WeekValues;
  };
  sleep: WeekValues;
  step: WeekValues;
  water: WeekValues;
  totalSleep: number;
  totalStep: number;
  totalWater: number;
}

export enum GOAL {
  WATER = 1,
  STEP = 2,
  SLEEP = 3,
  NUTRITION_TKCAL = 4,
  NUTRITION_FIBRE = 5,
  NUTRITION_PROTEIN = 6,
  NUTRITION_FAT = 7,
  NUTRITION_CARBOHYDRATE = 8,
}

export interface UpdateGoalRequest {
  userId: string;
  dailyGoal: GOAL;
  value: number;
}
