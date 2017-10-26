import { Component } from '@angular/core';
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

  private newItem: string = '';
  private deleteMode: boolean = false;

  constructor(private firebaseData: FirebaseDataProvider,
              private toastCtrl: ToastController) {
    console.log(this.firebaseData.groceryList);
  }

  saveItem(item: any) {
    this.firebaseData.saveItem(item);
  }

  removeItem(item: string) {
    let toastText = '';

    try {
      this.firebaseData.removeItem(item);
      toastText = item + REMOVE_TEXT;
      this.presentToast(toastText);

    } catch (e) {
      toastText = REMOVE_FAILED_TEXT + item;
      this.presentToast(toastText);
    }
  }

  updateItemChecked(item, value) {
    this.firebaseData.updateDB(item, value);
  }

  addItem(item) {
    let toastText = '';
    this.newItem = '';

    try {
      this.firebaseData.updateDB(item, false);
      toastText = item + ADD_TEXT;
      this.presentToast(toastText);

    } catch (e) {
      toastText = ADD_FAILED_TEXT + item;
      this.presentToast(toastText);
    }
  }

  keys(): Array<string> {
    return Object.keys(this.firebaseData.groceryList);
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present()
  }
}
