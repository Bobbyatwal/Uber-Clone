import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_APIKEY } from "@env";
import NavFavorites from "./NavFavorites";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity> 
      <Text style={tw`text-center py-4 text-xl`}> Good Afternoon, Bobby </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            placeholder="Where are you headed?"
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            /* Details provides geometry object that contains a location object 
          which provides lat and long from Google API   */
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
          />
        </View>
        <NavFavorites />
      </View>

      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 `}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw` flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-200 flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 30,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
