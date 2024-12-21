import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity } from "react-native"

import { categories } from "@/constants/data"

export function Filters() {
  const params = useLocalSearchParams<{ filter?: string }>()

  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All",
  )

  const handleCatergoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All")
      router.setParams({ filter: "All" })
      return
    }

    setSelectedCategory(category)
    router.setParams({ filter: category })
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-2 mt-3"
    >
      {categories.map(({ title, category }, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCatergoryPress(category)}
          className={`mr-4 flex-col items-start rounded-lg px-4 py-2 ${selectedCategory === category ? "bg-primary-300" : "bg-primary-100 border-primary-200 border"}`}
        >
          <Text
            className={`text-sm ${selectedCategory === category ? "font-rubik-bold mt-0.5 text-white" : "text-black-300"}`}
          >
            {title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
