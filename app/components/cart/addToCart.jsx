import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
const TEXT_BUTTON = {
  pending: 'הוספה לסל',
  addition: 'מוסיף...',
  added: 'הוסף'
}

const AddToCart = ({onPress, disabled, stateAddToCartButton}) => {

  return (
    <TouchableOpacity activeOpacity={0.5} disabled={disabled} style={[styles.button, disabled && styles.buttonDisabled]} onPress={onPress}>
      <Text style={styles.buttonText}>{TEXT_BUTTON[stateAddToCartButton]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c9192e",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddToCart;