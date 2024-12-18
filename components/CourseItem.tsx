import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Course } from '@/app/(tabs)'

interface CourseItemParams {
    course: any,
    customStyle?: string,
    index: number
}
const CourseItem = ({ course, customStyle, index }: { course: Course, customStyle?: string, index: number }) => {
    return (
        <Pressable className={'pt-4' + (customStyle ? customStyle : "")}>
            <Animated.View className="gap-2 w-full border border-gray-300 overflow-hidden rounded-2xl"
                entering={FadeInDown.duration(200).delay(index * 300).springify()}>
                <Image source={{ uri: course.image_480x270 }}
                    className='w-full h-40' />
                <View className='px-4 p-2'>
                    <Text className='text-red-600' style={{ fontFamily: "BarlowBold" }}>{course.title}</Text>
                    <View className='flex-row items-center pt-2 pb-4 justify-between'>
                        <Text>
                            {
                                course.is_paid ? `${course.price}` : "Free"
                            }
                        </Text>
                    </View>
                </View>

            </Animated.View>
        </Pressable>

    )
}

export default CourseItem

const styles = StyleSheet.create({})