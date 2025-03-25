import MapView, {Marker} from "react-native-maps";
import {Dimensions, Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useStoreContext from "./context/store/storeProvider";

const Stores = () => {
    const {stores} = useStoreContext();

    return (
        <View style={styles.container}>
            <Text style={styles.stores_title}>איתור חנות</Text>
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: stores[0].coordinate.latitude,
                        longitude: stores[0].coordinate.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {stores.map(store => (
                        <Marker
                            key={store.id}
                            coordinate={store.coordinate}
                        >
                            <View style={styles.markerWrapper}>
                                <Text style={styles.markerText}>{store.title}</Text>
                                <Icon name="map-marker" size={32} color="#c9192e" />
                            </View>
                        </Marker>
                    ))}

                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingHorizontal: 20,
        paddingVertical: 20,
    },
    stores_title: {
      textAlign: "center",
      fontSize: 26,
      fontWeight: "700",
      fontFamily: "Heebo",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 20
    },
    map: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').width,
    },
    markerWrapper: {
        alignItems: 'center',
    },

    markerText: {
        fontSize: 12,
        fontFamily: "Heebo",
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    }
})

export default Stores;