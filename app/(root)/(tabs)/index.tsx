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

import { Card, FeaturedCard } from "@/components/cards"
import { Filters } from "@/components/filters"
import { NoResults } from "@/components/no-results"
import { Search } from "@/components/search"
import icons from "@/constants/icons"
import { getLatestProperties, getProperties } from "@/lib/appwrite"
import { useGlobalContext } from "@/lib/global-provider"
import { useAppwrite } from "@/lib/use-appwrite"

export default function Index() {
  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string; filter?: string }>()

  const { data: latestProperties, loading: loadingLatestProperties } =
    useAppwrite({
      fn: getLatestProperties,
    })
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
      limit: 6,
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
            <View className="mt-5 flex-row items-center justify-between">
              <View className="flex-row">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="ml-2 flex-col items-start justify-center">
                  <Text className="font-rubik text-black-100 text-xs">
                    Good Morning{" "}
                  </Text>
                  <Text className="font-rubik-medium text-black-300 text-base">
                    {user?.name}
                  </Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex-row items-center justify-between">
                <Text className="font-rubik-bold text-black-300 text-xl">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-primary-300 text-base">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {loadingLatestProperties ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  horizontal
                  keyExtractor={(item) => item.$id}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                />
              )}
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-rubik-bold text-black-300 text-xl">
                Our Top Picks
              </Text>
              <TouchableOpacity>
                <Text className="font-rubik-bold text-primary-300 text-base">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />
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
