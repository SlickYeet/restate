import { Image, Text, View } from "react-native"
import { Models } from "react-native-appwrite"

import icons from "@/constants/icons"

interface CommentProps {
  item: Models.Document
}

export function Comment({ item }: CommentProps) {
  return (
    <View className="flex flex-col items-start">
      <View className="flex flex-row items-center">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="text-black-300 font-rubik-bold ml-3 text-start text-base">
          {item.name}
        </Text>
      </View>

      <Text className="text-black-200 font-rubik mt-2 text-base">
        {item.review}
      </Text>

      <View className="mt-4 flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 font-rubik-medium ml-2 text-sm">
            120
          </Text>
        </View>
        <Text className="text-black-100 font-rubik text-sm">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  )
}
