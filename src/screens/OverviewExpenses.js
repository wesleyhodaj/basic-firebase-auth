import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import {GlobalStyles} from '../constants/styles.js';
import IconButton from '../component/UI/IconButton.js';
import Profile from './Profile';

const BottomTabs = createBottomTabNavigator();

function OverviewExpenses() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: GlobalStyles.colors.primary400,
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerRight: ({tintColor}) => (
          <IconButton
            icon="add"
            size={30}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpenses');
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icon name="eercast" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => (
            <Icon name="money" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          headerRight: null,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default OverviewExpenses;
