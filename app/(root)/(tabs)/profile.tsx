import React from "react"
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { settings } from "@/constants/data"
import icons from "@/constants/icons"
import { logout } from "@/lib/appwrite"
import { useGlobalContext } from "@/lib/global-provider"

interface SettingsItemProps {
  title: string
  icon: ImageSourcePropType
  onPress?: () => void
  showArrow?: boolean
  className?: string
}

const SettingsItem = ({
  title,
  icon,
  onPress,
  showArrow = true,
  className,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-3"
  >
    <View className="flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`font-rubik-medium text-black-300 text-lg ${className}`}>
        {title}
      </Text>
    </View>

    {showArrow ? <Image source={icons.rightArrow} className="size-5" /> : null}
  </TouchableOpacity>
)

export default function Profile() {
  const { user, refetch } = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout()
    if (result) {
      refetch()
    } else {
      Alert.alert("Error", "Failed to logout.")
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="mt-5 flex-row items-center justify-between">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-6" />
        </View>

        <View className="mt-5 flex-row justify-center">
          <View className="mt-5 flex-col items-center">
            <View className="relative">
              <Image
                source={{ uri: user?.avatar }}
                className="size-44 rounded-full"
              />
              <TouchableOpacity className="absolute bottom-0 right-2">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>
            </View>

            <Text className="font-rubik-bold mt-2 text-2xl">{user?.name}</Text>
          </View>
        </View>

        <View className="mt-10 flex-col">
          <SettingsItem title="My Bookings" icon={icons.calendar} />
          <SettingsItem title="Payments" icon={icons.wallet} />
        </View>

        <View className="border-primary-200 mt-5 flex-col border-t pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="border-primary-200 mt-5 flex-col border-t pt-5">
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            showArrow={false}
            className="text-danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
