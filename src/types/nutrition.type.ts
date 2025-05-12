export interface NutritionGoalSingleData {
  title: string;
  color: string;
  value: number;
  target: number;
}

export interface NutritionGoalData {
  calorieGoal: number;
  currentCalorie: number;
  nutritionGoals: NutritionGoalSingleData[];
}
