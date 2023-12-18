import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, Text, useWindowDimensions, Animated, ScrollView } from "react-native";
import { styles } from "../styles/StyleSheet";
import AnimatedIconComponent from "../components/AnimatedIconComponent";
import ImageScrollView from "../components/ImagesScrollView";
import { handleCheckIfUserPost, handleDeletePost, handleGetPost } from "../firebase/firebaseOperations";
import { useFocusEffect } from "@react-navigation/native";

function PostScreen({ navigation, route }) {

    const { user } = useContext(PostContext)

    const [ post, setPost ] = useState({ author: '', title: '', content: '', category: '', uploadedImageCount: 0, id: '' });

    const [ isUserPost, setIsUserPost ] = useState()

    const { width: windowWidth } = useWindowDimensions();
    


    useFocusEffect(
        React.useCallback(() => {
            handleGetPost(route.params.id).then(foundPost => {
                setPost(foundPost);
            }).catch(error => {
                console.error(error);
            });

            handleCheckIfUserPost(user.uid, route.params.id).then(isChild => {
                setIsUserPost(isChild);
            }).catch(error => {
                console.error(error);
            });

            return () => {
            };
        }, [route.params.id])
    );


    useEffect(() => {
        console.log(isUserPost)
        if (isUserPost !== undefined){
            navigation.setOptions({
                headerRight: () => isUserPost ? (
                    <View style={styles.headerButtonContainer}>
                        <AnimatedIconComponent iconName="edit" onPress={() => 
                            navigation.navigate('Edit Post', { id: route.params.id, isNew: false, category: route.params.category})} 
                        />
                        <AnimatedIconComponent iconName="delete" onPress={() => {
                            handleDeletePost(user.uid, route.params.id);
                            navigation.goBack();}}
                        />
                </View>
                ) : null
            });
        }
    }, [navigation, route.params.id, isUserPost]);


    return (
        <View style={[styles.container, {flexDirection: 'column'}]}>
            <Text style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 17,
                color: '#176B87',
                fontWeight: '600',
            }}>
                {post.author}
            </Text>
            <Text style={[styles.titleStyle, {marginTop: 10, marginBottom: 10}]}>
                {post.title}
            </Text>
            <ImageScrollView uploadedImageCount={post.uploadedImageCount} width={windowWidth - 20}/>
            <ScrollView>
                <Text style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    alignSelf: 'flex-start',
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}>
                    {post.content}
                </Text>
            </ScrollView>
        </View>
      );

  }

  export default PostScreen;