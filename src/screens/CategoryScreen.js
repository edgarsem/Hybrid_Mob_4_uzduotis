import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { FlatList, View, Text, Pressable } from "react-native";
import { styles } from "../styles/StyleSheet";
import { handleGetCategoryPostCount } from "../firebase/firebaseOperations";
import { useFocusEffect } from "@react-navigation/native";

function CategoryScreen({ navigation }) {

    const { user, categories } = useContext(PostContext);

    const [ categoryCounts, setCategoryCounts ] = useState([])


    const getPostAmountPerCategory = (index) => {
        return categoryCounts[index]
    }

    useFocusEffect(
        React.useCallback(() => {

            handleGetCategoryPostCount().then(categoryCount => {
                console.log(categoryCount);
                setCategoryCounts(categoryCount)
            }).catch(error => {
                console.log(error);
            });

            return () => {
            };
        }, [])
    );


    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
            <View style={{marginRight: 20}}>
                <Text style={{color: 'white', fontWeight: 500, fontSize: 18}}>
                    Welcome {user.name}!
                </Text>
           </View>
            )
        });
        }, [navigation]);


    return (
        <View style={styles.container}>
            <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => ( 
                <Pressable 
                    onPress={() => 
                        navigation.navigate('Posts', { category: item })
                    }
                >
                    <View style={styles.buttonCategoryContainer}>
                        <Text style={styles.titleStyle}>{item}</Text>
                        <Text style={styles.categoryScreenPostCountStyle}>
                            {getPostAmountPerCategory(categories.indexOf(item))}
                        </Text>
                    </View>
                </Pressable>
            )}
        />
        </View>
    );
};

export default CategoryScreen;

