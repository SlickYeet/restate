import { Tabs } from "expo-router"
import React from "react"
import { Image, ImageSourcePropType, Text, View } from "react-native"

import icons from "@/constants/icons"

const TabIcon = ({
  title,
  focused,
  icon,
}: {
  title: string
  focused: boolean
  icon: ImageSourcePropType
}) => (
  <View className="mt-3 flex-1 flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${focused ? "font-rubik-medium text-primary-300" : "font-rubik text-black-200"} mt-1 w-full text-center text-xs`}
    >
      {title}
    </Text>
  </View>
)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Explore" focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" focused={focused} icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  )
}
