import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ManageExpenses from './src/screens/manageExpenses/ManageExpenses';
import {GlobalStyles} from './src/constants/styles';
import ExpensesContextProvider from './src/context/expenses-context';
import OverviewExpenses from './src/screens/OverviewExpenses';
import AuthContent from './src/screens/login/AuthContent';
import SignupScreen from './src/screens/login/SignupScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import {store} from './src/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Init} from './src/store/actions';
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary50},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: GlobalStyles.colors.primary100},
        headerTitle: '',
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Login">
  so weird man , plz explain?
  {props => <AuthContent isLogin />}
  </Stack.Screen> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <ExpensesContextProvider>
      <Stack.Navigator
      // screenOptions={{
      //   headerStyle: {backgroundColor: 'white'},
      //   headerTintColor: 'white',
      //   headerTitleStyle: {color: 'black'},
      // }}
      >
        <Stack.Screen
          name="OverviewExpenses"
          component={OverviewExpenses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          options={{presentation: 'modal'}}
        />
      </Stack.Navigator>
    </ExpensesContextProvider>
  );
};

const RootNavigation = () => {
  console.log('Appjs', token);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  async function init() {
    setLoading(true);
    await dispatch(Init());
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const token = useSelector(state => state.Reducers.authToken);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <LoginStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    color: 'black',
  },
  backgroundStyle: {
    backgroundColor: Colors.darker,
    alignItems: 'center',
  },
});
