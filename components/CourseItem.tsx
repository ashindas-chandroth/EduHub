import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useWishListStore } from '@/store/WishListStore'
import { Course } from '@/types/types'
import { Route, router } from 'expo-router'

interface CourseItemParams {
    course: any,
    customStyle?: string,
    index: number
}
const CourseItem = ({ course, customStyle, index }: { course: Course, customStyle?: string, index: number }) => {
    const { addToWishList, removeWishList, InWishList } = useWishListStore();
    let deviceWidth = Dimensions.get('window').width
    const isWishListed = InWishList(course.id);
    const toggleWishList = (course: Course) => {
        if (isWishListed) {
            removeWishList(course.id);
        }
        else {
            addToWishList(course);
        }
    }
    return (
        <Pressable onPress={() =>

            // router.push({
            // pathname:'/explore',
            // params:{courseId:course.id}
            router.push({
                pathname: '/coursedetail',
                params: { courseId: course.id },
            })


        } style={{ width: deviceWidth}} className={'pt-4' + (customStyle ? customStyle : "")}>
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
                        <Pressable onPress={() => toggleWishList(course)}>
                            <Ionicons size={24} name={isWishListed ? "heart" : "heart-outline"} color={isWishListed ? 'red' : 'grey'} />
                        </Pressable>
                    </View>
                </View>

            </Animated.View>
        </Pressable>

    )
}

export default CourseItem

const styles = StyleSheet.create({})