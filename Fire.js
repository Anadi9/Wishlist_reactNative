/* eslint-disable prettier/prettier */
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/auth';


const firebaseConfig = {
    apiKey: 'AIzaSyAvMW72NyHoR6Paduhf-SHG60Wa71DvMa0',
    authDomain: 'wishlist-9ddf4.firebaseapp.com',
    databaseURL: 'https://wishlist-9ddf4.firebaseio.com',
    projectId: 'wishlist-9ddf4',
    storageBucket: 'wishlist-9ddf4.appspot.com',
    messagingSenderId: '642794643453',
    appId: '1:642794643453:web:3e8e0c609e9500c6ee0394',
};
  
class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                    callback(error);
                });
            }
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

     getLists(callback) {
        let ref = firebase.firestore().collection('users').doc(this.userId).collection('lists');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            const lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

}

export default Fire;
