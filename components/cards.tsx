import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { Models } from "react-native-appwrite"

import icons from "@/constants/icons"
import images from "@/constants/images"

interface CardProps {
  item: Models.Document
  onPress?: () => void
}

export function FeaturedCard({
  item: { name, address, price, rating, image },
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative h-80 w-60 flex-col items-start"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />

      <View className="absolute right-5 top-5 flex-row items-center rounded-full bg-white/90 px-3 py-1.5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="font-rubik-bold text-primary-300 ml-1 text-xs">
          {rating}
        </Text>
      </View>

      <View className="absolute inset-x-5 bottom-5 flex-col items-start">
        <Text
          numberOfLines={1}
          className="font-rubik-extrabold text-xl text-white"
        >
          {name}
        </Text>
        <Text className="font-rubik text-base text-white">{address}</Text>

        <View className="w-full flex-row items-center justify-between">
          <Text className="font-rubik-extrabold text-xl text-white">
            $ {price}
          </Text>

          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export function Card({
  item: { name, address, price, rating, image },
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="shadow-black-100/70 relative mt-4 w-full flex-1 rounded-lg bg-white px-3 py-4 shadow-lg"
    >
      <View className="absolute right-5 top-5 z-50 flex-row items-center rounded-full bg-white/90 p-1 px-2">
        <Image source={icons.star} className="size-2.5" />
        <Text className="font-rubik-bold text-primary-300 ml-0.5 text-xs">
          {rating}
        </Text>
      </View>

      <Image source={{ uri: image }} className="h-40 w-full rounded-lg" />

      <View className="mt-2 flex-col">
        <Text className="font-rubik-bold text-black-300 text-base">{name}</Text>
        <Text className="font-rubik text-black-200 text-xs">{address}</Text>

        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-rubik-bold text-primary-300 text-base">
            $ {price}
          </Text>

          <Image
            source={icons.heart}
            tintColor="#191D31"
            className="mr-2 size-5"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
