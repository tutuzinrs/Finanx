import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function CustomStatusBar() {
  return (
    <>
      {/* Background verde para área de bounce no iOS */}
      <View style={styles.topBackground} />
      <StatusBar
        style="dark" // mantém ícones pretos
        translucent={true} // remove a barra de fundo
        backgroundColor="transparent" // garante que o fundo fique transparente
      />
    </>
  );
}

const styles = StyleSheet.create({
  topBackground: {
    position: "absolute",
    top: -1000,
    left: 0,
    right: 0,
    height: 1000,
    backgroundColor: "#25b05f",
    zIndex: -1,
  },
});
