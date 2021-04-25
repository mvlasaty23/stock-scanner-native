import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

export function ManualBooking() {
  const [productGroup, setProductGroup] = useState('');
  const [productGroupSuggestions, setProductGroupSuggestions] = useState<string[]>([]);
  const productGroups = ['Milk', 'Milo', 'Mila', 'Mile', 'Flour'];
  const findProductGroup = (query: string) => {
    setProductGroup(query);
    if (query.length > 2) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setProductGroupSuggestions(productGroups.filter((group) => group.search(regex) >= 0));
    } else {
      setProductGroupSuggestions([]);
    }
  };

  const [amount, setAmount] = useState('');
  const [uom, setUom] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.title}>Manual Booking</Text>
      <View style={styles.containerRow}>
        <TextInput
          label="Product"
          style={styles.fullWidthInput}
          autoCompleteType="off"
          mode="outlined"
          multiline={false}
          defaultValue={productGroup}
          value={productGroup}
          onChangeText={setProductGroup}
        />
      </View>
      <View style={styles.containerRow}>
        <TextInput
          autoCompleteType="off"
          mode="outlined"
          style={styles.inputAmount}
          onChangeText={setAmount}
          value={amount}
          label="Amount"
          multiline={false}
        />
        <TextInput
          autoCompleteType="off"
          mode="outlined"
          style={styles.inputUom}
          onChangeText={setUom}
          value={uom}
          label="UOM"
          multiline={false}
        />
      </View>
      <View style={styles.container}>
        <Button mode="contained" onPress={() => Actions.bookingSuccess({productGroup, amount, uom})} style={styles.button}>
          Send
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidthInput: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
  },
  inputAmount: {
    flex: 1,
    minWidth: '75%',
    paddingRight: 5,
  },
  inputUom: {
    flex: 1,
    minWidth: '25%',
    paddingLeft: 5,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
