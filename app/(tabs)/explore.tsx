import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Course } from '@/types/types'
import axios from 'axios'
import { username, password } from '@/utils/apikey'
import { useQuery } from '@tanstack/react-query'
import CourseItem from '@/components/CourseItem'

interface SearchResponse {
  result: Course
}

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

const explore = () => {
  const [searchTerm, setSerachTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading, refetch } = useQuery(
    {
      queryKey: ['searchCourses', searchQuery],
      queryFn: () => fetchCourses(searchQuery),
      enabled: true
    }
  )
  const handleSearch = () => {
    setSearchQuery(searchTerm)
    refetch()
  }
  return (
    <View className='flex-1 py-12 bg-white'>
      <View className={'p-4 '}>
        <View className='flex-row mb-4 w-full border-2 border-neutral-400 rounded-2xl overflow-hidden bg-white' >
        <TextInput className='p-2 w-3/4' placeholder='Search for courses '
          placeholderTextColor="grey" value={searchTerm} onChangeText={setSerachTerm} />
        <Pressable className='bg-[#FF1E00] w-1/4 p-4 justify-center items-center' onPress={handleSearch}>
          <Text className='text-white'
            style={{ fontFamily: "BarlowBold" }}
          >Search</Text>
        </Pressable>
        </View>
      </View>
      {
            isLoading ? (
              <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size="large" color="#FF1E00" />
              </View>
            ) : error ? (
              <Text>Error:{(error as Error).message}</Text>
            ) : data?.results ?
              (
                <FlatList  data={data.results}
                  renderItem={({ item, index }) => (
                    <CourseItem course={item} customStyle="w-[22rem] p-5" index={index} />
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
  )
}

export default explore

const styles = StyleSheet.create({})