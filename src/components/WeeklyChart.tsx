import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeeklyChartProps {
  data: { day: string; amount: number }[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxAmount = Math.max(...data.map((d) => Math.abs(d.amount)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos Semanais</Text>

      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const height = (Math.abs(item.amount) / maxAmount) * 100;
          const isPositive = item.amount >= 0;

          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${height}%`,
                      backgroundColor: isPositive ? "#00A86B" : "#EF5350",
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barWrapper: {
    width: "70%",
    height: 100,
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginTop: 8,
  },
});
