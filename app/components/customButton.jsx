import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";

const CustomButton = ({
                        title = "Click",
                        handlePress = () => {},
                        containerStyles = {},
                        textStyles = {},
                        isLoading = false,
                      }) => {
  const onPress = useCallback(() => {
    if (!isLoading) handlePress();
  }, [handlePress, isLoading]);

  const buttonContent = useMemo(() => (
      <>
        <Text style={[baseStyles.text, textStyles]}>{title}</Text>
        {isLoading && (
            <ActivityIndicator animating={isLoading} color="#fff" size="small" style={{ marginLeft: 8 }} />
        )}
      </>
  ), [title, textStyles, isLoading]);

  return (
      <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[baseStyles.container, containerStyles]}
          disabled={isLoading}
      >
        {buttonContent}
      </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default CustomButton;
