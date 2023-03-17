import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageResizeMode, ActivityIndicator } from 'react-native';
import { getGameImg } from '../utils/const';
import { Text } from 'react-native-paper';

interface IImageHandle {
  src: string;
  size: string;
  resizeMode: ImageResizeMode;
}
const ImageHandle: React.FC<IImageHandle> = ({ src, size, resizeMode }: IImageHandle) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      const url = getGameImg(src);
      console.log(url);
      const res = await fetch(url);
      console.log(res.status);
      if (res.status === 404) {
        setImageError(true);
      } else {
        setImageUrl(url);
      }
    };
    fetchImage();
  }, [src]);

  if (imageError) {
    return (
      <View style={styles.center}>
        <Text>Image not found</Text>
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Image
      style={[size === 'small' ? styles.smallImg : styles.largeImg]}
      resizeMode={resizeMode}
      source={{
        uri: imageUrl,
      }}
    />
  );
};

const styles = StyleSheet.create({
  smallImg: {
    width: '100%',
    height: 150,
  },
  largeImg: {
    width: '100%',
    height: 150,
  },
  center: {
    height: 150,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageHandle;
