import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolate,
  FadeInDown,
  FadeOutUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AnimatedBottomSheet from "../../../components/AnimatedBottomSheet";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import NutritionGoalsSection from "../../../components/NutritionGoalsSection";
import { NUTRITION_GOALS_DATA } from "../../../mockupData";
import {
  MealsStackNavigationRouteProp,
  MealsStackNavigationType,
} from "../../../navigation/MealsStackNavigator";
import { colors, spacing } from "../../../theme";
import { DAYS_LONG_EN } from "../../../utils/date";
import { toFirstLetterCapital } from "../../../utils/text";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IMAGE_HEIGHT = Dimensions.get("window").height * 0.4;

const MealDetails = () => {
  const {
    params: { meal, showAddButton },
  } = useRoute<MealsStackNavigationRouteProp<"MealDetails">>();
  const navigation = useNavigation<MealsStackNavigationType<"MealDetails">>();

  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const translateY = useSharedValue(0);

  const [servingCount, setServingCount] = useState(1);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedDaysToAddMeal, setSelectedDaysToAddMeal] = useState<number[]>(
    [],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    const imageTranslateY = interpolate(
      translateY.value,
      [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
      [0, -20, -30],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY: imageTranslateY }],
    };
  });

  const closeButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, IMAGE_HEIGHT - 100],
        [1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, IMAGE_HEIGHT],
            [0, 5],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const onClose = () => {
    navigation.goBack();
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setSelectedDaysToAddMeal([]);
  };

  const toggleDayToAddMeal = (dayIndex: number) => {
    setSelectedDaysToAddMeal((prev) => {
      const newPrev = [...prev];

      const index = newPrev.findIndex((day) => day === dayIndex);

      // not selected, select
      if (index === -1) newPrev.push(dayIndex);
      else newPrev.splice(index, 1);

      return newPrev;
    });
  };

  return (
    <BottomSheetModalProvider>
      <View>
        <FocusAwareStatusBar style="light" />
        <AnimatedPressable
          onPress={onClose}
          style={[
            {
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 9,
              backgroundColor: "#fff",
              borderRadius: 18,
              width: 36,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
            },
            closeButtonStyle,
          ]}
        >
          <AntDesign name="close" size={22} color="#000" />
        </AnimatedPressable>
        <AnimatedImage
          source={meal.image}
          style={[
            {
              position: "absolute",
              height: IMAGE_HEIGHT,
              width,
            },
            imageStyle,
          ]}
          contentFit="cover"
        />

        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={{
            paddingTop: IMAGE_HEIGHT - 30,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: spacing.medium,
              gap: spacing.large,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.57,
              shadowRadius: 15.19,

              elevation: 23,

              paddingBottom: bottom || 20,
            }}
          >
            <View
              style={{
                gap: spacing.small,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {meal.name}
              </Text>
              <Text>{`${meal.calorie} Calories`}</Text>
            </View>

            <NutritionGoalsSection data={NUTRITION_GOALS_DATA} />

            {showAddButton && (
              <Button
                text="Add to my Meals"
                onPress={() => {
                  setIsBottomSheetVisible(true);
                }}
              />
            )}

            {/* SERVINGS */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                Servings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.medium,
                }}
              >
                <Pressable
                  disabled={servingCount === 1}
                  onPress={() => setServingCount((prev) => prev - 1)}
                >
                  <AntDesign
                    name="minuscircle"
                    color={servingCount === 1 ? "lightgray" : "gray"}
                    size={18}
                  />
                </Pressable>
                <Animated.Text
                  key={servingCount.toString()}
                  entering={FadeInDown}
                  exiting={FadeOutUp}
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    width: 25,
                    textAlign: "center",
                  }}
                >
                  {servingCount}
                </Animated.Text>
                <Pressable onPress={() => setServingCount((prev) => prev + 1)}>
                  <AntDesign name="pluscircle" color="gray" size={18} />
                </Pressable>
              </View>
            </View>

            <View
              style={{ backgroundColor: "lightgray", width: "100%", height: 1 }}
            />

            {/* INGREDIENTS */}
            <View
              style={{
                gap: spacing.large,
              }}
            >
              <View
                style={{
                  gap: spacing.small,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                  }}
                >
                  Ingredients
                </Text>

                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  {meal.ingredients.length} ingredients needed
                </Text>
              </View>
              <View
                style={{
                  gap: spacing.large,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,

                  borderRadius: 10,

                  paddingHorizontal: spacing.large,
                  paddingVertical: spacing.medium,
                }}
              >
                {meal.ingredients.map((ingredient, index) => (
                  <View
                    key={`ingredient-${index}`}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "500" }}>{ingredient.name}</Text>
                    <Text
                      style={{
                        color: colors.secondary,
                      }}
                    >
                      {ingredient.gr}gr
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* RECIPE */}
            <View
              style={{
                gap: spacing.large,
              }}
            >
              <View
                style={{
                  gap: spacing.small,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                  }}
                >
                  Recipe
                </Text>

                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  {meal.recipe.length} steps to prepare
                </Text>
              </View>

              <View
                style={{
                  gap: spacing.large,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,

                  borderRadius: 10,

                  paddingHorizontal: spacing.large,
                  paddingVertical: spacing.medium,
                }}
              >
                {meal.recipe.map((recipeStep, index) => (
                  <View
                    key={`recipe-step-${index}`}
                    style={{
                      flexDirection: "row",
                      gap: spacing.large,
                    }}
                  >
                    <Text>{index + 1}</Text>
                    <Text
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      {recipeStep}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Animated.ScrollView>

        <AnimatedBottomSheet
          closeModal={closeBottomSheet}
          open={isBottomSheetVisible}
        >
          <View
            style={{
              paddingHorizontal: spacing.medium,
              paddingVertical: spacing.medium,
              alignItems: "center",
              gap: spacing.large,
            }}
          >
            <View
              style={{
                gap: spacing.small,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Check Your Macros!
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  lineHeight: 22,
                }}
              >
                We recommend closely hitting your daily targets for best
                results. If you're confident with these changes, press
                "Confirm".
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                gap: spacing.tiny,
              }}
            >
              {DAYS_LONG_EN.map((day, index) => (
                <Pressable
                  key={`day-${index}`}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: spacing.medium,
                  }}
                  onPress={() => {
                    toggleDayToAddMeal(index);
                  }}
                >
                  <Text>{toFirstLetterCapital(day)}</Text>
                  <Checkbox
                    isChecked={selectedDaysToAddMeal.includes(index)}
                    onPress={() => {
                      toggleDayToAddMeal(index);
                    }}
                  />
                </Pressable>
              ))}
            </View>

            <Button
              text="Confirm"
              containerStyle={{
                backgroundColor: "green",
              }}
              disabled={selectedDaysToAddMeal.length === 0}
              onPress={closeBottomSheet}
            />
          </View>
        </AnimatedBottomSheet>
      </View>
    </BottomSheetModalProvider>
  );
};

export default MealDetails;
