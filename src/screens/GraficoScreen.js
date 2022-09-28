import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from "react-native-chart-kit";
import { Colores } from '../constants/estilos';

export default function GraficoScreen({ navigation, route }) {
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        color: () => Colores.primarioClaro,
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [1, 2, 0, 3, 5, 7]
          }
        ]
    };

    const legendFontSize = 14;
    const data2 = [
        {
          name: "Seoul",
          population: 0,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#222",
          legendFontSize
        },
        {
          name: "Toronto",
          population: 4,
          color: "#F00",
          legendFontColor: "#222",
          legendFontSize
        },
        {
          name: "New York",
          population: 2,
          color: "#ffffff",
          legendFontColor: "#222",
          legendFontSize
        },
        {
          name: "Moscow",
          population: 1,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#222",
          legendFontSize
        }
    ];

    return (
        <View style={styles.viewPrincipal}>
            <BarChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
            <PieChart
                data={data2}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                // backgroundColor={"transparent"}
                // paddingLeft={"50"}
                // center={[50, 50]}
                absolute
                // hasLegend={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
    }
});
