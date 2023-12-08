import {Pressable, View, Text, StyleSheet} from 'react-native';

import {GlobalStyles} from '../../constants/styles';
import {getFormattedDate} from '../../util/dateUtil';
import {useNavigation} from '@react-navigation/native';

function ExpensesItem({id, description, date, amount}) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate('ManageExpenses', {expenseId: id});
  }
  return (
    <Pressable onPress={onPressHandler}>
      <View style={style.expenseItem}>
        <View>
          <Text style={[style.textBase, style.description]}>{description}</Text>
          <Text style={style.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={style.amountContainer}>
          <Text style={style.amountText}>{amount + '$'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpensesItem;

const style = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 2,
    backgroundColor: GlobalStyles.colors.primary400,
    elevation: 3,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.4,
    shadowColor: GlobalStyles.colors.gray500,
  },
  textBase: {
    color: 'white',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  amountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});
