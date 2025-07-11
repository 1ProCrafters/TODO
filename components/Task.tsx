import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskProps {
  task: { text: string; completed: boolean };
  onToggle: () => void;
  onDelete: () => void;
}

const Task = ({ task, onToggle, onDelete }: TaskProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={onToggle} style={styles.square}>
          {task.completed && <View style={styles.completedSquare} />}
        </TouchableOpacity>
        <Text style={[styles.itemText, task.completed && styles.completedItemText]}>
          {task.text}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Task Item Styles
  item: {
    backgroundColor: "#FFF", // Original Color: #FFF
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  // Unmarked Checkbox Square Styles
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  // Marked Checkbox Square Styles
  completedSquare: {
    width: 12,
    height: 12,
    backgroundColor: "#55BCF6",
    borderRadius: 3,
  },
  // Task Text Item Styles
  itemText: {
    maxWidth: "80%",
  },
  // Completed Task Text Item Styles
  completedItemText: {
    textDecorationLine: "line-through",
    color: "#BDBDBD",
  },
});

export default Task;
