import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Topic } from 'src/app/models/topic';
import { DateUtilities } from 'src/app/utils/date-utils';


@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.page.html',
  styleUrls: ['subscription.page.scss'],
})
export class SubscriptionPage {
  topics: Topic[] = [
    { name: 'Arabic', selected: false },
    { name: 'Islamic', selected: false },
    { name: 'English', selected: false },
    { name: 'History', selected: false },
    { name: 'Sports', selected: false },
  ];
  genderOptions = [
    { label: 'Boy', value: 'boy', selected: false },
    { label: 'Girl', value: 'girl', selected: false },
  ];
  subscriptionForm: FormGroup;


  selectedGender: string = 'boy';
  selectedCount = 0;
  showTooltip: boolean[] = new Array(this.topics.length).fill(false);  // Tooltip visibility for each topic
  isSmallScreen: boolean = window.innerWidth < 768; // Check if screen size is small
  selectedMonth: string = DateUtilities.months[new Date().getMonth()]; // Default to current month
  selectedYear: number = DateUtilities.currentYear; // Default to current year
  selectedDay: number = new Date().getDate(); // Default to today's date
  daysInMonth: number[] = DateUtilities.getDaysInMonth(this.selectedMonth, this.selectedYear);
  months = DateUtilities.months;
  years = DateUtilities.years;


  constructor(private fb: FormBuilder) {

    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      childName: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      grade: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 768;
  }

  onMonthChange() {    
    this.updateDays();
  }

  onYearChange() {
    this.updateDays();
  }

  updateDays() {
    this.daysInMonth = DateUtilities.getDaysInMonth(this.subscriptionForm.value.month, this.subscriptionForm.value.year);
    if (this.subscriptionForm.value.day > this.daysInMonth.length) {
      this.subscriptionForm.value.day  = this.daysInMonth[this.daysInMonth.length - 1]; // Ensure the selected day is valid
    }
  }

  onTopicSelect(topic: Topic, event: Event, index: number) {
    if (this.selectedCount < 3 || topic.selected) {
      if (topic.selected) {
        this.selectedCount--;
      } else {
        this.selectedCount++;
      }
      topic.selected = !topic.selected;

      // Hide tooltip once selection is made
      this.showTooltip[index] = false;
    } else {
      // Show tooltip if user tries to select more than 3 topics
      this.showTooltip[index] = true;

      // Hide the tooltip after 2 seconds
      setTimeout(() => {
        this.showTooltip[index] = false;
      }, 2000);
    }
  }
  onGenderSelect(option: any, index: number) {
    // Set the form control's value
    this.subscriptionForm.patchValue({ gender: option.value });

    // Update the selection state of the gender options
    this.genderOptions.forEach((opt, i) => {
      if (i === index) {
        opt.selected = true;
      } else {
        opt.selected = false; // Deselect others when one is selected
      }
    });
  }
}
