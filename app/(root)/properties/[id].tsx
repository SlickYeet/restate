import { router, useLocalSearchParams } from "expo-router"
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { Comment } from "@/components/comment"
import { facilities } from "@/constants/data"
import icons from "@/constants/icons"
import images from "@/constants/images"

import { getPropertyById } from "@/lib/appwrite"
import { useAppwrite } from "@/lib/use-appwrite"

export default function Property() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const windowHeight = Dimensions.get("window").height

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  })

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 z-40 w-full"
          />

          <View
            className="absolute inset-x-7 z-50"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex w-full flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 flex size-11 flex-row items-center justify-center rounded-full"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  tintColor="#191D31"
                  className="size-7"
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-7 flex gap-2 px-5">
          <Text className="font-rubik-extrabold text-2xl">
            {property?.name}
          </Text>

          <View className="flex flex-row items-center gap-3">
            <View className="bg-primary-100 flex flex-row items-center rounded-full px-4 py-2">
              <Text className="font-rubik-bold text-primary-300 text-xs">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 font-rubik-medium mt-1 text-sm">
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View className="mt-5 flex flex-row items-center">
            <View className="bg-primary-100 flex size-10 flex-row items-center justify-center rounded-full">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="text-black-300 font-rubik-medium ml-2 text-sm">
              {property?.bedrooms} Beds
            </Text>
            <View className="bg-primary-100 ml-7 flex size-10 flex-row items-center justify-center rounded-full">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 font-rubik-medium ml-2 text-sm">
              {property?.bathrooms} Baths
            </Text>
            <View className="bg-primary-100 ml-7 flex size-10 flex-row items-center justify-center rounded-full">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 font-rubik-medium ml-2 text-sm">
              {property?.area} sqft
            </Text>
          </View>

          <View className="border-primary-200 mt-5 w-full border-t pt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Agent
            </Text>

            <View className="mt-4 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="size-14 rounded-full"
                />

                <View className="ml-3 flex flex-col items-start justify-center">
                  <Text className="text-black-300 font-rubik-bold text-start text-lg">
                    {property?.agent.name}
                  </Text>
                  <Text className="text-black-200 font-rubik-medium text-start text-sm">
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Overview
            </Text>
            <Text className="text-black-200 font-rubik mt-2 text-base">
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className="mt-2 flex flex-row flex-wrap items-start justify-start gap-5">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item,
                  )

                  return (
                    <View
                      key={index}
                      className="flex min-w-16 max-w-20 flex-1 flex-col items-center"
                    >
                      <View className="bg-primary-100 flex size-14 items-center justify-center rounded-full">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 font-rubik mt-1.5 text-center text-sm"
                      >
                        {item}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 font-rubik-bold text-xl">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Location
            </Text>
            <View className="mt-4 flex flex-row items-center justify-start gap-2">
              <Image source={icons.location} className="h-7 w-7" />
              <Text className="text-black-200 font-rubik-medium text-sm">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="mt-5 h-52 w-full rounded-xl"
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 font-rubik-bold ml-2 text-xl">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 font-rubik-bold text-base">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="border-primary-200 absolute bottom-0 w-full rounded-t-2xl border-l border-r border-t bg-white p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 font-rubik-medium text-xs">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 font-rubik-bold text-start text-2xl"
            >
              $ {property?.price}
            </Text>
          </View>

          <TouchableOpacity className="bg-primary-300 flex flex-1 flex-row items-center justify-center rounded-full py-3 shadow-md shadow-zinc-400">
            <Text className="font-rubik-bold text-center text-lg text-white">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
