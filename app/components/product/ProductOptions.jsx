import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";

const ProductOptions = ({ configurableOptions, selectedValue, onValueChange }) => {
  return (
      <View style={styles.product_options}>
        {configurableOptions.map((option) => {
          const items = option.values.map((value, index) => ({
            key: `${option.attribute_code}_${value.value_index}`, // Добавлен уникальный key
            label: value.label,
            value: String(value.value_index),
          }));

          return (
              <View key={option.attribute_code} style={styles.dropdown_container}>
                <Text style={styles.label}>{option.label} <Text style={styles.label_required}>*</Text></Text>
                <ModalSelector
                    data={items}
                    initValue={`בחרו ${option.label}`}
                    onChange={(option) => onValueChange(option.attribute_code, option.value)}
                    style={styles.modal}
                />
              </View>
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
  },
  label_required: {
    color: "#e02b27",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1c1c1c",
    padding: 10,
  },
});

export default ProductOptions;
