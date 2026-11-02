import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((currentCount) => currentCount + 1);
    console.log("po pridani", count);
  }

  function handleSubtract() {
    setCount((currentCount) => Math.max(0, currentCount - 1));
    console.log("po ubrati", count);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pocitadlo objednavok</Text>

      <Text style={[styles.counter, count >= 5 && styles.counterLimit]}>
        {count}
      </Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={handleSubtract}
          disabled={count === 0}
          style={[styles.button, count === 0 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Pressable onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Pressable onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.buttonText}>vynulovat</Text>
      </Pressable>
      {count >= 5 && <Text style={styles.limitText}>dosiahol si limit</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    marginBottom: 10,
  },

  counter: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },

  counterLimit: {
    color: "#dc2626",
  },

  limitText: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 15,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#3478db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  disabledButton: {
    backgroundColor: "#cccccc",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  resetButton: {
    backgroundColor: "#3478db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
});
