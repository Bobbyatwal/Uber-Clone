import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "123",
    title: "Get a Ride ",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food ",
    image: "https://links.papareact.com/28w",
    screen: "EatScreen", // Change in future.....
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}
          style={[tw` p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40  `]}
        >
          <View style={tw `${!origin && 'opacity-20'}` }>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 120,
              height: 120,
              resizeMode: "contain",
            }}
          />
          <Text style={tw`mt-2 text-lg font-semibold`}> {item.title}</Text>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10  mt-4`}
            name="arrowright"
            type="antdesign"
            color="white"
          />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
