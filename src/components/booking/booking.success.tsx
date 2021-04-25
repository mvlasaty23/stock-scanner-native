import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

interface BookingProps {
  productGroup: string;
  amount: number;
  uom: string;
}
export function BookingSuccess(props: BookingProps) {
  const redirectInSec = 2;
  useEffect(() => {
    const timerId = setTimeout(() => Actions.bookingChooser(), redirectInSec * 1000);
    return () => clearTimeout(timerId);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Booked {props.amount}{props.uom} {props.productGroup}
      </Text>
      <Text>Redirecting in {redirectInSec} seconds...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
  },
});
