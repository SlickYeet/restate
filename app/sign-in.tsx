import { Redirect } from "expo-router"
import React from "react"
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import icons from "@/constants/icons"
import images from "@/constants/images"
import { login } from "@/lib/appwrite"
import { useGlobalContext } from "@/lib/global-provider"

export default function SignIn() {
  const { isLoggedIn, loading, refetch } = useGlobalContext()
  if (!loading && isLoggedIn) {
    return <Redirect href="/" />
  }

  const handleLogin = async () => {
    const result = await login()
    if (result) {
      refetch()
    } else {
      Alert.alert("Error", "Failed to login")
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="h-4/6 w-full"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="font-rubik text-black-200 text-center text-base uppercase">
            Welcome to ReState
          </Text>

          <Text className="font-rubik-bold text-black-300 mt-2 text-center text-3xl">
            Let&apos;s Get You Closer to{" "}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="font-rubik text-black-200 mt-12 text-center text-lg">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="mt-5 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300"
          >
            <View className="flex-row items-center justify-center">
              <Image
                source={icons.google}
                resizeMode="contain"
                className="h-5 w-5"
              />
              <Text className="font-rubik-medium text-black-300 ml-2 text-lg">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
