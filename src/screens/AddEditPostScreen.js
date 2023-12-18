import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, TextInput, Text, useWindowDimensions, Keyboard } from "react-native";
import { styles } from "../styles/StyleSheet";
import AnimatedIconComponent from "../components/AnimatedIconComponent";
import ImagesScrollView from "../components/ImagesScrollView";
import { handleCreateNewPost, handleGetPost, handleUpdatePost } from "../firebase/firebaseOperations";


function AddEditPostScreen({ navigation, route }) {

    const { user } =  useContext(PostContext)

    const [ post, setPost ] = useState();

    const [ isJustOpened, setIsJustOpened ] = useState(true)

    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImageCount, setUploadedImageCount] = useState(0);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        const update = async () => {
            try {
                if (!route.params.isNew && isJustOpened) {
                    const foundPost = await handleGetPost(route.params.id)
                    setPost(foundPost)
                    setTitle(foundPost.title)
                    setContent(foundPost.content)
                    setUploadedImageCount(foundPost.uploadedImageCount)
                    setIsJustOpened(false)
                }
            } catch (error) {
                console.log(error)
            }
        };

        update();

    }, [navigation, route.params, isJustOpened]);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <AnimatedIconComponent iconName="save" onPress={() => {
                        const newPost = {
                            category: route.params.category,
                            title: title,
                            content: content,
                            author: user.name + " " + user.lastName,
                            timestamp: new Date(),
                            isEdited: !route.params.isNew,
                            uploadedImageCount: uploadedImageCount
                        };
                        this.onPress;
                        if (!route.params.isNew) {
                            handleUpdatePost(user.uid, post.id, newPost)
                            navigation.navigate('Post', { id: route.params.id, category: route.params.category})
                        } else {
                            let newId = handleCreateNewPost( user.uid, newPost)
                            navigation.replace('Post', { id: newId, category: route.params.category})
                        }
                    }} />
                    <AnimatedIconComponent iconName="closecircleo" onPress={() => navigation.goBack()} />
                </View>
            ),
            
        });
        
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
        
    }, [navigation, title, content, uploadedImageCount]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', borderWidth: 5, borderColor: '#176B87' }}>
             
            <TextInput
                style={[styles.titleStyle, 
                    {marginTop: 10, borderWidth: 2, borderColor: '#89CFF3', borderStyle: 'solid'}]}
                multiline
                placeholder="Write title here..."
                placeholderTextColor="#89CFF3"
                value={title}
                onChangeText={setTitle}
            />
            
            {!isKeyboardVisible && <ImagesScrollView uploadedImageCount={uploadedImageCount} width={windowWidth - 20} />}

            <View style={{flex: 1, marginLeft: 20, marginRight: 20, marginTop: 20, borderWidth: 2, borderColor: '#89CFF3', borderStyle: 'solid'}}>
            <TextInput
                style={{
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}
                multiline
                placeholder="Write text here..."
                placeholderTextColor="#89CFF3"
                value={content}
                onChangeText={setContent}
            />
            </View>
            {!isKeyboardVisible && (
            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20}}>
                <Text style={{
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}>Attachments:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
                    <AnimatedIconComponent iconName="paperclip" onPress={() => setUploadedImageCount(uploadedImageCount + 1)} />
                    <AnimatedIconComponent iconName="close" onPress={() => (uploadedImageCount > 0) ? setUploadedImageCount(uploadedImageCount - 1) : setUploadedImageCount(uploadedImageCount)} />
                </View>
                
            </View>)}

            
        </View>
    );
}

export default AddEditPostScreen;
