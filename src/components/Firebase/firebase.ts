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

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.storage = firebase.storage()
  }

  logout = () => this.auth.signOut();

  loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      return this.auth
        .signInWithPopup(provider);
    }
    catch (error) {
      console.log("Error login in: ", JSON.stringify(error));
    }
  };

  coins = () => this.db.ref('coins');
  empires = () => this.db.ref('empires');
  locations = () => this.db.ref('locations');
  positions = () => this.db.ref('positions');
  images = () => this.storage.ref('images');

  addCoin = async (coin: any) => {
    const newKey = await this.db.ref('coins').push().key;
    const newcoin = {
      [String(newKey)]: coin,
    };
    await this.db.ref('coins').update(newcoin);

    return newKey;
  };

  addEmpire = async (empire: any) => {
    const newKey = await this.db.ref('empires').push().key;
    const newEmpire = {
      [String(newKey)]: empire,
    };
    await this.db.ref('empires').update(newEmpire);

    return newKey;
  };

  addLocation = async (location: any) => {
    const newKey = await this.db.ref('locations').push().key;
    const newLocation = {
      [String(newKey)]: location,
    };
    await this.db.ref('locations').update(newLocation);

    return newKey;
  };
}

export default Firebase;
