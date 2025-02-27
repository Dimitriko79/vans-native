import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

const SizeChart = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const sizeData = [
    { label: "מידה", values: ["34.5", "35", "36", "36.5", "37", "38", "38.5", "39", "40", "40.5", "41"] },
    { label: "אורך הרגל בס\"מ", values: ["21.5", "22", "22.5", "23", "23.5", "24", "24.5", "25", "25.5", "26", "26.5"] },
    { label: "מידה", values: ["42", "42.5", "43", "44", "44.5", "45", "46", "47", "48", "49", "50"] },
    { label: "אורך הרגל בס\"מ", values: ["27", "27.5", "28", "28.5", "29", "29.5", "30", "31", "32", "33", "34"] },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.linkText}>מדריך מידות</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            {/* Table Content */}
            <ScrollView horizontal={true}>
              <View>
                  <Text style={styles.title}>נעלי יוניסקס</Text>
                     <View style={styles.tableContainer}>
                       {sizeData.map((row, rowIndex) => (
                         <View key={rowIndex} style={styles.row}>
                           <Text style={styles.cellHeader}>{row.label}</Text>
                           {row.values.map((value, colIndex) => (
                             <Text key={colIndex} style={styles.cell}>{value}</Text>
                           ))}
                         </View>
                       ))}
                     </View>
                 </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#589bc6',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingRight: 5,
    textAlign: "right"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cellHeader: {
    fontWeight: "bold",
    padding: 10,
    width: 80,
    textAlign: "center",
    backgroundColor: "#f1f1f1",
  },
  cell: {
    padding: 10,
    width: 50,
    textAlign: "center",
  },
});

export default SizeChart;
