import React, { useState, useEffect } from 'react';
import { ActivityIndicator,StyleSheet, View, Text, TextInput, FlatList,
   TouchableOpacity,Pressable,KeyboardAvoidingView,
   Platform,ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DetailItem from './DetailItem';
import { useNavigation } from '@react-navigation/native';


const Details = () => {
  const navigation = useNavigation();

  const [clients, setClients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  function handleItemPress(item) {
    
    navigation.navigate('DetailItem', { item });
  }
  function resetSearchInput(){
    console.log('clicked 1', searchText)
    setSearchText('')
    console.log('clicked 2', searchText)

  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsCollection = collection(db, 'clients');
        const querySnapshot = await getDocs(clientsCollection);
        const clientsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setClients(clientsData);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="purple" style={styles.searchIcon} />
        <TextInput
          placeholder="Rechercher"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      <Pressable onPress={resetSearchInput}>
        {searchText && <Feather name="x" size={20} color="purple" style={styles.resetInput} />}
        {/* <Feather name="x-circle" size={24} color="gray" style={styles.resetInput}/> */}
        {/* <Text>reset</Text> */}
      </Pressable>
      
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 16 }}>Resulath de Recherche</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ):(
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: '70%' }}
      >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={clients}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.7}
          >
            <Text style={{ fontWeight: 'bold'}}>Client: {item.contrat}</Text>
            <Text>{item.compteur}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Aucun client n'a été trouvé.</Text>
        )}
      />
      </ScrollView>
    )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6EE',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
    height: 50,
  },
  input: {
    height: 50,
    width: 260,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 1,
  }
  ,
  resetInput: {
    
    paddingRight:3
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 300,
    backgroundColor: 'white',
    marginVertical:3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 7,
    elevation: 2,
  },
  titleContainer: {
    alignItems: 'flex-start', // Align the title container to the left
    width: '100%', // Make the container take full width
    paddingHorizontal: 36, // Add some horizontal padding,
  },
  emptyText: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  }
 
});

export default Details;