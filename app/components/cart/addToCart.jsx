import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TEXT_BUTTON = {
  pending: 'הוספה לסל',
  addition: 'מוסיף...',
  added: 'הוסף'
};

const AddToCart = ({
                     onPress = () => {},
                     disabled = false,
                     stateAddToCartButton = 'pending'
                   }) => {
  return (
      <TouchableOpacity
          activeOpacity={0.7}
          disabled={disabled}
          style={styles.button}
          onPress={onPress}
      >
        <Text style={styles.buttonText}>
          {TEXT_BUTTON[stateAddToCartButton] || TEXT_BUTTON.pending}
        </Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddToCart;
