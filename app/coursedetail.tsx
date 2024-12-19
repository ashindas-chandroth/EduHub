import { StyleSheet, Text, View, Image, Pressable, ListRenderItem, FlatList } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { Course, CurriculumItem, ReviewItem } from '@/types/types'
import { password, username } from '@/utils/apikey'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Ionicons } from '@expo/vector-icons'
import CurriculumList from '@/components/CurriculumList'
import { ActivityIndicator } from 'react-native'

const fetchCourseDetails = async (courseId: string): Promise<Course> => {
    const response = await axios.get<Course>(`https://www.udemy.com/api-2.0/courses/${courseId}`, {

        auth: {
            username: username,
            password: password
        }
    })
    return response.data
}
const fetchCourseCurriculum = async (courseId: string, page: number = 1): Promise<CurriculumItem> => {
    const response = await axios.get<CurriculumItem>(`https://www.udemy.com/api-2.0/courses/${courseId}/public-curriculum-items/?page=${page}`, {

        auth: {
            username: username,
            password: password
        }
    })
    return response.data
}
const fetchCourseReviews = async (courseId: string, page: number = 1): Promise<Course> => {
    const response = await axios.get<Course>(`https://www.udemy.com/api-2.0/courses/${courseId}/reviews`, {

        auth: {
            username: username,
            password: password
        }
    })
    return response.data
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                    key={star}
                    name={star <= rating ? "star" : "star-outline"}
                    size={16}
                    color={star <= rating ? "red" : "grey"}
                />
            ))}
        </View>
    );
};
const Coursedetail = () => {
    const { courseId } = useLocalSearchParams<{ courseId: string }>()
    const [selectedSegment, setSelectedSegment] = useState<"reviews" | "curiculum">("curiculum")
    const [curriculumPage, setCurriculumPage] = useState(1);
    const queryClient = useQueryClient();
    //CourseDetail
    const { data, error, isLoading, refetch } = useQuery<Course>(
        {
            queryKey: ['courseId', courseId],
            queryFn: () => fetchCourseDetails(courseId),
            enabled: true
        }
    )

    const loadMoreCurriculum=()=>{
        if(curriculumData?.next)
        {
            setCurriculumPage((prev)=>prev+1)
        }
    }

    

    //Curriculum
    const { data: curriculumData, error: curriculumError, isLoading: curriculumIsLoading, isRefetching: curriculumFetching } = useQuery<CurriculumItem>(
        {
            queryKey: ['coursecurriculum', courseId, curriculumPage],
            queryFn: () => fetchCourseCurriculum(courseId || "", curriculumPage),
            enabled: !!courseId,
            keepPreviousData: true
        }
    )
    //Reviews
    const { data: reviewsData, error: reviewsError, isLoading: reviewIsLoading } = useQuery(
        {
            queryKey: ['courseReviews', courseId, curriculumPage],
            queryFn: () => fetchCourseReviews(courseId || ""),
            enabled: !!courseId,
        }
    )
    const SegementedControl: React.FC<{
        selectedSegment: "curiculum" | "reviews";
        onSegmentChange: (segment: "curiculum" | "reviews") => void
    }> = ({ selectedSegment, onSegmentChange }) => (
        <View className='mb-4 flex-row bg-gray-200 rounded-lg p-1 mt-6'>
            <Pressable
                onPress={() => onSegmentChange("curiculum")}
                className={`flex-1 py-3 rounded-md ${selectedSegment === "curiculum" ? "bg-blue-700" : "bg-transparent"}`}>
                <Text className={`text-center ${selectedSegment === "curiculum" ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: selectedSegment === 'curiculum' ? "BarlowBold" : "BarlowMedium" }}>Curiculum</Text>
            </Pressable>
            <Pressable
                onPress={() => onSegmentChange("reviews")}
                className={`flex-1 py-3 rounded-md ${selectedSegment === "reviews" ? "bg-blue-700" : "bg-transparent"}`}>
                <Text className={`text-center ${selectedSegment === "reviews" ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: selectedSegment === 'reviews' ? "BarlowBold" : "BarlowMedium" }}>Reviews</Text>
            </Pressable>
        </View>
    )
    
    const mergedCuriculumData = React.useMemo(() => {
        if (!curriculumData) return undefined;
        const prevData = queryClient.getQueryData<typeof curriculumData>
            (
                [
                    "courseCurriculum",
                    courseId,
                    curriculumPage - 1
                ]
            )
        return {
            ...curriculumData,
            results: [...(prevData?.results || []), ...curriculumData.results]
        }
    }, [curriculumData, courseId, queryClient, curriculumPage]);

    // if (isLoading || (curriculumIsLoading || curriculumPage == 1)) {
    //     return (
    //         <View  className='flex-1 justify-center'>
    //             <ActivityIndicator color={"red"} size="large" />
    //         </View>
    //     )
    // }
    // if (error || curriculumError) {
    //     return (
    //         <View className='flex-1 justify-center items-center'>
    //             <Text>Error :{((error || curriculumError)as Error).message}</Text>
    //         </View>
    //     )
    // }
    // if (!data) {
    //     return (
    //         <View className='flex-1 justify-center items-center'>
    //             <Text className='text-2xl' style={{fontFamily:"BarlowBold"}}>No Data Available</Text>
    //         </View>
    //     )
    // }
    

    const renderReviewItem: ListRenderItem<ReviewItem> = ({ item }) => (
        <View key={item.id} className='mb-4 border-t border-neutral-300 rounded-lg'>
            <View className='flex-row justify-between items-center mb-2'>
                <Text className='text-lg font-bold'>{item.user?.display_name}</Text>
                <StarRating rating={item?.rating} />

            </View>
            <Text className='text-gray-500 txt-sm ' style={{ fontFamily: "BarlowMedium" }}>
                {
                    new Date(item.created).toLocaleDateString()
                }
            </Text>
            {
                item.content ? (
                    <Text className='text-gray-600 mt-2 capitalize'>
                        {
                            item.content
                        }
                    </Text>
                ) : (
                    <Text className='text-gray-600 mt-2 capitalize'>
                        No comments provided
                    </Text>
                )
            }
        </View>
    )

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#d0d0d0', dark: '#353636' }}
            headerImage={
                <Image source={{ uri: data?.image_480x270 }} className='w-full h-72 rounded-lg' />
            }
        >
            <View>
                <View className='bg-blue-700 rounded-xl p-0.5 mb-4 w-32 justify-center items-center'>
                    <Text className='text-base text-white' style={{ fontFamily: "BarlowMedium" }}>{data?.locale.title}</Text>

                </View>
                <Text className='text-2xl text-black' style={{ fontFamily: "BarlowBold" }}>{data?.title}</Text>

                <View>
                    <Text className='text-base text-gray-700' style={{ fontFamily: "BarlowMedium" }}>{data?.visible_instructors[0]?.display_name}</Text>
                </View>
                <Text className='text-3xl mt-6 text-gray-700' style={{ fontFamily: "BarlowBold" }}>{data?.is_paid ? data.price : 'Free'}</Text>
                <SegementedControl selectedSegment={selectedSegment} onSegmentChange={setSelectedSegment} />
                {
                    selectedSegment == "reviews" ? (
                        <>
                            <Text className='text-2xl pb-4' style={{ fontFamily: 'BarlowBold' }}>Reviews {reviewsData?.count}</Text>
                            <FlatList nestedScrollEnabled={true} scrollEnabled={false}
                                data={reviewsData?.results} renderItem={renderReviewItem}
                                keyExtractor={(item) => item.id.toString()} />
                        </>
                    ) : (
                        <>
                            <CurriculumList curriculumData={mergedCuriculumData} onLoadMore={loadMoreCurriculum} />
                        </>
                    )
                }
            </View>
        </ParallaxScrollView>

    )
}

export default Coursedetail

const styles = StyleSheet.create({})