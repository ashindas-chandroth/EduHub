import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { HelloWave } from '@/components/HelloWave';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import axios from 'axios'
import { password, username } from '@/utils/apikey';
import { useQuery } from '@tanstack/react-query';
import CourseItem from '@/components/CourseItem';
import { Course } from '@/types/types';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface SearchResponse {
  results: Course[]
}



const categories: Category[] = [
  { id: "bussiness", name: "Bussiness", icon: "briefcase" },
  { id: "tech", name: "Tech", icon: "hardware-chip" },
  { id: "design", name: "Design", icon: "color-palette" },
  { id: "marketing", name: "Marketing", icon: "megaphone" },
  { id: "health", name: "Health", icon: "fitness" },
  { id: "lifestyle", name: "Lifestyle", icon: "heart" },

];

const fetchCourses = async (searchTerm: string): Promise<SearchResponse> => {
  const response = await axios.get('https://www.udemy.com/api-2.0/courses/', {
    params: { search: searchTerm },
    auth: {
      username: username,
      password: password
    }
  })
  return response.data
}
const fetchRecomendedCourses = async (): Promise<SearchResponse> => {
  const response = await axios.get('https://www.udemy.com/api-2.0/courses/', {
    params: {search:"bussiness"},
    auth: {
      username: username,
      password: password
    }
  })
  console.log("recomended",response.data)
  return response.data
}

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("bussiness");
  const [iconColor, setIconColor] = useState('#9ca3af')
  const { data, error, isLoading, refetch } = useQuery(
    {
      queryKey: ['searchCourses', selectedCategory],
      queryFn: () => fetchCourses(selectedCategory),
      enabled: true
    }
  )
  const { data: recomendedCourses, error: recomendedCoursesError, isLoading: recomendedCoursesLoading } = useQuery(
    {
      queryKey: ['recomendedCourses'],
      queryFn: () => fetchRecomendedCourses(),
      enabled: true
    }
  )
  //console.log(data?.results)
  //Render Category
  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedCategory(item.id)

        }}
        className='mr-4 p-2 rounded-full items-center flex-col gap-2'
      >
        <View className={`p-4 rounded-full flex-row items-center ${selectedCategory === item.id ? "border-2 border-[#FF1E00]" : "border border-gray-400"}`}>
          <Ionicons name={item.icon as any} size={24} color={selectedCategory === item.id ? '#FF1E00' : '#9ca3af'} />
        </View>
        <Text style={{ color: selectedCategory === item.id ? '#FF1E00' : '#9ca3af', fontFamily: selectedCategory === item.id ? 'BarlowBold' : 'BarlowMedium' }}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View className='flex-1 bg-white'>
      <View className='bg-[#FF1E00] pt-16 pb-6 px-6'>
        <Animated.View className='flex-row items-center justify-between'>
          <View>
            <View className='flex-row items-end gap-2'>
              <Text className='text-white text-lg' style={{ fontFamily: "BarlowMedium" }}>Good Morning</Text>
              <HelloWave />
            </View>
            <Text className='text-white text-2xl' style={{ fontFamily: "BarlowBold" }}>
              Marrison Kalao
            </Text>
          </View>
          <MaterialCommunityIcons name='bell-badge-outline' size={30} color="white" />
        </Animated.View>

        <Pressable onPress={() => router.push("/explore")}>
          <View className='flex-row items-center bg-white/20 rounded-2xl p-4 mt-4'>
            <MaterialCommunityIcons name='magnify' size={20} color="white" />
            <Text className='text-white ml-2' style={{ fontFamily: "BarlowMedium" }}>
              What you want to learn?
            </Text>
          </View>
        </Pressable>
      </View>

      <ScrollView className='flex-1 bg-white' contentContainerStyle={{ flexGrow: 1 }}>
        <Animated.View className="gap-6" entering={FadeInDown.duration(500).delay(200).springify()}>
          <View className='flex-row justify-between px-6 pt-4 items-center'>
            <Text className='text-xl' style={{ fontFamily: "BarlowBold" }}>Explore Topics</Text>
            <Text className='text-[#FF1E00]' style={{ fontFamily: "BarlowSemiBold" }}>See more</Text>
          </View>
          {/* Categories List*/}
          <ScrollView
            horizontal
            className='mb-4 pl-4'
            showsHorizontalScrollIndicator={false}
          >
            {
              categories.map((category) => (
                <View key={category.id}>
                  {renderCategory({ item: category })}
                </View>
              ))
            }
          </ScrollView>


        </Animated.View>
        <View>
          {
            isLoading ? (
              <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size="large" color="#FF1E00" />
              </View>
            ) : error ? (
              <Text>Error:{(error as Error).message}</Text>
            ) : data?.results ?
              (
                <FlatList horizontal={true} data={data.results}
                  renderItem={({ item, index }) => (
                    <CourseItem course={item} customStyle="w-[22rem] pl-6" index={index} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false} />
              )
              :
              (
                <View className='flex-1 justify-center item-center'>
                  <Text>No results, try searching for different course</Text>
                </View>
              )
          }
        </View>

        {/*Recommended courses */}
        <View className='pt-6'>
          <View className='flex-row justify-between px-6 pt-4 items-center'>
            <Text className='text-xl' style={{ fontFamily: "BarlowBold" }}>Recommended Courses</Text>
            <Text className='text-[#FF1E00]' style={{ fontFamily: "BarlowSemiBold" }}>See more</Text>
          </View>
        </View>
        <View>
          {
            recomendedCoursesLoading ? (
              <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size="large" color="#FF1E00" />
              </View>
            ) : recomendedCoursesError ? (
              <Text>Error:{(recomendedCoursesError as Error).message}</Text>
            ) : recomendedCourses?.results ?
              (
                <FlatList horizontal={true} data={recomendedCourses?.results}
                  renderItem={({ item, index }) => (
                    <CourseItem course={item} customStyle="w-[22rem] pl-6" index={index} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false} />
              )
              :
              (
                <View className='flex-1 justify-center item-center'>
                  <Text>No results, try searching for different course</Text>
                </View>
              )
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
