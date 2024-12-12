import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  steps = [
    {
      imagePath: 'assets/images/step-1.png', // Path to the image for Step 2
      stepNumber: 'Step 1 ',
      title: 'Subscribe',
      description: "Select a subscription plan that suits your child's learning needs and preferences."
    },
    {
      imagePath: 'assets/images/step-2.png', // Path to the image for Step 2
      stepNumber: 'Step 2',
      title: 'Personalise Your Box',
      description: "Tell us about your child's age, interests, and learning goals, and we'll customize their surprise box accordingly."
    },
    {
      imagePath: 'assets/images/step-3.png', // Path to the image for Step 2
      stepNumber: 'Step 3',
      title: 'Receive Your Surprise Box',
      description: "Sit back and relax as your child eagerly awaits the arrival of their monthly surprise box filled with engaging learning materials."
    }
  ];

  constructor(private navCtrl: NavController) { }
  goToSubscription() {
    this.navCtrl.navigateForward('/subscription');
  }
}
