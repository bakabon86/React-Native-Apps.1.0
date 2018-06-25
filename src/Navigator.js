import React from 'react';
import { Platform,ScrollView, } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,  
  DrawerView,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import FavoritesScreen from './screens/Favorites';
import SettingsScreen from './screens/Settings';
import AttendanceListScreen from './screens/AttendanceList';
import LeaveUsageHistoryListScreen from './screens/LeaveUsageHistoryList';
import LeaveRequestListScreen from './screens/LeaveRequestList';
import LeaveRequestScreen from './screens/LeaveRequest';
import DeviationRequestListScreen from './screens/DeviationRequestList';
import WorkListScreen from './screens/WorkList';
import ReservationRequestListScreen from './screens/ReservationRequestList';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';

const AppMainTab = TabNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Sweet home',
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={23} color={tintColor} />
        ),
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Home',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
    })
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Favorites',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="heartbeat" size={23} color={tintColor} />
      ),
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="heartbeat" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Favorites',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={23} color={tintColor} />
      ),
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Profile',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
      headerRight: <SettingsIcon onPress={() => navigation.navigate('Settings')} />,
    })
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.WHITE,
    inactiveTintColor: colors.BLUE_50,
    inactiveBackgroundColor: colors.BLUE_100,
    activeBackgroundColor: colors.BLUE_100,
    showIcon: true,
    showLabel: Platform.OS === 'ios',
    indicatorStyle: {
      backgroundColor: colors.BLUE_300,
    },
    style: {
      backgroundColor: colors.BLUE_100,
    },
    upperCaseLabel: false,
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
});

const AppMainStack = StackNavigator({
  Home: { screen: AppMainTab },
  Settings: { screen: SettingsScreen },
  LeaveRequestScreen:{ screen: LeaveRequestScreen ,
                        headerLeft: <BackIcon onPress={() => navigation.navigate('LeaveRequestListScreen')} />,
                      },
}, {
  cardStyle: {
    backgroundColor: colors.BLUE_50,
  },
  mode: 'modal',
});

const AppDrawer = DrawerNavigator({
  Home: {
    screen: AppMainStack,
  },
  AttendanceList:{
    screen: AttendanceListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Attendance List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-timer" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Attendance List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />
      //headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  LeaveUsageHistory:{
    screen: LeaveUsageHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Leave Usage History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Leave Usage History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  LeaveRequestList:{
    screen: LeaveRequestListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Leave Request List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-grid" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Leave Request List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  DeviationRequest:{
    screen: DeviationRequestListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Deviation Request List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-walk" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Deviation Request List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  WorkList:{
    screen: WorkListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'WorkList',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-create" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'WorkList',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  ReservationRequest:{
    screen: ReservationRequestListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Reservation Request',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-people" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Reservation Request',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
}, {
  contentComponent: props =>
    ( <CustomDrawerContent
        {...props}
		  />
    ),
    //(<ScrollView><CustomDrawerContent {...props} /></ScrollView>),
  contentOptions: {
    activeBackgroundColor: colors.BLUE_100,
    activeTintColor: colors.WHITE,
    inactiveTintColor: colors.BLUE_200,
    
  },
});

const Navigator = TabNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: AppDrawer },
}, {
  navigationOptions: {
    tabBarVisible: false,
  },
  swipeEnabled: false,
});

export default Navigator;
