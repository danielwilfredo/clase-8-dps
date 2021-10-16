import React, { useState, useEffect } from 'react';
import { Text, Button, View, FlatList, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const PokemonScreen = ()=>{
  const [elementos,guardarlista] = useState([]);
  fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         const listado=responseJson.results;
         console.log(listado)
         guardarlista(listado);
      })
      .catch((error) => {
         console.error(error);
      });
  return(
    <>
     <View style={{flex:1}} >
       <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10,marginRight:10}}> Pokemones</Text>
              <FlatList
        data={elementos}
        renderItem={({item})=>
            
            <><Text style={styles.item}>{item.name}</Text>
          </>
        }
      />
     </View>
    </>
  );
}



const PokemonScreen2 = ()=>{

  const [elementos2, guardarlista2] = useState([]);
  const [pokeinfo, setPokeInfo]=useState([])

   useEffect( () => {
     console.log("Ejecutando useEfect")
    //const requestData2 = () => fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10', {method: 'GET'}).then((valor) => valor.json());
    const listarPokemon = async()=>{
      const resultado = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10').then(response => response.json());
   //   const valor = await requestData2();
      const guardar =resultado.results
      for (const url of guardar) {
        console.log("url de guardar", url.url)
        const masinfo = await fetch(url.url).then(response => response.json());
        console.log("mas info", masinfo)
        setPokeInfo(...pokeinfo, masinfo)
        
        }
      //console.log("valores pokemon2",guardar[0]?.url)
      guardarlista2(...pokeinfo, guardar);
    }
    listarPokemon();

  }, [])

  return(
    <>
     <View style={{flex:1}} >
       <Text style={{fontSize:18,textAlign:'center',height:40,marginTop:10,backgroundColor:'lightgray',textAlignVertical:'center', borderRadius:10,marginLeft:10,marginRight:10}}> Pokemones</Text>
              <FlatList
        data={elementos2, pokeinfo}
        renderItem={({item, item2})=>
            <View>
              <Text style={styles.item}>{item.name}</Text>
              <Text style={styles.item}>{item2.base_experience}</Text>
            </View>
        }
        />
        <Text>Mas info</Text>
        
     </View>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Lista" component={PokemonScreen2}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
