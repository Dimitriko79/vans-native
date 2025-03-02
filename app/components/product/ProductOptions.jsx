import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";

const ProductOptions = ({ configurableOptions, handleSelectionChange, setShowError, product }) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const { variants } = product;

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

          return items.length > 0 ? (
              <View key={option.attribute_code} style={styles.dropdown_container}>
                <Text style={styles.label}>{option.label} <Text style={styles.label_required}>*</Text></Text>
                <ModalSelector
                    data={items}
                    initValue={`בחרו ${option.label}`}
                    onChange={(option) => {
                      handleSelectionChange(option.attribute_id, option.value);
                      setSelectedAttribute(option.label);
                      setShowError(false);
                    }}
                    style={styles.modal}
                    contentContainerStyle={styles.modal_container}
                >
                  {selectedAttribute && (
                      <View>
                        <Text style={styles.modal_label}>{selectedAttribute}</Text>
                      </View>
                  )}
                </ModalSelector>
              </View>
          ) : null;
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
    textAlign: "right"
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
  modal_label: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5
  }
});

export default ProductOptions;