import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { bookManually$ } from '../../service/booking.service';

interface ManualBookingProps {
  barcode?: string;
}

export function ManualBooking(props: ManualBookingProps) {
  const [productGroup, setProductGroup] = useState('');
  const [productGroupError, setProductGroupError] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [uom, setUom] = useState('');
  const [uomError, setUomError] = useState(false);

  function inputsHaveErrors(amountAsNum: number) {
    let hasErrors = false;
    if (!productGroup) {
      setProductGroupError(true);
      hasErrors = true;
    } else {
      setProductGroupError(false);
    }
    if (Number.isNaN(amountAsNum)) {
      setAmountError(true);
      hasErrors = true;
    } else {
      setAmountError(false);
    }
    if (!uom) {
      setUomError(true);
      hasErrors = true;
    } else {
      setUomError(false);
    }
    return hasErrors;
  }

  function onSend() {
    const amountAsNum = Number.parseFloat(amount.replace(',', '.'));
    if (inputsHaveErrors(amountAsNum)) {
      return;
    }
    bookManually$(productGroup, amountAsNum, uom, props.barcode).subscribe(
      ({ productGroup, amount, uom }) => Actions.bookingSuccess({ productGroup, amount, uom }),
      (error) => Alert.alert(`Unexpected error occured: ${error}`)
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.title}>Manual Booking</Text>
      {!!props.barcode && <Text>{props.barcode}</Text>}
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
          error={productGroupError}
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
          error={amountError}
        />
        <TextInput
          autoCompleteType="off"
          mode="outlined"
          style={styles.inputUom}
          onChangeText={setUom}
          value={uom}
          label="UOM"
          multiline={false}
          error={uomError}
        />
      </View>
      <View style={styles.container}>
        <Button mode="contained" onPress={onSend} style={styles.button}>
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
