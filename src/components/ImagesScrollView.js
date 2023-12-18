import React, { useRef } from "react";
import { View, Image, Animated, SafeAreaView, ScrollView } from "react-native";

function ImagesScrollView( params ) {

    const scrollX = useRef(new Animated.Value(0)).current;
    

    const renderer = () => {
        if(params.uploadedImageCount > 0) {
            return(
                <SafeAreaView>
                    <View style={{
                        height: 300,
                            borderWidth: 5,
                            borderColor: '#176B87',}}>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{
                                    nativeEvent: {
                                        contentOffset: {
                                            x: scrollX,
                                        },
                                    },
                                }],
                                { useNativeDriver: false }
                            )}
                            scrollEventThrottle={1}>
                            {new Array(params.uploadedImageCount).fill().map((_, imageIndex) => {
                                return (
                                <Image key={imageIndex} style={{width: params.width, height: 300 }} source={require('../assets/default_2.jpg')}/>
                                )
                            }) 
                            }
                    </ScrollView>
                    </View>
                    </SafeAreaView>
                );
        }

    };

    return(
        renderer()
    );

}


export default ImagesScrollView;