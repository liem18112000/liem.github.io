// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKAJq5o_JcjDUQ3yh2B0krUUExI4kW5Hc",
    authDomain: "library-9dad9.firebaseapp.com",
    databaseURL: "https://library-9dad9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "library-9dad9",
    storageBucket: "library-9dad9.appspot.com",
    messagingSenderId: "501318956265",
    appId: "1:501318956265:web:f497fc04e1f5ffc2b8ec78",
    measurementId: "G-WXG0HG9EKG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function writeUserData(userId, name, email, imageUrl) {
    console.log("Add user " + userId)
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function readUserData(userId, fn){
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(userId).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Get user : " + userId);
            fn(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function writeNewPost(userId, name, title, header, content, topic) {
    // A post entry.
    var postData = {
        author: name,
        userID: userId,
        topic : topic,
        title: title,
        header: header,
        content : content,
        starCount: 0
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + userId + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

function readAllPosts(fn) {
    const dbRef = firebase.database().ref().child("posts");
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Get post");
            if(fn){
                fn(snapshot);
            }else{
                getPost(snapshot)
            }
            
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function queryPost(key, value, fn){
    const dbRef = firebase.database().ref().child("posts").orderByChild(key).equalTo(value)
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Get post with " + key + " = " + value );
            fn(snapshot);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function getPost(posts){

    posts.forEach((post) => {
        console.log(post.val())
    })
}

function loadPost(post) {
    var header = document.getElementById('header')
    header.innerHTML = post.val().header
    var content = document.getElementById('content')
    content.innerHTML = post.val().content
}