import { Redirect, Slot } from "expo-router"
import React from "react"
import { ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useGlobalContext } from "@/lib/global-provider"

export default function RootLayout() {
  const { isLoggedIn, loading } = useGlobalContext()
  if (loading) {
    return (
      <SafeAreaView className="h-full items-center justify-center bg-white">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    )
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />
  }

  return <Slot />
}
