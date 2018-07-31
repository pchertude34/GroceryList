import { Component, Input, ViewChild } from '@angular/core';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { ToastController } from 'ionic-angular';

const REMOVE_TEXT = ' removed';
const REMOVE_FAILED_TEXT = 'Failed to remove ';
const ADD_TEXT = ' added';
const ADD_FAILED_TEXT = 'Failed to add ';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('itemInput') itemInput;

  private newItem: string = '';
  private oldItem: string = '';
  private deleteMode: boolean = false;
  private editMode: boolean = false;

  constructor(private firebaseData: FirebaseDataProvider,
              private toastCtrl: ToastController) {
    console.log(JSON.stringify(this.firebaseData.groceryList));
  }

  // remove an item from the firebase DB by key.
  removeItem(item: string) {
    let toastText = '';

    try {
      this.firebaseData.removeItem(item);
      // toastText = item + REMOVE_TEXT;
      // this.presentToast(toastText);

    } catch (e) {
      toastText = REMOVE_FAILED_TEXT + item;
      this.presentToast(toastText);
    }
  }

  // update the checked value of an item to firebase
  updateItemChecked(item, value) {
    console.log(item);
    console.log(value);
    this.firebaseData.updateItemChecked(item, value);
  }

  // add an item to firebase. Default value to false
  addItem(item) {
    let toastText = '';
    this.newItem = '';

    try {

      // toastText = item + ADD_TEXT;

      // if (this.editMode) {
      //   this.removeItem(this.oldItem);
      //   this.editMode = false;
      // }

      let itemToAdd = {name: item, checked: false};
      this.firebaseData.addItem(itemToAdd);
      // this.firebaseData.updateDB(item, false);

      // this.presentToast(toastText);

    } catch (e) {
      toastText = ADD_FAILED_TEXT + item;
      this.presentToast(toastText);
    }
  }

  editItem(item) {
    console.log("Edit item not ready yet: " + item);
    this.itemInput.setFocus();
    this.newItem = item;
    this.editMode = true;
    if (!this.itemInput.isFocus()) {
      this.editMode = false;
      console.log('here');
    }
    this.oldItem = item;
  }

  // create a list of key/values for ngFor
  keys(): Array<string> {
    return Object.keys(this.firebaseData.groceryList);
  }

  // toast to show actions on screen
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present()
  }
}
