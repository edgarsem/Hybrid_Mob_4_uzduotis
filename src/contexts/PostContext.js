import React, {createContext, useState} from "react";
import uuid from 'react-native-uuid';

const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [ user, setUser ] = useState({
        uid: null,
        name: null,
        lastName: null
    });

    const categories = [
        'Hardware',
        'Software',
        'Security',
        'Accessories',
        'Marketplace',
        'Reviews',
        'Maintenance',
        'Others',
    ];

    const setUserData = (newUser) => {
        setUser(newUser);
    };

    return (
        <PostContext.Provider value = {{ categories, user, setUserData }}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };