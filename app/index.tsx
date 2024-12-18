import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Button from '@/components/Button'
import { router, Router } from 'expo-router'
import LottieView from 'lottie-react-native';

const Welcome = () => {
    const animation = useRef<LottieView>(null);
    return (
        <View className='bg-white flex-1 justify-center items-center p-4'>
            <Animated.View className='w-full' entering={FadeInDown.duration(300).delay(200).springify()}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: "100%",
                        height: 400,
                    }}
                    source={require('../assets/book.json')}
                />
            </Animated.View>
            <Animated.View className='w-full' entering={FadeInDown.duration(300).delay(200).springify()}>
                <Text
                    className='text-5xl text-center leading-[3.5rem]'
                    style={{ fontFamily: "BarlowExtraBold" }}>
                    Discover and improve your skills
                </Text>
            </Animated.View>
            <Animated.View className='w-full mt-4' entering={FadeInDown.duration(300).delay(400).springify()}>
                <Text
                    className='text-xl text-center leading-[2rem]'
                    style={{ fontFamily: "BarlowSemiBold" }}>
                    Learn from the best courses & tutorials. 🚀
                </Text>
            </Animated.View>
            <Animated.View className='w-full mt-8 items-center' entering={FadeInDown.duration(300).delay(600).springify()}>
                <Button title='Get Started' action={() => router.push("/(tabs)")} />
            </Animated.View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})
