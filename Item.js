import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Item({ task, onToggle, onDelete }) {
  return (
    <View
      style={[
        styles.taskItem,
        task.completed ? styles.completedItem : styles.pendingItem,
      ]}
    >
      <Pressable style={styles.taskPressable} onPress={() => onToggle(task.id)}>
        <Text style={styles.taskText}>{task.text}</Text>

        <Text style={styles.statusText}>
          {task.completed ? "hotove" : "nehotove"}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={() => onDelete(task)}>
        <Text style={styles.deleteButtonText}>DEL</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  pendingItem: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
  },
  completedItem: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
  },
  taskPressable: {
    flex: 1,
    paddingVertical: 4,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#222222",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 6,
    color: "#444444",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 7,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
