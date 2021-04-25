import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export function BookingSuccess() {
  useEffect(() => {
    const timerId = setTimeout(() => Actions.bookingChooser(), 2000);
    return () => clearTimeout(timerId);
  });
  return(
    <View>
      <Text>Booking success</Text>
      <Text>Redirecting in 3 seconds</Text>
    </View>
  );
}