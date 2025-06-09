import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "@screens/Home";
import Details from "@screens/Details";
import Announcements from "@screens/Announcements";
import DetailsAnnouncement from "@screens/DetailsAnnouncement";
import CreateAnnouncement from "@screens/CreateAnnouncement";
import EditAnnouncement from "@screens/EditAnnouncement";
import PreviewAnnouncement from "@screens/PreviewAnnouncement";
import SignOut from "@screens/SignOut";

import { HomeIcon, Tag, LogOut } from "lucide-react-native";

import { ProductDTO, ImagesPickerProps } from "@dtos/Product";

export type AppRoutesProps = {
  Home: undefined;
  Announcements: undefined;
  Logout: undefined;
  Details: undefined;
  DetailsAnnouncement: {
    id: string;
  };
  CreateAnnouncement: undefined;
  EditAnnouncement: ProductDTO & { 
    id: string; 
    images: ImagesPickerProps[] 
  };
  PreviewAnnouncement: ProductDTO & { 
    id?: string; 
    images: ImagesPickerProps[]
  };
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export default function AppRoutes() { 
  return (
    <Navigator
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { flex: 1 },
        tabBarActiveTintColor: "#3E3A40",
        tabBarInactiveTintColor: "#9F9BA1",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
        }
      }}
    >
      <Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({color}) => <HomeIcon color={color} size={20} />
        }}
      />
      <Screen 
        name="Announcements" 
        component={Announcements} 
        options={{
          tabBarIcon: ({color}) => <Tag color={color} size={20} />
        }}
      />
      <Screen 
        name="Logout" 
        component={SignOut} 
        options={{
          tabBarIcon: ({}) => <LogOut color="#EE7979" size={20} />
        }}
      />
      <Screen 
        name="Details" 
        component={Details} 
        options={{ 
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" } 
        }}
      />
      <Screen 
        name="DetailsAnnouncement" 
        component={DetailsAnnouncement}
        options={{ 
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" } 
        }} 
      />
      <Screen 
        name="CreateAnnouncement" 
        component={CreateAnnouncement}
        options={{ 
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" } 
        }} 
      />
      <Screen 
        name="EditAnnouncement" 
        component={EditAnnouncement}
        options={{ 
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" } 
        }} 
      />
      <Screen 
        name="PreviewAnnouncement" 
        component={PreviewAnnouncement}
        options={{ 
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" } 
        }} 
      />
    </Navigator>
  );
}
