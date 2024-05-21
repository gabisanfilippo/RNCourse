import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ isChecked, onChange }: IProps) => {
  return (
    <Pressable onPress={onChange}>
      <View style={styles.wrapper}>
        <Text>{isChecked ? "✔️" : ""}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
