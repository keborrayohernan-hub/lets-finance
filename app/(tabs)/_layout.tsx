import React from 'react';
import { Tabs } from 'expo-router';
import { NavBar } from '../../src/components/NavBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <NavBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="budget" />
      <Tabs.Screen name="spendings" />
      {/* Screens shown with the nav bar but without their own tab */}
      <Tabs.Screen name="advice" options={{ href: null }} />
      <Tabs.Screen name="transactions" options={{ href: null }} />
      <Tabs.Screen name="quiz/[id]" options={{ href: null }} />
    </Tabs>
  );
}
