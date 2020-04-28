import firebase from "firebase";

var config = {
  apiKey: "AIzaSyA-dKnonqPsc_ZW3vdHziezZsL8gtmjXwA",
  authDomain: "archeo-pai.firebaseapp.com",
  databaseURL: "https://archeo-pai.firebaseio.com",
  projectId: "archeo-pai",
  storageBucket: "archeo-pai.appspot.com",
  messagingSenderId: "699982653836",
  appId: "1:699982653836:web:896e37000466b5c06c8ea9",
};

var fire = firebase.initializeApp(config);
export default fire;