import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the FirebaseDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const GROCERY_PATH = '/list/';
const UPDATE_CHECKED_PATH = '/checked/';

@Injectable()
export class FirebaseDataProvider {

  private groceryListRef: firebase.database.Reference;
  public groceryList:    any[] = [];

  constructor() {
    console.log('Hello FirebaseDataProvider Provider');

    this.groceryListRef = firebase.database().ref(GROCERY_PATH);
    this.groceryListRef.on('value', grocerySnap => {
      this.groceryList = grocerySnap.val();
    })
  }

  loadInitialData(): Promise<any> {
    return this.groceryListRef.once('value', (grocerySnap) => {
      this.groceryList = grocerySnap.val();
    })
  }

  addItem(item: any) {
    console.log("save item not complete");
    console.log("Item: " + JSON.stringify(item));
    this.groceryListRef.push(item);

    // this.groceryListRef.(item);
  }

  updateDB(item, value) {
    this.groceryListRef.child(item).set(value);
  }

  updateItemChecked(item, value) {
    let itemPath = item + UPDATE_CHECKED_PATH;
    this.groceryListRef.child(itemPath).set(value);
  }

  removeItem(item) {
    this.groceryListRef.child(item).remove();
  }


  getGroceryListRef() {
    console.log("getGroceryListRef not complete");

  }
}
