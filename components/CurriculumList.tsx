import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'

import { CurriculumItem } from '@/types/types'
interface CurriculumData {
    count: number;
    next: string | null;
    previous: string | null;
    results: CurriculumItem[]
}
interface CurriculumListProps {
    curriculumData: CurriculumData | undefined;
    isLoading: boolean;
    onLoadMore: () => void;


}
const CurriculumList: React.FC<CurriculumListProps> = ({
    curriculumData,
    isLoading,
    onLoadMore
}) => {
    if (!curriculumData) {
        return <Text>No curriculum data available</Text>
    }
    if (isLoading) {
        return (
            <View className='flex-1 justify-center'>
                <ActivityIndicator color={"#0000"} size="large" />
            </View>
        )
    }

    const renderItem = ({ item }: { item: CurriculumItem }) => {
        return (
            <View className='border-b border-[#eee] p-4'>
                {
                    item._class === 'chapter' ? (
                        <Text style={{ fontFamily: "BarlowBold" }}>
                            {item.title}
                        </Text>
                    ) : (
                        <View>
                            <Text className='text-xl ' style={{ fontFamily: "BarlowSemiBold" }}>
                                {item.title}
                            </Text>
                            {
                                item._class == "lecture" && (
                                    <Text className='pl-4 text-red-700' style={{ fontFamily: "BarlowSemiBold" }}>
                                        {item.is_free ? "Free" : "Paid"}
                                    </Text>
                                )

                            }
                            {
                                item._class == "quiz" && (
                                    <Text className='pl-4 ' style={{ fontFamily: "BarlowSemiBold" }}>
                                        Quiz
                                    </Text>
                                )

                            }
                        </View>
                    )
                }
            </View>
        )

    }

    const renderFooter = () => {
        if (!isLoading) return null
        return (
            <View className='p-12'>
                <ActivityIndicator size="small" color={"red"} />
            </View>
        )
    }

    return (
        <View>
            <Text className='text-2xl' style={{ fontFamily: "BarlowBold" }}>Curriculum {curriculumData.count} Items</Text>
            <FlatList nestedScrollEnabled={true} scrollEnabled={false}
                data={curriculumData.results}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                keyExtractor={(item) => item.id.toString()}
            />
            {
                curriculumData.next && !isLoading && (
                    <Pressable onPress={onLoadMore} className='bg-red-700 rounded-2xl py-4 items-center m-10'>
                        <Text className='text-white text-lg'>Load more curriculum</Text>
                    </Pressable>
                )
            }
        </View>
    )
}

export default CurriculumList

const styles = StyleSheet.create({})