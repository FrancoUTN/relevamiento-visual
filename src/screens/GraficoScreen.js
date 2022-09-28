import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from "react-native-chart-kit";
import { useHeaderHeight } from "@react-navigation/elements"

import { Colores } from '../constants/estilos';
import { useContext, useEffect } from 'react';
import { Contexto } from '../store/Contexto';

export default function GraficoScreen({ navigation, route }) {
    const contexto = useContext(Contexto);
    const sonLindas = contexto.seccion == 'Lindas';
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const screenHeightMenosHeader = screenHeight - useHeaderHeight();

    const data = {
        labels: [
            "invitado-28/11/22",
            "anonimo-28/11/22",
            "anonimo-28/11/22",
            "tester-28/11/22",
            "invitado-28/11/22",
            "tester-28/11/22"
        ],
        datasets: [
          {
            data: [1, 2, 0, 4, 2, 0]
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

    const chartConfig = {
        // backgroundGradientFrom: "#1E2923",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "#08130D",
        // backgroundGradientToOpacity: 0.5,
        color: () => Colores.primarioClaro,
        // barPercentage: 1,
    };

    useEffect(
        () => navigation.setOptions({
            title: 'Resultados',
            headerStyle: {
                backgroundColor: sonLindas ? Colores.secundario : Colores.terciario
            },
        }),
    []);

    return (
        <View style={styles.viewPrincipal}>
            <BarChart
                data={data}
                width={screenWidth}
                // width={200}
                height={screenHeightMenosHeader}
                // height={400}
                chartConfig={chartConfig}

                verticalLabelRotation={90}
                // style={{
                //     padding: 5
                // }}

                // yAxisSuffix={' votos'}
                // withVerticalLabels={false}
                showBarTops={false}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
            />
            {/* <PieChart
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
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
    }
});
