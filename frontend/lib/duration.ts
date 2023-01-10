export const Duration = (value: number) => {
   return {
      get second() {
         return value * 1000;
      },
      get seconds() {
         return value * 1000;
      },
      get minute() {
         return this.seconds * 60;
      },
      get minutes() {
         return this.seconds * 60;
      },
      get hour() {
         return this.minutes * 60;
      },
      get hours() {
         return this.minutes * 60;
      },
      get day() {
         return this.hours * 24;
      },
      get days() {
         return this.hours * 24;
      },
      get week() {
         return this.days * 7;
      },
      get weeks() {
         return this.days * 7;
      },
      get month() {
         return this.days * 30;
      },
      get months() {
         return this.days * 30;
      },
      get year() {
         return this.days * 365;
      },
      get years() {
         return this.days * 365;
      },
   };
};
