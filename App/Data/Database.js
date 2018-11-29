import PersonalRechords from './PersonalRechords';

import firebase from 'firebase';

export default class Database {
    constructor() {
        database = firebase.database();
    }

    addRechord(rechordObject) {
        database.ref('rechords/').set(rechordObject).then(() => {
            console.log("added rechord!");
        });
    }

    main() {
        this.addRechord(PersonalRechords[0]);
    }
}

