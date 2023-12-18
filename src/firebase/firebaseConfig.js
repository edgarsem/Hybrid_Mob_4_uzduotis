import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSVI96ImdZzgACFpNu66TS50QBZZQlPnY",
  authDomain: "fir-example-cf25d.firebaseapp.com",
  databaseURL: "https://fir-example-cf25d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-example-cf25d",
  storageBucket: "fir-example-cf25d.appspot.com",
  messagingSenderId: "381708511269",
  appId: "1:381708511269:web:7833c94f1bbec38d5437cc",
  measurementId: "G-ZMW503XY7M"
};

const app = firebase.initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app)

export { database, auth };

