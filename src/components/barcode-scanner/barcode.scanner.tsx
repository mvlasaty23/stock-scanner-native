import { BarCodeScanningResult, Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

export default function BarcodeScanner() {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [barcode, setBarcode] = useState('');
  const [barcodeType, setBarcodeType] = useState('');

  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const onBarCodeRead = (e: BarCodeScanningResult) => {
    cameraRef.current?.pausePreview();
    setBarcode(e.data);
    setBarcodeType(e.type);
    showModal();
  };
  const onDismiss = () => {
    setVisible(false);
    cameraRef.current?.resumePreview();
  }
  const onSend = () => {
    setVisible(false);
    Actions.bookingSuccess({barcodeType, barcode});
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Portal>
        {/* TODO: Overthink this modal, does it really need another click? */}
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text>{barcodeType}: {barcode}</Text>
          <View style={styles.modalButtonBar}>
            <Button mode="contained" style={styles.button} onPress={onDismiss}>Dissmiss</Button>
            <Button mode="contained" style={styles.button} onPress={onSend} >Send</Button>
          </View>
        </Modal>
      </Portal>
      <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} onBarCodeScanned={onBarCodeRead} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 20,
  },
  modalButtonBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
