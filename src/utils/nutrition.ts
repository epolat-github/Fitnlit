import { colors } from "../theme";

interface GenerateNutritionGoalInput {
  calorieGoal: number;
  currentCalorie: number;
  carbGoal: number;
  currentCarb: number;
  fatGoal: number;
  currentFat: number;
  proteinGoal: number;
  currentProtein: number;
  fibreGoal: number;
  currentFibre: number;
}

export const generateNutritionGoalData = (
  input: GenerateNutritionGoalInput,
) => {
  return {
    calorieGoal: input.calorieGoal,
    currentCalorie: input.currentCalorie,
    nutritionGoals: [
      {
        title: "Karbonhidrat",
        color: colors.goals.carbohydrate,
        value: input.currentCarb,
        target: input.carbGoal,
      },
      {
        title: "Yağ",
        color: colors.goals.fat,
        value: input.currentFat,
        target: input.fatGoal,
      },
      {
        title: "Protein",
        color: colors.goals.protein,
        value: input.currentProtein,
        target: input.proteinGoal,
      },
      {
        title: "Lif",
        color: colors.goals.fibre,
        value: input.currentFibre,
        target: input.fibreGoal,
      },
    ],
  };
};
