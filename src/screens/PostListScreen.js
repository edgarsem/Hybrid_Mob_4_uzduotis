import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { FlatList, View, Text, Pressable } from "react-native";
import { styles } from "../styles/StyleSheet";
import Icon from "react-native-vector-icons/AntDesign";
import { handleGetCategoryPosts } from "../firebase/firebaseOperations";
import { useFocusEffect } from "@react-navigation/native";

function PostListScreen({ navigation, route }) {
    const [ posts, setPosts ] = useState([]);
    // const posts = handleGetCategoryPosts(route.params.category)


    const timeStampSpecifier = (isEdited) => {
        return isEdited ? "Posted " : "Edited"
    }


    useFocusEffect(
        React.useCallback(() => {

            handleGetCategoryPosts(route.params.category).then(posts => {
                setPosts(posts)
            }).catch(error => {
                console.log(error);
            });

            return () => {
            };
        }, [route.params.category])
    );



    useEffect(() => {

        navigation.setOptions({
            name: route.params.category,
            headerRight: () => (
            <View style={styles.headerButtonContainer}>
                <Pressable style={{marginLeft: 20}} onPress={() => 
                    navigation.navigate('Edit Post', { isNew: true, category: route.params.category})
                    }>
                    <Icon name="pluscircleo" size={40} color="#fff" />
                </Pressable>
           </View>
            )
        });
        }, [navigation]);


    const imageIcon = (imageCount) => {
        if(imageCount > 0)
            return(
                <View style={{
                    flexDirection: 'row', marginRight: 20,
                    }}>
                    <Icon name='picture' size={20} color='#176B87' />
                    <Text style={{fontSize: 12,
                        color: '#006399',
                        fontWeight: '600'
                    }}>+{imageCount}</Text>
                </View>
            );
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable 
                    onPress={() => 
                        navigation.navigate('Post', { id: item.id, category: route.params.category})
                    }
                >
                    <View style={styles.buttonContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[styles.titleStyle, {flexGrow: 1}]} numberOfLines={1} ellipsizeMode="tail">
                                {item.title}
                            </Text>
                            {imageIcon(item.uploadedImageCount)}
                        </View>
                        <Text style={styles.contentHomeTextStyle}
                            numberOfLines={2} ellipsizeMode="tail">
                            {item.content}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.contentStyle}>
                                {item.author} 
                            </Text>
                            <Text style={styles.contentStyle}>
                                {timeStampSpecifier(item.isEdited)}: {item.timestamp.getHours()}:{item.timestamp.getMinutes()}   {item.timestamp.getFullYear()}-{item.timestamp.getMonth()+1}-{item.timestamp.getDate()}  
                            </Text>
                        </View>
                    </View>
                </Pressable>
            )}
            />
        </View>
    );
};

export default PostListScreen;

