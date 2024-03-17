import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GoalItem } from "./components/GoalItem";
import { GoalInput } from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState<string[]>([]);

  return (
    <View style={styles.appContainer}>
      <GoalInput setCourseGoals={setCourseGoals} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          keyExtractor={(item, index) => "goals_item_key:" + item + index}
          renderItem={({ item }) => <GoalItem item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 5,
  },
});
