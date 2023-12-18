import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { child, onValue, push, ref, remove, set, update } from 'firebase/database';
import { database } from './firebaseConfig';
import { PostContext } from '../contexts/PostContext';

export const handleCreateUser = (uid, name, lastName) => {
    const postData = {
        name: name,
        lastName: lastName,
        posts: []
    };
    const updates = {};
    updates['user/' + uid] = postData;
    update(ref(database), updates);
    const userData = {
        uid: uid,
        name: name,
        lastName: lastName
    };
    return userData
}

export const handleGetUserData = (uid) => {
    return new Promise((resolve, reject) => {
        const userRef = ref(database, 'user/' + uid);
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = {
                    uid: uid,
                    name: snapshot.val().name,
                    lastName: snapshot.val().lastName
                };
                resolve(userData);
            } else {
                reject("User data not found");
            }
        }, (error) => {
            reject(error);
        });
    });
};



export const handleGetCategoryPostCount = () => {
    return new Promise((resolve, reject) => {
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
        const categoryCount = Array(categories.length).fill(0)
        const starCountRef = ref(database, 'user/');
        onValue(starCountRef, (snapshot) => {
          snapshot.forEach((userSnapshot) => {
            const posts = userSnapshot.child('posts');
            posts.forEach((postSnapshot) => {
                const postCategory = postSnapshot.val().category;
                const categoryIndex = categories.indexOf(postCategory);
                categoryCount[categoryIndex] += 1;
            });
          });
          resolve(categoryCount);
        }, (error) => {
            reject(error);
        });
    })
    
}

export const handleGetCategoryPosts = (category) => {
    return new Promise((resolve, reject) => {
        const posts = [];
        const starCountRef = ref(database, 'user/');
        onValue(starCountRef, (snapshot) => {
            snapshot.forEach((userSnapshot) => {
                const userPosts = userSnapshot.child('posts');
                userPosts.forEach((postSnapshot) => {
                    if (postSnapshot.val().category === category) {
                        let date = new Date(postSnapshot.val().timestamp);
                        const newPost = {
                            id: postSnapshot.key,
                            category: postSnapshot.val().category,
                            title: postSnapshot.val().title,
                            content: postSnapshot.val().content,
                            author: postSnapshot.val().author,
                            timestamp: date,
                            isEdited: postSnapshot.val().isEdited,
                            uploadedImageCount: postSnapshot.val().uploadedImageCount
                        };
                        posts.push(newPost);
                    }
                });
            });
            resolve(posts);
        }, (error) => {
            reject(error);
        });
    });
};

export const handleCheckIfUserPost = (uid, postId) => {
    let isChild = null
    return new Promise((resolve, reject) => {
        const postsRef = ref(database, 'user/' + uid + '/posts');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                isChild = snapshot.hasChild(postId);
            } else {
                isChild = false;
            }
            resolve(isChild);
        }, (error) => {
            reject(error);
        })
    })
}

export const handleGetPost = (postId) => {
    return new Promise((resolve, reject) => {
        let foundPost = null
        const userRef = ref(database, 'user/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach((userSnapshot) => {
                const posts = userSnapshot.child('posts');
                const postSnapshot = posts.child(postId);
                if (postSnapshot.exists()) {
                    let date = new Date(postSnapshot.val().timestamp);
                    foundPost = {
                        id: postSnapshot.key,
                        category: postSnapshot.val().category,
                        title: postSnapshot.val().title,
                        content: postSnapshot.val().content,
                        author: postSnapshot.val().author,
                        timestamp: date,
                        isEdited: postSnapshot.val().isEdited,
                        uploadedImageCount: postSnapshot.val().uploadedImageCount
                    };
                }
            });
            resolve(foundPost);
        }, (error) => {
            reject(error);
        });
    }); 
}

export const handleCreateNewPost = (uid, postData) => {
    console.log('')
    const newPostKey = push(child(ref(database), 'user/' + uid + '/posts/')).key
    const updates = {};
    updates['user/' + uid + '/posts/' + newPostKey + '/'] = postData;
    update(ref(database), updates);
    return newPostKey
}

export const handleUpdatePost = (uid, postId, postData) => {
    console.log('')
    return update(ref(database, 'user/' + uid + '/posts/' + postId), postData)   
}

export const handleDeletePost = (uid, postId) => {
    console.log('' + postId)
    return remove(ref(database, "user/" + uid + "/posts/" + postId))
}