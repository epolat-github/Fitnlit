import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";

import ListItemWithImage from "../../../components/ListItemWithImage";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ProgramsStackNavigationType } from "../../../navigation/ProgramsStackNavigator";
import {
  getAllProgramCategoryAction,
  selectProgramCategories,
} from "../../../slices/programsSlice";
import { spacing } from "../../../theme";

const ProgramCategories = () => {
  const navigation =
    useNavigation<ProgramsStackNavigationType<"ProgramCategories">>();

  const dispatch = useAppDispatch();
  const programCategories = useAppSelector(selectProgramCategories);
  const { showSnackbar } = useSnackbarContext();

  const getAllProgramCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getAllProgramCategoryAction()).unwrap();
    } catch (err: any) {
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [dispatch, showSnackbar]);

  useEffect(() => {
    getAllProgramCategoryHandler();
  }, [getAllProgramCategoryHandler]);

  const navigateToProgramList = useCallback(
    (categoryId: number) => {
      navigation.navigate("ProgramList", {
        categoryId,
      });
    },
    [navigation],
  );

  return (
    <FlatList
      data={programCategories}
      renderItem={({ item }) => (
        <ListItemWithImage
          image={item.image}
          title={item.name}
          onPress={() => navigateToProgramList(item.id)}
        />
      )}
      keyExtractor={(item) => `program-category-item-${item.id}`}
      initialNumToRender={3}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
        gap: spacing.large,
      }}
    />
  );
};

export default ProgramCategories;
