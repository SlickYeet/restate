import { router, useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Card } from "@/components/cards"
import { Filters } from "@/components/filters"
import { NoResults } from "@/components/no-results"
import { Search } from "@/components/search"
import icons from "@/constants/icons"
import { getProperties } from "@/lib/appwrite"
import { useAppwrite } from "@/lib/use-appwrite"

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>()

  const {
    data: properties,
    loading: loadingProperties,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  })

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  useEffect(() => {
    refetchProperties({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    })
  }, [params.filter, params.query]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListHeaderComponent={
          <View className="px-5">
            <View className="mt-5 flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 flex size-11 flex-row items-center justify-center rounded-full"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="font-rubik-medium text-black-300 mr-2 text-center text-base">
                Search for Your Ideal Home
              </Text>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="font-rubik-bold text-black-300 mt-5 text-xl">
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          loadingProperties ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
      />
    </SafeAreaView>
  )
}
