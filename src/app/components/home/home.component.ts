import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  historyy = '../../../assets/HistoryDark.svg';
  equal = '../../../assets/equalL.svg';
  expression: string = '0';
  result: string = '';
  history: (string | number)[] = [];
  expressionHistory: (string | number)[] = [];

  title = 'light';
  isDarkTheme = false;

  togglebutton() {
    this.isDarkTheme = !this.isDarkTheme
    if (this.title == "light") {
      this.title = "dark";
      this.historyy = '../../../assets/HistoryLight.svg';
      this.equal = '../../../assets/equalD.svg';
    }
    else {
      this.title = "light"
      this.historyy = '../../../assets/HistoryDark.svg';
      this.equal = '../../../assets/equalL.svg';
    }
  }

  appendValue(value: string) {
    this.expression += value;
  }

  lastOperator: string = '';


  appendOperator(operator: string) {
    if (operator === '(' || operator === ')') {
      this.expression += operator;
    } else {
      if (this.lastOperator !== '') {
        this.expression = this.expression.slice(0, -1) + operator;
      } else {
        this.expression += operator;
      }
      this.lastOperator = operator;
    }
  }

  calculate() {
    try {
      if (this.expression.trim() === "") {
        this.expression = '0';
      } else {
        if (this.expression[0] === '0' && this.expression.length > 1 && !isNaN(Number(this.expression[1]))) {
          this.expression = this.expression.substr(1);
        }
        this.result = eval(this.expression).toString();
      }
      this.history.push(this.result);
      this.expressionHistory.push(this.expression)
    } catch (error) {
      this.result = 'Error';
    }
  }


  clear() {
    this.expression = '';
    this.result = '';
  }

  /*showHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {

      for (const item of this.history) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `${this.expression} = ${item}`;
        historyContainer.appendChild(historyItem);
      }
    }
  }*/

  showHistory() {
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
      for (let i = 0; i < this.history.length; i++) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `${this.expressionHistory[i]} = ${this.history[i]}`;
        historyContainer.appendChild(historyItem);
      }
    }
  }


}
