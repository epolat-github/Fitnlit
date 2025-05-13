import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";

import ListItemWithImage from "../../../components/ListItemWithImage";
import SkeletonList from "../../../components/SkeletonList";
import SkeletonLoader from "../../../components/SkeletonLoader";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RecipesStackNavigationType } from "../../../navigation/RecipesStackNavigator";
import {
  getMealCategoriesAction,
  selectMealCategories,
} from "../../../slices/mealsSlice";
import { spacing } from "../../../theme";

const MealCategories = () => {
  const navigation =
    useNavigation<RecipesStackNavigationType<"MealCategories">>();

  const dispatch = useAppDispatch();
  const mealCategories = useAppSelector(selectMealCategories);
  const { showSnackbar } = useSnackbarContext();

  const [isLoading, setIsLoading] = useState(false);

  const getMealCategoriesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getMealCategoriesAction()).unwrap();
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [dispatch, showSnackbar]);

  useEffect(() => {
    getMealCategoriesHandler();
  }, [getMealCategoriesHandler]);

  const navigateToMealList = useCallback(
    (categoryId: number) => {
      navigation.navigate("MealList", {
        categoryId,
      });
    },
    [navigation],
  );

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  return (
    <FlatList
      data={mealCategories}
      renderItem={({ item }) => (
        <ListItemWithImage
          image={item.image}
          title={item.name}
          onPress={() => navigateToMealList(item.id)}
        />
      )}
      keyExtractor={(item) => `meal-category-item-${item.id}`}
      initialNumToRender={3}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
        gap: spacing.large,
      }}
    />
  );
};

export default MealCategories;
