import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from "@react-navigation/drawer";
import * as React from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginStyles } from './LoginScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Icon, AspectRatio, Center, Stack, Heading, HStack } from "native-base";
import { VStack, Box, Image, Divider } from 'native-base';
import { Card, Button } from "react-native-elements";
import { Paragraph, Searchbar } from 'react-native-paper';
interface Props extends DrawerScreenProps<any, any> { }
type Item = {
    id: number,
    src: string
    price: number
}
const itemExamples = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*"
]
function View2(props: { name: string }) {

    return <TouchableOpacity onPress={() => {
        Alert.alert("prueba", "prueba");
    }} style={{ flex: 1, height: 40 }}>
        <View style={{ backgroundColor: 'gray', margin: 5, height: 40, justifyContent: 'center', flex: 1, borderRadius: 5 }}>
            <Paragraph style={{
                margin: 10,
            }}>{props.name}</Paragraph>
        </View>
    </TouchableOpacity>
}
function HomeScreen({ navigation }: Props) {
    const [items, setItems] = React.useState<Item[]>([]);
    const [searchQuery, onChangeSearch] = React.useState<string>("");
    React.useEffect(() => {
        console.log("executed")
        let _items = itemExamples.map((v, i) => {
            return {
                id: i,
                src: v,
                price: Math.round(Math.random() * 100)
            };
        });
        setItems(_items);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={e => onChangeSearch(e as any)}
                value={searchQuery}
                autoComplete={false}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[
                        "categoria 1",
                        "categoria 2",
                        "categoria 3",
                        "categoria 4",
                    ]}
                    renderItem={({ item }) =>
                        <View2 name={item} />
                    }
                    horizontal
                    keyExtractor={(item, index) => item}
                />

                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{
                            flex: 1
                        }} onPress={() => {
                            Alert.alert("card", "prueba" + item.price);
                        }}>
                            <Card>
                                <Card.Image source={{
                                    uri: item.src
                                }}>

                                </Card.Image>
                                <Card.Divider />
                                <Card.Title>Precio: {item.price}</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <Container padding={10}>


            </Container>

        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});

export default HomeScreen;