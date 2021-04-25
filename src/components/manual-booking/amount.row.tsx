import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export function AmountRow() {
  const [amount, setAmount] = useState('');
  const [uom, setUom] = useState('');

  return (
    <View style={styles.containerRow}>
      <TextInput
        autoCompleteType="off"
        mode="outlined"
        style={styles.inputAmount}
        onChangeText={setAmount}
        value={amount}
        label="Amount"
        multiline={false}
      ></TextInput>
      <TextInput
        autoCompleteType="off"
        mode="outlined"
        style={styles.inputUom}
        onChangeText={setUom}
        value={uom}
        label="UOM"
        multiline={false}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputAmount: {
    minWidth: '70%',
    margin: 12,
  },
  inputUom: {
    minWidth: '25%',
    margin: 12,
  },
});
