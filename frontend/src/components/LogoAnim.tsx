import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const LogoAnim = () => {
    const animation = useRef(null);
    useEffect(() => {
        animation.current?.play()
    }, []);

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                loop={false}
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#eee',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/ludu_logo_anim.json')}
            />
            {/* <View style={styles.buttonContainer}>
                <Button
                    title="Restart Animation"
                    onPress={() => {
                        animation.current?.reset();
                        animation.current?.play();
                    }}
                />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

export default LogoAnim;