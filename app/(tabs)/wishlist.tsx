import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWishListStore } from '@/store/WishListStore'
import CourseItem from '@/components/CourseItem'

const WishList = () => {
    const{wishList}=useWishListStore()
  return (
    <View className='flex-1 pt-12 bg-white'>
        <View className='p-4'>
        <Text className='text-2xl font-bold mb-4'
        style={{fontFamily:"BarlowBold"}}>WishList</Text>
        {
            wishList.length===0?(
                <Text> Your wish list is empty</Text>
            ):(
                <FlatList  data={wishList}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item,index})=>(
                    <CourseItem course={item} index={index}/>
                )}
                />
            )
        }
        </View>
      
    </View>
  )
}

export default WishList

const styles = StyleSheet.create({})