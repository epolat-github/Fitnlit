export interface IngredientOld {
  name: string;
  gr: number;
}

export interface MealOld {
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
  ingredients: IngredientOld[];
  recipe: string[];
}

// meal list per day
export type WeeklyMealProgram = MealOld[][];

export interface MealCategory {
  id: number;
  name: string;
  image: string;
}

export interface MealListItem {
  id: number;
  name: string;
  image: string;
}

export interface Ingredient {
  id: number;
  gr: number;
  name: string;
}
export interface Meal {
  id: number;
  fileBase64: string;
  name: string;
  protein: number;
  carbohydrate: number;
  fat: number;
  fibre: number;
  fileName: string;
  mealCategoryIds: number[];
  recepie: string;
  totalKcal: number;
  mealIngredientRequestDTO: Ingredient[];
}
