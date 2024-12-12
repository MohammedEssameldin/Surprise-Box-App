export class DateUtilities {

    static months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    static currentYear: number = new Date().getFullYear();
    static years: number[] = Array.from({ length: 50 }, (_, i) => DateUtilities.currentYear - i);
  
    static getDaysInMonth(month: string, year: number): number[] {
      const monthIndex = DateUtilities.months.indexOf(month);
    
      const daysInMonth = new Date(year, monthIndex+1 , 0).getDate(); // Handles leap years automatically
      console.log(monthIndex +1,year);
      console.log(Array.from({ length: daysInMonth }, (_, i) => i + 1));

      return Array.from({ length: daysInMonth }, (_, i) => i + 1); // Starts at 1, not 0
    }
    
  }
  