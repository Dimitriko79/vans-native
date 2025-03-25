import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Animated, Easing } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

const ProductOptions = ({
                          configurableOptions = [],
                          handleSelectionChange = () => {},
                          setShowError = () => {},
                          product = { variants: [] },
                        }) => {
  const { variants } = product;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    if (!isOpen) {
      setIsOpen(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    }
  };

  const getStockStatusOfOption = (pattern) => {
    if (!variants || !variants.length) return 'OUT_OF_STOCK';

    const variant = variants.find(variant =>
        variant.attributes.some(attribute => attribute.value_index === pattern)
    );

    return variant ? variant.product.stock_status : 'OUT_OF_STOCK';
  };

  return (
      <View style={styles.product_options}>
        {configurableOptions.map((option) => {
          const items = option.values
              .map((value) => ({
                key: `${option.attribute_code}_${value.value_index}`,
                label: value.label,
                value: String(value.value_index),
                attribute_code: option.attribute_code,
                attribute_id: option.attribute_id,
                stock_status: getStockStatusOfOption(value.value_index),
              }))
              .filter(item => item.stock_status !== 'OUT_OF_STOCK');

          return items.length ? (
              <View key={option.attribute_code} style={styles.dropdown_container}>
                <Text style={styles.label}>
                  {option.label} <Text style={styles.label_required}>*</Text>
                </Text>
                <View style={styles.options}>
                  <TouchableOpacity activeOpacity={1} style={styles.options_trigger} onPress={toggleDropdown}>
                    <Text style={[styles.options_trigger_text]}>
                      {selectedOptions[option.attribute_id] || `בחרו ${option.label}`}
                    </Text>
                    <Icon name={isOpen ? "up" : "down"} color="#000" size={16}/>
                  </TouchableOpacity>
                  {isOpen && (
                      <Animated.View style={[styles.options_container, { opacity: fadeAnim }]}>
                        <ScrollView>
                          {items.map((option, index) => (
                              <TouchableOpacity
                                  key={index}
                                  activeOpacity={1}
                                  onPress={() => {
                                    toggleDropdown();
                                    handleSelectionChange(option.attribute_id, option.value);
                                    setSelectedOptions((prev) => ({
                                      ...prev,
                                      [option.attribute_id]: option.label,
                                    }));
                                    setShowError(false);
                                  }}
                                  style={styles.options_item}
                              >
                                <Text style={styles.options_item_text}>{option.label}</Text>
                              </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </Animated.View>
                  )}
                </View>
                {/*<ModalSelector*/}
                {/*    data={items}*/}
                {/*    initValue={selectedOptions[option.attribute_id] || `בחרו ${option.label}`}*/}
                {/*    onChange={(selectedOption) => {*/}
                {/*      handleSelectionChange(selectedOption.attribute_id, selectedOption.value);*/}
                {/*      setSelectedOptions((prev) => ({*/}
                {/*        ...prev,*/}
                {/*        [selectedOption.attribute_id]: selectedOption.label,*/}
                {/*      }));*/}
                {/*      setShowError(false);*/}
                {/*    }}*/}
                {/*    overlayStyle={styles.overlay}*/}
                {/*    style={styles.modal}*/}
                {/*    contentContainerStyle={styles.modal_container}*/}
                {/*/>*/}
              </View>
          ) : (
              <Text style={{textAlign: 'right', marginBottom: 10, fontSize: 16, fontWeight: '700'}}>אזל מהמלאי</Text>
          );
        })}
      </View>
  );
};

const styles = StyleSheet.create({
  dropdown_container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
  },
  label_required: {
    color: "#e02b27",
  },
  options: {
    position: "relative",
    marginTop: 10
  },
  options_trigger: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
    direction: 'rtl'
  },
  options_trigger_text: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Heebo",
  },
  options_container: {
    position: "absolute",
    top: 45,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    maxHeight: 400,
    zIndex: 1,
  },
  options_item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  options_item_text: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Heebo",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1c1c1c",
    padding: 10,
  },
  overlay: {
    flex: 1,
    padding: '5%',
    paddingTop: '15%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modal_label: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
  },
});

export default ProductOptions;
