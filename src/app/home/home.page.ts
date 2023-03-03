import { Component, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { faTablets } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { isPlatform } from '@ionic/vue';

// isPlatform('ios'); // returns true when running on a iOS device
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  faTablets = faTablets;
  faCapsules = faCapsules;
  faArrowRight = faArrowRight;
  faBell = faBell;
  slideOptions = {
    initialSlide: 1,
    slidesPerView: 1,
  };
  count = 0;
  DEFAULT_NUM_WEEKS = 1;
  DEFAULT_MAX_DAYS = 5;
  DEFAULT_MIN_DATE = new Date(2000, 0, 1);
  numWeeks = this.DEFAULT_NUM_WEEKS;
  maxDays = this.numWeeks * this.DEFAULT_MAX_DAYS;
  minDate = this.DEFAULT_MIN_DATE;
  selectedDay: any;
  firstDay: any = new Date();
  lastDay: any = new Date();
  month: any;
  year: any;
  weeks: any = [];
  dates: any = [];
  // $scope.$watch('week-view', function () {
  //     buildDates();
  // });

  constructor() {
    this.buildDates();
    console.log('abc');
  }

  nextDays() {
    this.firstDay = {};
    this.firstDay = moment(this.lastDay).add(1, 'days');
    this.lastDay = {};
    this.lastDay = moment(this.firstDay).add(this.maxDays - 1, 'days');

    // this.lastDay = moment(this.lastDay).add(this.maxDays, 'days');
    this.buildDates();
    console.log('def', this.lastDay);
  }
  onSlideChange() {
    console.log('hi');
    this.count = this.count + 1;
    if (this.count > 50) {
      this.nextDays();
      this.count = 0;
    }
  }

  previousDays() {
    this.firstDay = moment(this.firstDay).subtract(this.maxDays, 'days');
    this.lastDay = moment(this.firstDay).subtract(1, 'days');
    this.buildDates();
    console.log('ghi');
  }

  buildDates() {
    this.slideOptions['initialSlide'] = 1;
    console.log('buildDates');
    this.month = moment(this.firstDay).format('MMMM');
    this.year = moment(this.firstDay).format('YYYY');
    this.weeks = [];
    console.log('buildDates2');

    var index = 0;
    var dates = [];
    console.log('buildDates3');

    do {
      console.log('buildDates do');
      var dateAux = moment(this.firstDay).add(index, 'days');
      var date = {
        dayName: dateAux.format('ddd'),
        day:
          dateAux.format('D').length === 1
            ? '0' + dateAux.format('D')
            : dateAux.format('D'),
        value: dateAux.toDate(),
        active:
          this.selectedDay && dateAux.isSame(moment(this.selectedDay), 'day'),
        disabled: dateAux.isBefore(moment(this.minDate), 'day'),
        month: '',
      };

      const monthNames = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      date.month = monthNames[new Date(`${date.value}`).getMonth()];
      dates.push(date);
      index++;
      if (index % 5 === 0) {
        // console.log('this.dates', dates);
        this.weeks.push({ dates: dates });
        dates = [];
      }
    } while (index < this.maxDays);

    // console.log('123');
    // console.log('dates ', dates);
  }
}
