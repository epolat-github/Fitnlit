import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import ListItemWithImage from "../../../components/ListItemWithImage";
import SkeletonList from "../../../components/SkeletonList";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import useToken from "../../../hooks/useToken";
import {
  RecipesStackNavigationRouteProp,
  RecipesStackNavigationType,
} from "../../../navigation/RecipesStackNavigator";
import { getMealsByCategory } from "../../../services/meals.service";
import { spacing } from "../../../theme";
import { MealListItem } from "../../../types/meals.type";

const MealList = () => {
  const route = useRoute<RecipesStackNavigationRouteProp<"MealList">>();
  const navigation = useNavigation<RecipesStackNavigationType<"MealList">>();

  const { categoryId } = route.params;

  const token = useToken();
  const { showSnackbar } = useSnackbarContext();

  const [isLoading, setIsLoading] = useState(false);
  const [mealList, setMealList] = useState<MealListItem[]>([]);

  const getMealListHandler = useCallback(async () => {
    try {
      if (!token) return;

      setIsLoading(true);

      const response = await getMealsByCategory(token, categoryId);

      setIsLoading(false);
      setMealList(response);
    } catch (err: any) {
      setIsLoading(false);

      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [categoryId, showSnackbar, token]);

  useEffect(() => {
    getMealListHandler();
  }, [getMealListHandler]);

  const navigateToMealDetails = useCallback(
    (mealId: number) => {
      navigation.navigate("MealDetailsStack", {
        mealId,
      });
    },
    [navigation],
  );

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  return (
    <FlatList
      data={mealList}
      renderItem={({ item }) => (
        <ListItemWithImage
          image={item.image}
          title={item.name}
          onPress={() => navigateToMealDetails(item.id)}
        />
      )}
      keyExtractor={(item) => `meal-list-item-${item.id}`}
      initialNumToRender={3}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
        gap: spacing.large,
      }}
    />
  );
};

export default MealList;
