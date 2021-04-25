import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

export function BookingChooser() {
  const goToBarcodeScanner = () => Actions.barcodeScanner();
  const goToManualBooking = () => Actions.manualBooking();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Choose booking method</Text>
      </View>
      <View style={styles.containerRow}>
        <Button mode="contained" onPress={goToBarcodeScanner} style={styles.button}>
          Scan
        </Button>
        <Button mode="contained" onPress={goToManualBooking} style={styles.button}>
          Manual
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
