import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import * as React from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-elements";
import { List, Paragraph, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, View } from "native-base";

import ProductScreen from "./ProductDetail";
import AppTheme from "../theme";
import ComprasContext from "../context/ComprasContext";
import { useQuery } from "react-query";
import supabase, { parseSupabase } from "../libs/supabase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1
  }
});
export type HomeStackParamList = {
  Home: undefined;
  Product: { id: string };
};
type Props = DrawerScreenProps<HomeStackParamList, "Home">;
export type Item = {
  id: number;
  image: string;
  price: number;
  description: string;
  name: string;
  id_categoria: number;
};

export const ItemContext = React.createContext<Item[]>([]);
const itemExamples = [
  {
    id: 1,
    src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*",
    price: 500,
    desc: "Pastel Dominicano de Frambuesa"
  },
  {
    id: 1,
    src: "https://annaspasteleria.com/images/blocks/_imageBlock/DSC_9204web.jpg",
    price: 80,
    desc: "Galletas LOVE"
  },
  {
    id: 1,
    src: "data:image/jpeg;base64,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",
    price: 100,
    desc: "Shots"
  },
  {
    id: 1,
    src: "https://images-gmi-pmc.edge-generalmills.com/6cf26612-e351-4ad1-b55d-4ed2aace25e0.jpg",
    price: 10,
    desc: "Shots"
  },
  {
    id: 1,
    src: "https://images-gmi-pmc.edge-generalmills.com/6cf26612-e351-4ad1-b55d-4ed2aace25e0.jpg",
    price: 80,
    desc: "Brownie a la moda"
  },
  {
    id: 1,
    src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*",
    price: 20,
    desc: "hola mundo"
  },
  {
    id: 1,
    src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*",
    price: 20,
    desc: "hola mundo"
  }
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
  // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
];

function CategoryButton({ name, image }: { name: string; image: string }) {
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert("Categoria", name);
      }}
      style={{ flex: 1, height: 140, width: 220 }}
    >
      <View
        style={{
          backgroundColor: AppTheme.colors.primary,
          opacity: 0.9,
          margin: 5,
          justifyContent: "center",
          borderRadius: 50,
          flex: 1
        }}
      >
        <Image
          style={{
            flexGrow: 1,
            borderRadius: 50,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
          source={{ uri: image }}
        />
        <Center style={{ flexGrow: 1, maxHeight: 40 }}>
          <Paragraph>{name}</Paragraph>
        </Center>
      </View>
    </TouchableOpacity>
  );
}

function ProductItemComponent({ item }: { item: Item }) {
  const nav = useNavigation<Props["navigation"]>();
  const compras = React.useContext(ComprasContext);
  return (
    <TouchableOpacity
      style={{
        flex: 1
      }}
      onPress={() => {
        nav.navigate("Product", {
          id: item.id.toString()
        });
      }}
    >
      <Card>
        <Card.Image
          source={{
            uri: item.image
          }}
        />
        <Card.Divider />
        <Card.Title>{item.name}</Card.Title>
        <Card.Title>Precio: {item.price}</Card.Title>
        <Button
          onPress={() => {
            compras.addCompra(item);
          }}
        >
          <Paragraph
            style={{
              flex: 1,
              fontSize: 12,
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
          >
            Agregar al{" "}
            <List.Icon
              icon="cart-outline"
              style={{
                alignSelf: "center",
                alignContent: "center",
                alignItems: "center",
                height: 10
              }}
            />
          </Paragraph>
        </Button>
      </Card>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }: Props) {
  const [searchQuery, onChangeSearch] = React.useState<string>("");
  const { data: items } = useQuery("Articulo", async () => {
    let { data, error } = await supabase.from("Articulo").select("*");
    if (error)
      throw error;
    return data;
  });
  const { data: categorias } = useQuery("Categoria", async () => {
    let { data, error } = await supabase.from("Categoria").select("name, image");
    if (error)
      throw error;
    return data;
  });
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fce9e9", "#f4b4b4", "#e6a2a2"]}
        style={styles.background}
      />
      <Searchbar
        placeholder="Search"
        onChangeText={e => onChangeSearch(e as any)}
        value={searchQuery}
        autoComplete={false}
        style={{
          backgroundColor: "#E0E0E0"
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <FlatList
            data={categorias}
            renderItem={({ item }) => (
              <CategoryButton
                name={item.name}
                image={item.image}
              />
            )}
            horizontal
            keyExtractor={(item, index) => item.name}
          />
        </View>

        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ProductItemComponent item={item} />
          )}
          // Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeController() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: 'yellow',
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default HomeController;
