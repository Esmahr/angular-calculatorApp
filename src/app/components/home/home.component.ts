import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  expression: string = '0';
  title = 'light';
  result: string = '';
  lastOperator: string = '';
  errorMessage: string = '';
  history: (string | number)[] = [];
  expressionHistory: (string | number)[] = [];

  historyIconDark = '../../../assets/HistoryDark.svg';
  historyIconLight = '../../../assets/HistoryLight.svg';
  historyIcon = this.historyIconDark;
  equalDark = '../../../assets/equalD.svg';
  equalLight = '../../../assets/equalL.svg';
  equalIcon = this.equalLight;

  togglebutton() {
    if (this.title == "dark") {
      this.title = "light";
      this.historyIcon = this.historyIconDark;
      this.equalIcon = this.equalLight;
    }
    else {
      this.title = "dark"
      this.historyIcon = this.historyIconLight;
      this.equalIcon = this.equalDark;
    }
  }

  appendValue(value: string) {
    if ((this.expression === '0' || this.expression === '00') && value !== '.') {
      this.expression = value;
    } else {
      if (value === '.' && (this.expression === '' || this.lastOperator !== '')) {
        this.expression += '0.';
      } else {
        this.expression += value;
      }
    }
  }

  appendOperator(operator: string) {
    const validOperators = ['+', '-', '*', '/', '%'];
  
    if (this.expression === '0') {
      if (validOperators.includes(operator) || operator === '(') {
        this.expression += operator;
      }
      return;
    }
  
    const lastChar = this.expression.slice(-1);
  
    if (validOperators.includes(operator)) {
      if (validOperators.includes(lastChar)) {
        // Replace the last operator with the new operator
        this.expression = this.expression.slice(0, -1) + operator;
      } else {
        this.expression += operator;
      }
    } else if (operator === '(') {
      if (lastChar === '' || lastChar === '(' || validOperators.includes(lastChar) || /^\d$/.test(lastChar)) {
        this.expression += operator;
      }
    } else if (operator === ')') {
      const openParenCount = (this.expression.match(/\(/g) || []).length;
      const closeParenCount = (this.expression.match(/\)/g) || []).length;
  
      if (openParenCount > closeParenCount && lastChar !== '(' && !validOperators.includes(lastChar)) {
        this.expression += operator;
      }
    }
  
    this.lastOperator = operator;
  }
  

  calculate() {
    try {
      if (this.expression.trim() === "") {
        this.expression = '0';
      } else {
        if (this.expression[0] === '0' && this.expression.length > 1 && !isNaN(Number(this.expression[1]))) {
          this.expression = this.expression.substr(1);
        }

        const openParenCount = (this.expression.match(/\(/g) || []).length;
        const closeParenCount = (this.expression.match(/\)/g) || []).length;

        if (openParenCount !== closeParenCount) {
          this.errorMessage = 'Parntezi kapatın.';

        } else {
          this.result = eval(this.expression).toString();
        }
      }

      this.history.push(this.result);
      this.expressionHistory.push(this.expression);
    } catch (error) {
      this.result = 'Error';
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
    this.lastOperator = '';
  }

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
