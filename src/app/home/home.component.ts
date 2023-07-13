import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  historyy = 'History';
  divided = '/';
  multiplication = '*';
  expression: string = '';
  result: string = '';
  history: string[] = [];

  title = 'light';
  isDarkTheme = false;

  togglebutton() {
    this.isDarkTheme = !this.isDarkTheme
    if (this.title == "light") {
      this.title = "dark";
    }
    else {
      this.title = "light"
    }
  }



  appendValue(value: string) {
    this.expression += value;
  }

  appendOperator(operator: string) {
    this.expression += operator;
  }

  calculate() {
    try {
      this.result = eval(this.expression);
      this.history.push(this.result);
    } catch (error) {
      this.result = 'Error';
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
  }

  showHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {

      for (const item of this.history) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `${this.expression} = ${item}`;
        historyContainer.appendChild(historyItem);
      }
    }
  }

}
