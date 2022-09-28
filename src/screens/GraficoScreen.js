import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart, PieChart } from "react-native-chart-kit";
import { useHeaderHeight } from "@react-navigation/elements"
import { onSnapshot, orderBy, query } from 'firebase/firestore';

import { Colores } from '../constants/estilos';
import { Contexto } from '../store/Contexto';
import refFotos from '../util/firestoreFotos';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import moment from 'moment';

export default function GraficoScreen({ navigation, route }) {
    // Contexto
    const contexto = useContext(Contexto);
    const sonLindas = contexto.seccion == 'Lindas';
    // Pantalla
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const screenHeightMenosHeader = screenHeight - useHeaderHeight();
    // Datos
    const [labels, setLabels] = useState([]);
    const [datasetsData, setDatasetsData] = useState([]);
    const [cargando, setCargando] = useState(true);

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
        backgroundGradientFrom: Colores.primarioOscuro,
        // backgroundGradientFromOpacity: 0.9,
        backgroundGradientTo: Colores.primarioOscuro,
        // backgroundGradientToOpacity: 1,
        // color: () => Colores.terciario,
        color: () => 'white',
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

    useEffect(() => {
        const q = query(refFotos, orderBy("fecha", 'desc'));    
        return onSnapshot(q, qs => {
            const labels = [];
            const datasetsData = [];
            qs.docs.forEach(qds => {
                if (qds.data().esLinda === sonLindas) {
                    const votos = qds.data().votos;
                    const autor = qds.data().autor;
                    const autorRecortado = autor.substring(0, 4);
                    const fecha = qds.data().fecha.toDate();
                    const fechaFormateada = moment(fecha).format('D/M/YY-k:mm')
                    const label = `${autorRecortado}-${fechaFormateada}`;                    
                    labels.push(label);
                    datasetsData.push(votos);
                }
            });
            setLabels(labels);
            setDatasetsData(datasetsData);
            setCargando(false);
        });
    }, []);

    if (cargando) {
        return <LoadingOverlay message={"Calculando..."} />
    }

    const data = {
        labels: labels,
        datasets: [{data: datasetsData}]
    };

    return (
        <View style={styles.viewPrincipal}>
            <BarChart
                data={data}
                width={screenWidth}
                height={screenHeightMenosHeader}
                chartConfig={chartConfig}

                verticalLabelRotation={90}
                // style={{
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
