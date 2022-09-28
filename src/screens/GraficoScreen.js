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

export default function GraficoScreen({ navigation }) {
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
    const [pieData, setPieData] = useState([]);
    const [cargando, setCargando] = useState(true);
    // Configuración
    const chartConfig = {
        backgroundGradientFrom: Colores.primarioOscuro,
        // backgroundGradientFromOpacity: 0.9,
        backgroundGradientTo: Colores.primarioOscuro,
        // backgroundGradientToOpacity: 1,
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
            const pieData = [];
            qs.docs.forEach(qds => {
                if (qds.data().esLinda === sonLindas) {
                    const votos = qds.data().votos;
                    const autor = qds.data().autor;
                    const autorRecortado = autor.substring(0, 4);
                    const fecha = qds.data().fecha.toDate();
                    const fechaFormateada = moment(fecha).format('D/M/YY-k:mm')
                    const label = `${autorRecortado}-${fechaFormateada}`;
                    if (sonLindas) {
                        pieData.push({
                            name: label,
                            votos: votos,
                            color: getRandomColor(),
                            legendFontColor: "#222",
                            legendFontSize: 14
                          });
                    }
                    else {
                        labels.push(label);
                        datasetsData.push(votos);
                    }
                }
            });
            if (sonLindas) {
                setPieData(pieData);
            }
            else {
                setLabels(labels);
                setDatasetsData(datasetsData);
            }
            setCargando(false);
        });
    }, []);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    if (cargando) {
        return <LoadingOverlay message={"Calculando..."} />
    }

    const data = {
        labels: labels,
        datasets: [{data: datasetsData}]
    };

    return (
        <View style={styles.viewPrincipal}>
            {
            sonLindas ?
            <PieChart
                data={pieData}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"votos"}
                paddingLeft={"-30"}
                center={[30, 0]}
                absolute
                // hasLegend={false}
            />
            :
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
            }
        </View>
    );
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'gray',
    }
});
