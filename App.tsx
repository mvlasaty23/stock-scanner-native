import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Router, Scene, Stack } from 'react-native-router-flux';
import BarcodeScanner from './src/components/barcode-scanner/barcode.scanner';
import { BookingChooser } from './src/components/booking-chooser/booking.chooser';
import { BookingSuccess } from './src/components/booking/booking.success';
import { ManualBooking } from './src/components/manual-booking/manual.booking';

const theme = {
  ...DefaultTheme
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Router>
        <Stack key="root">
          <Scene key="bookingChooser" initial={true} component={BookingChooser} title="Booking Method" />
          <Scene key="barcodeScanner" component={BarcodeScanner} title="Barcode Scanner" />
          <Scene key="manualBooking" component={ManualBooking} title="Manual Booking" />
          <Scene key="bookingSuccess" component={BookingSuccess} title="Booked" />
        </Stack>
      </Router>
    </PaperProvider>
  );
}
