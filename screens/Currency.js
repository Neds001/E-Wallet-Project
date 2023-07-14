import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput, ToastAndroid } from 'react-native';
import CoinItem from '../components/CoinItem';
import { Color } from '../GlobalStyles';
import { Picker } from '@react-native-picker/picker';

const Currency = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('PHP');


  // const loadData = async () => {
  //   const res = await fetch(
  //     'https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
  //   );
  //   const data = await res.json();
  //   console.log('loaded to updated currency');
  //   setCoins(data);
  // };
      const loadData = async () => {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
        );
        const data = await res.json();
        ToastAndroid.show('Currency Updating', ToastAndroid.LONG)
        console.log('loaded to updated currency');
        setCoins(data);
        ToastAndroid.show('Currency Updated', ToastAndroid.SHORT)
      };
  

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Currency</Text>

        <TextInput
          style={styles.search}
          placeholder="Search"
          placeholderTextColor="#858585"
          onChangeText={text => setSearch(text)}
        />


        <Picker
          style={styles.picker}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          <Picker.Item label="PHP - Philippine Peso" value="PHP" />
          <Picker.Item label="USD - US Dollar" value="USD" />
          <Picker.Item label="CNY - Chinese Yen" value="CNY" />
          <Picker.Item label="EUR - Euro" value="EUR" />
          <Picker.Item label="JPY - Japanese Yen" value="JPY" />
        </Picker>

        
      
      </View>
      <FlatList
        style={styles.list}
        data={coins.filter(
          coin =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blackModePrimaryDark,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: '90%',
  },
  search: {
    color: 'white',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '20%',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  picker: {
    color: 'white',
    width: '40%',
  },
});

export default Currency;
