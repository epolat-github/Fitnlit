export interface Ingredient {
  name: string;
  gr: number;
}

export interface Meal {
  id: string;
  calorie: number;
  protein: number;
  fat: number;
  fibre: number;
  carb: number;
  name: string;
  isEaten: boolean;
  isFavorite: boolean;
  image: string;
  ingredients: Ingredient[];
  recipe: string[];
}

// meal list per day
export type WeeklyMealProgram = Meal[][];
