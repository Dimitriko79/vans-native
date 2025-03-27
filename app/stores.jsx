import MapView, { Marker } from "react-native-maps";
import { Dimensions, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useStoreContext from "./context/store/storeProvider";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

const { height, width } = Dimensions.get("window");

const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const Stores = () => {
    const { stores } = useStoreContext();
    const [location, setLocation] = useState(null);
    const [nearestStore, setNearestStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission denied');
                setLoading(false);
                return;
            }

            const userLocation = await Location.getCurrentPositionAsync({});
            setLocation(userLocation.coords);

            const closest = stores.reduce((prev, curr) => {
                const prevDist = getDistance(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                    prev.coordinate.latitude,
                    prev.coordinate.longitude
                );
                const currDist = getDistance(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                    curr.coordinate.latitude,
                    curr.coordinate.longitude
                );
                return currDist < prevDist ? curr : prev;
            });

            setNearestStore(closest);
            setRegion({
                latitude: closest.coordinate.latitude,
                longitude: closest.coordinate.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            setLoading(false);
        })();
    }, [stores]);

    const zoom = (type) => {
        if (!region) return;
        const factor = type === 'in' ? 0.5 : 2;
        const newRegion = {
            ...region,
            latitudeDelta: region.latitudeDelta * factor,
            longitudeDelta: region.longitudeDelta * factor,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 300);
    };

    const goToMyLocation = () => {
        if (location) {
            const myRegion = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
            setRegion(myRegion);
            mapRef.current?.animateToRegion(myRegion, 300);
        }
    };

    if (loading || !region) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#c9192e" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.stores_title}>איתור חנות</Text>
            <View>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={region}
                >
                    {stores.map(store => (
                        <Marker
                            key={store.id}
                            coordinate={store.coordinate}
                        >
                            <View style={styles.markerWrapper}>
                                <Text style={styles.markerText}>{store.title}</Text>
                                <Icon
                                    name="map-marker"
                                    size={32}
                                    color={store.id === nearestStore.id ? "#007aff" : "#c9192e"}
                                />
                            </View>
                        </Marker>
                    ))}
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            title="המיקום שלך"
                            pinColor="blue"
                        />
                    )}
                </MapView>

                {/* Кнопки управления */}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => zoom('in')} style={styles.controlBtn}>
                        <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => zoom('out')} style={styles.controlBtn}>
                        <Text style={styles.controlText}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToMyLocation} style={styles.locateBtn}>
                        <Icon name="location-arrow" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        minHeight: height,
    },
    stores_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 20,
    },
    map: {
        width: width - 20,
        height: width,
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
    },
    controls: {
        position: 'absolute',
        right: 10,
        top: 10,
        alignItems: 'center',
        gap: 10,
    },
    controlBtn: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    controlText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    locateBtn: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    }
});

export default Stores;