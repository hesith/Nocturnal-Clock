import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {

  // Hide bottom bar
const hideNavBar = async () => {

  // Prevent content from moving up when bar is shown
  await NavigationBar.setPositionAsync("absolute") 

  // Hide bottom bar
  await NavigationBar.setVisibilityAsync("hidden") 

  // Show the bar when user swipes
  await NavigationBar.setBehaviorAsync("overlay-swipe")  
}

useEffect(() => {

  const handleAppStateChange = (nextAppState: any) => {

      // If app is being used, hide nav bar
      if (nextAppState === "active") {

          hideNavBar()
      }
  }

  // Subscribe to app state changes
  const appStateSubscription = AppState.addEventListener('change', handleAppStateChange)

  // Clean up the event listener when the component unmounts
  return () => {
      appStateSubscription.remove()
  }
}, [])


  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );

  
}
