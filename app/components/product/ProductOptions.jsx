import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

const ProductOptions = ({ configurableOptions, selectedValue, onValueChange }) => {
  return (
    <View style={styles.product_options}>
      {configurableOptions.map((option) => (
        <View key={option.attribute_code} style={styles.picker_container}>
          <Text style={styles.label}>{option.label}<Text style={styles.label_required}> *</Text></Text>
            <View style={styles.wrap_picker}>
                <Picker
                    selectedValue={selectedValue[option.attribute_code] || ""}
                    onValueChange={(value) => onValueChange(option.attribute_code, value)}
                    style={styles.picker}
                  >
                        <Picker.Item label={`בחרו ${option.label}`} value="" />
                        {option.values.map((value) => (
                          <Picker.Item key={value.value_index} label={value.label} value={value.value_index} />
                        ))}
                  </Picker>
            </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  picker_container: {
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
  wrap_picker: {
    borderWidth: 1,
    borderColor: '#1c1c1c',
    width: width - 20,
  },
  picker: {
    height: 50,
    width: width - 22,
    backgroundColor: "#ffffff",
  },
});

export default ProductOptions;
