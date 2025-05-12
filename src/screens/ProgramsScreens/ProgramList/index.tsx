import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import ListItemWithImage from "../../../components/ListItemWithImage";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import useToken from "../../../hooks/useToken";
import {
  ProgramsStackNavigationRouteProp,
  ProgramsStackNavigationType,
} from "../../../navigation/ProgramsStackNavigator";
import { getProgramsByCategory } from "../../../services/programs.service";
import { spacing } from "../../../theme";
import { ProgramListItem } from "../../../types/programs.type";

const ProgramList = () => {
  const token = useToken();
  const navigation =
    useNavigation<ProgramsStackNavigationType<"ProgramList">>();
  const route = useRoute<ProgramsStackNavigationRouteProp<"ProgramList">>();

  const { categoryId } = route.params;

  const { showSnackbar } = useSnackbarContext();

  const [programList, setProgramList] = useState<ProgramListItem[]>([]);

  const getProgramListHandler = useCallback(async () => {
    try {
      if (!token) return;

      const result = await getProgramsByCategory(token, categoryId);

      setProgramList(result);
    } catch (err: any) {
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [categoryId, showSnackbar, token]);

  useEffect(() => {
    getProgramListHandler();
  }, [getProgramListHandler]);

  const navigateToProgramDetails = useCallback(
    (programId: number) => {
      navigation.navigate("ProgramDetails", {
        programId,
      });
    },
    [navigation],
  );

  return (
    <FlatList
      data={programList}
      renderItem={({ item }) => (
        <ListItemWithImage
          image={item.image}
          title={item.name}
          onPress={() => navigateToProgramDetails(item.id)}
        />
      )}
      keyExtractor={(item) => `program-list-item-${item.id}`}
      initialNumToRender={3}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
        gap: spacing.large,
      }}
    />
  );
};

export default ProgramList;
