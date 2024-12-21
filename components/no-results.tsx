import React from "react"
import { Image, Text, View } from "react-native"

import images from "@/constants/images"

export function NoResults() {
  return (
    <View className="my-5 flex items-center">
      <Image
        source={images.noResult}
        resizeMode="contain"
        className="h-80 w-11/12"
      />
      <Text className="font-rubik-bold text-black-300 mt-5 text-2xl">
        No Results
      </Text>
      <Text className="text-black-100 mt-2 text-base">
        We couldn't find any results
      </Text>
    </View>
  )
}
