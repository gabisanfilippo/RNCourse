import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GoalItem } from "./components/GoalItem";
import { AddGoal } from "./components/AddGoal";

export interface ITask {
  text: string;
  id: string;
  time: string;
  date: Date;
  done: boolean;
}

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState<ITask[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  const todayList = courseGoals
    .filter((task) => task.date.getDay() === new Date().getDay())
    .filter((task) => (hideCompleted ? !task.done : task));
  const tomorrowList = courseGoals.filter(
    (task) => task.date.getDay() !== new Date().getDay()
  );

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Today</Text>
        <Pressable onPress={() => setHideCompleted((prev) => !prev)}>
          <Text style={styles.hideText}>
            {hideCompleted ? "Show" : "Hide"} completed
          </Text>
        </Pressable>
      </View>
      <View>
        {todayList.length === 0 && (
          <Text style={styles.nothing}>nothing to show.</Text>
        )}
        <FlatList
          data={todayList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem
              mode="today"
              item={item}
              setCourseGoals={setCourseGoals}
            />
          )}
        />
      </View>
      <Text style={styles.title}>Tomorrow</Text>

      <View>
        {tomorrowList.length === 0 && (
          <Text style={styles.nothing}>nothing to show.</Text>
        )}
        <FlatList
          data={tomorrowList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem
              mode="tomorrow"
              item={item}
              setCourseGoals={setCourseGoals}
            />
          )}
        />
      </View>

      <Pressable
        style={styles.addGoalContainer}
        onPress={() => setModalIsVisible(true)}
      >
        <Text style={styles.addGoal}>+</Text>
      </Pressable>
      <AddGoal
        setCourseGoals={setCourseGoals}
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    flex: 1,
    gap: 16,
    position: "relative",
    backgroundColor: "#F7F8FA",
  },
  goalsContainer: {
    flex: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
  },
  hideText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3478F6",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  addGoal: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 34,
  },
  addGoalContainer: {
    backgroundColor: "#000000",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    position: "absolute",
    right: 30,
    bottom: 50,
  },
  nothing: {
    fontSize: 16,
    color: "#767577b9",
    marginLeft: 40,
    marginVertical: 30,
  },
});
