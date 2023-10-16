import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import FilterPanel from "../../../components/FilterPanel";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import MealItem from "../../../components/Meals/MealItem";
import { MEALS } from "../../../mockupData";
import { MealsStackNavigationType } from "../../../navigation/MealsStackNavigator";
import { spacing } from "../../../theme";
import { Meal } from "../../../types/meals.type";

const MealList = () => {
  const navigation = useNavigation<MealsStackNavigationType<"MealList">>();

  const [searchValue, setSearchValue] = useState("");

  const filteredMeals = useMemo(() => {
    let newFilteredMeals = MEALS;

    // filter search value
    if (searchValue === "") {
      return newFilteredMeals;
    }

    newFilteredMeals = newFilteredMeals?.filter((exercise: Meal) => {
      const isMealNameFound = exercise.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return isMealNameFound;
    });

    return newFilteredMeals;
  }, [searchValue]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{
        paddingVertical: spacing.medium,
        gap: spacing.large,
      }}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
    >
      <FocusAwareStatusBar style="light" />

      <View
        style={{
          width: "100%",
        }}
      >
        <FilterPanel
          value={searchValue}
          setValue={setSearchValue}
          onClear={() => setSearchValue("")}
          placeholder="Search for a meal"
        />
      </View>

      <View
        style={{
          paddingHorizontal: spacing.medium,
          gap: spacing.large,
        }}
      >
        {filteredMeals.map((meal, index) => (
          // TODO change key to meal.id
          <MealItem
            key={`meal-${index}`}
            index={index}
            meal={meal}
            onPress={() =>
              navigation.navigate("MealDetails", {
                meal,
                showAddButton: true,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MealList;
