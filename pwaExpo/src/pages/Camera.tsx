import React, { useState, useEffect } from 'react';
import { Camera as ExpoCamera } from 'expo-camera';
import { View, Text, TouchableOpacity } from 'react-native';

const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
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
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type}>
      <View
          style={{
            flex: 1,
            backgroundColor: '#transparent',
            flexDirection: 'row',
            height: 100
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === ExpoCamera.Constants.Type.back
                  ? ExpoCamera.Constants.Type.front
                  : ExpoCamera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#FFF' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>
    </View>
  );
}

export default Camera;