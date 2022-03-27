import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, Center, Heading } from "native-base";
import * as React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Avatar, Paragraph } from "react-native-paper";
import AppTheme from "../theme";
import { HomeStackParamList, Item } from "./HomeScreen";
import Background from "../components/Background";
import { useMutation, useQuery } from "react-query";
import supabase from "../libs/supabase";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function ProductScreen({
                         route
                       }: DrawerScreenProps<HomeStackParamList, "Product">) {
  const { data, isLoading } = useQuery(["articulo", route.params.id], async () => {
    let { data, error } = await supabase.from<Item>("Articulo")
      .select("*")
      .filter("id", "eq", route.params.id);
    if (error) {
      throw error;
    }
    return data![0];
  });

  const addToCar = useMutation(["addToCart", route.params.id], async () => {
    let { data, error,...others } = await supabase.rpc("add_to_carrito", {
      articulo: route.params.id,
      usuario: 1
    });
    if (error) {
      throw error;
    }
    return data;
  });
  if (isLoading || !data)
    return (
      <View style={{ flex: 1 }}>
        <Background />

        <Center>
          <Paragraph>Loading...</Paragraph>
        </Center>
      </View>
    );
  return (
    <View style={styles.container}>
      <Background />
      <Center>
        <Avatar.Image
          source={{
            uri: data.image
          }}
          size={300}
          style={{
            marginHorizontal: -10,
            ...Platform.select({
              ios: {
                marginTop: 30
              },
              android: {
                marginTop: 10
              },
              default: {
                marginTop: 5
              }
            })
          }}
        />
      </Center>
      <View
        style={[
          styles.container,
          {
            padding: 50
          }
        ]}
      >
        <Heading
          style={[
            {
              fontSize: 32
            },
            Platform.OS === "ios" && {
              fontSize: 28
            },
            Platform.OS === "android" && {
              fontSize: 32
            }
          ]}
        >{data.name}</Heading>
        <Text
          style={{
            fontWeight: "400",
            color: "gray"
          }}
        >
          ${data.price}
        </Text>
        <Paragraph>
          {data.description}
        </Paragraph>
        <Button onPress={() => {
          addToCar.mutate();
        }} background={AppTheme.colors.accent}>Add</Button>
      </View>
    </View>
  );
}

export default ProductScreen;
