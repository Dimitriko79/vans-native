import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,
} from "react-native";
import React, { useMemo, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Order from "./components/orders/order";
import useOrders from "./components/orders/useOrders";

const { height, width } = Dimensions.get("window");

const Orders = () => {
    const {
        orders,
        itemsPerPage,
        setItemsPerPage,
        currentPage,
        setCurrentPage,
        startPage,
        endPage,
        totalPages,
        currentOrder,
        onOrder,
    } = useOrders();

    const [isShowOptions, setShowOptions] = useState(false);
    const dropdownAnim = useState(new Animated.Value(0))[0];

    const toggleDropdown = () => {
        if (isShowOptions) {
            Animated.timing(dropdownAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start(() => setShowOptions(false));
        } else {
            setShowOptions(true);
            Animated.timing(dropdownAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        }
    };

    const content = useMemo(() => {
        if (currentOrder) {
            return (
                <View style={styles.container}>
                    <Order order={currentOrder} onOrder={onOrder} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.orders}>
                        <Text style={styles.orders_title}>היסטורית הזמנות שלי</Text>
                    </View>

                    <View style={styles.orders_content}>
                        <FlatList
                            data={orders}
                            keyExtractor={(item) => String(item.order_number)}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <View style={styles.order_item}>
                                    <View style={styles.order_item_field}>
                                        <Text style={styles.order_item_field_name}># הזמנה: </Text>
                                        <Text style={styles.order_item_field_value}>
                                            {item.order_number}
                                        </Text>
                                    </View>
                                    <View style={styles.order_item_field}>
                                        <Text style={styles.order_item_field_name}>תאריך: </Text>
                                        <Text style={styles.order_item_field_value}>
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View style={styles.order_item_field}>
                                        <Text style={styles.order_item_field_name}>
                                            סה"כ להזמנה:{" "}
                                        </Text>
                                        <Text style={styles.order_item_field_value}>
                                            ₪ {item.grand_total}
                                        </Text>
                                    </View>
                                    <View style={styles.order_item_field}>
                                        <Text style={styles.order_item_field_name}>סטטוס: </Text>
                                        <Text style={styles.order_item_field_value}>
                                            {item.status}
                                        </Text>
                                    </View>
                                    <View style={styles.order_item_actions}>
                                        <TouchableOpacity onPress={() => onOrder(item)}>
                                            <Text style={styles.order_item_action}>הצג הזמנה</Text>
                                        </TouchableOpacity>
                                        <Text>|</Text>
                                        <TouchableOpacity onPress={() => Alert.alert("Click!")}>
                                            <Text style={styles.order_item_action}>הזמן מחדש</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={styles.orders_item}
                            scrollEnabled={false}
                            nestedScrollEnabled={false}
                        />
                    </View>

                    <View style={[styles.pagination, !orders.length && { display: "none" }]}>
                        <View style={styles.pagination_inner}>
                            <TouchableOpacity
                                style={[
                                    styles.page_button,
                                    currentPage === totalPages && styles.disabled_button,
                                ]}
                                onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <Icon
                                    name="right"
                                    size={20}
                                    color={currentPage === totalPages ? "#ccc" : "#858585"}
                                />
                            </TouchableOpacity>

                            <View style={styles.page_numbers}>
                                {Array.from(
                                    { length: endPage - startPage + 1 },
                                    (_, i) => startPage + i
                                ).map((page) => (
                                    <TouchableOpacity
                                        key={page}
                                        style={[
                                            styles.page_number,
                                            currentPage === page && styles.active_page,
                                        ]}
                                        onPress={() => setCurrentPage(page)}
                                    >
                                        <Text
                                            style={[
                                                styles.page_number_text,
                                                currentPage === page && { color: "#000" },
                                            ]}
                                        >
                                            {page}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.page_button,
                                    currentPage === 1 && styles.disabled_button,
                                ]}
                                onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <Icon
                                    name="left"
                                    size={20}
                                    color={currentPage === 1 ? "#ccc" : "#858585"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.itemsPerPageContainer, !orders.length && { display: "none" }]}>
                        <Text style={styles.itemsPerPageText}>הצגה:</Text>

                        <View style={styles.dropdownWrapper}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.itemsPerPageButtonCurrent}
                                onPress={toggleDropdown}
                            >
                                <Text style={styles.itemsPerPageButtonTextCurrent}>{itemsPerPage}</Text>
                            </TouchableOpacity>

                            {isShowOptions && (
                                <Animated.View
                                    style={[
                                        styles.dropdownAnimated,
                                        {
                                            transform: [
                                                {
                                                    translateX: dropdownAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [40, 0],
                                                    }),
                                                },
                                            ],
                                            opacity: dropdownAnim,
                                        },
                                    ]}
                                >
                                    {[5, 10, 20, 50].map((num) => (
                                        <TouchableOpacity
                                            key={num}
                                            style={[
                                                styles.dropdownItem,
                                                itemsPerPage === num && styles.activeDropdownItem,
                                            ]}
                                            onPress={() => {
                                                setItemsPerPage(num);
                                                setCurrentPage(1);
                                                toggleDropdown();
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{num}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </Animated.View>
                            )}
                        </View>
                    </View>
                </View>
            );
        }
    }, [currentOrder, orders, startPage, endPage, isShowOptions]);

    return <>{content}</>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f2ed",
        minHeight: height,
    },
    orders: {
        padding: 25,
    },
    orders_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
    orders_content: {
        backgroundColor: "#fff",
        marginLeft: 25,
        marginRight: 25,
    },
    order_item: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14,
    },
    order_item_field: {
        flexDirection: "row",
        alignItems: "center",
        direction: "rtl",
        gap: 6,
    },
    order_item_field_name: {
        fontSize: 14,
        fontWeight: "700",
        fontFamily: "Heebo",
    },
    order_item_field_value: {
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Heebo",
    },
    order_item_actions: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "flex-start",
        gap: 10,
    },
    order_item_action: {
        color: "#589bc6",
        fontFamily: "Heebo",
        fontSize: 16,
        fontWeight: "600",
    },
    pagination: {
        width: width,
        marginVertical: 20,
        paddingHorizontal: 25,
    },
    pagination_inner: {
        direction: "rtl",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    page_button: {
        padding: 10,
        backgroundColor: "#e7e7e7",
        borderRadius: 4,
    },
    page_numbers: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 3,
    },
    page_number: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    active_page: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#858585",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    page_number_text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    itemsPerPageContainer: {
        flexDirection: "row",
        direction: "rtl",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 25,
        marginTop: 20,
        marginBottom: 40,
        gap: 16,
    },
    itemsPerPageText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    itemsPerPageButtonCurrent: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#858585",
        height: 40,
        width: 40,
    },
    dropdownWrapper: {
        position: "relative",
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    dropdownAnimated: {
        position: "absolute",
        right: 50,
        top: 0,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 3,
        zIndex: 999,
        // elevation: 6,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        minWidth: 40,
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },
    activeDropdownItem: {
        backgroundColor: "#e5e5e5",
        borderRadius: 4,
    },
});

export default Orders;