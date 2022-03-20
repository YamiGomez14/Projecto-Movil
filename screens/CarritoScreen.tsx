import faker from "@faker-js/faker";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, Center, ScrollView, TextArea } from "native-base";
import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  DataTable,
  Paragraph,
  TextInput,
  ThemeProvider,
  DefaultTheme
} from "react-native-paper";
import ComprasContext from "../context/ComprasContext";
import { Background } from "../components/Background";
import AppTheme from "../theme";
import { useQuery } from "react-query";
import supabase from "../libs/supabase";
import { Item } from "../screens/HomeScreen";

// Uso las props del Login para usar el Navigator
interface Props extends DrawerScreenProps<any, any> {
}

export const LoginStyles = StyleSheet.create({});

const theme: Partial<typeof DefaultTheme> = {
  ...AppTheme,
  colors: { ...AppTheme.colors, text: "black" }
};
export const CarritoScreen = ({ navigation }: Props) => {
  const { data: compras = [], isLoading } = useQuery("compras", async () => {
    let { data, error } = await supabase.from<{
      id: number,
      id_usuario: number,
      cantidad: number,
      id_articulo: number,
      Articulo: Item
    }>("ItemCarrito").select("*, Articulo(*)")
      .filter("id_usuario", "eq", 1); //TODO: get id from current user
    if (error)
      throw error;
    return data! || [];
  });
  const total = compras.reduce((_total, compra) => _total + +compra.Articulo.price, 0);
  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Background />

        <Center>
          <Paragraph>Loading...</Paragraph>
        </Center>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider theme={theme as any}>
        <Background />
        <DataTable style={{ flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={{ fontSize: 24 }}>Producto</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{ fontSize: 24 }}>Precio</Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView style={{ flex: 1 }}>
            {compras.map(t => (
              <DataTable.Row key={t.id}>
                <DataTable.Cell>
                  <Text style={{ fontSize: 18 }}>
                    {t.Articulo.name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={{ fontSize: 18 }}>
                    {t.Articulo.price}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
          <DataTable.Header>
            <DataTable.Title>
              {/* <Text style={{ fontSize: 24 }}>Total:</Text> */}
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{ fontSize: 24 }}>Total: {total}</Text>
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <View style={{}}>
          <TextInput
            multiline
            label={
              <Text
                style={{
                  fontSize: 20
                }}
              >
                Especificaciones del pedido
              </Text>
            }
            autoComplete={false}
            style={{
              height: 200,
              fontSize: 18
            }}
          />
        </View>
        <Button>Realizar Pedido</Button>
      </ThemeProvider>
    </View>
  );
};
