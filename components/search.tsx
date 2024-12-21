import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { useDebouncedCallback } from "use-debounce"

import icons from "@/constants/icons"

export function Search() {
  const params = useLocalSearchParams<{ query?: string }>()

  const [search, setSearch] = useState<string | undefined>(params.query)

  const debouncedSearch = useDebouncedCallback(
    (query: string) => router.setParams({ query }),
    500,
  )

  const handleSearch = (query: string) => {
    setSearch(query)
    debouncedSearch(query)
  }

  return (
    <View className="bg-accent-100 border-primary-100 mt-5 w-full flex-row items-center justify-between rounded-lg border px-4 py-2">
      <View className="z-50 flex-1 flex-row items-center justify-start">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="font-rubik placeholder:text-black-100 ml-2 flex-1 text-sm"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  )
}
