import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  historyy = 'History';
  divided = '/';
  multiplication = '*';
  expression: string = '';
  result: string = '';
  history: string[] = [];

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
      historyContainer.innerHTML = ''; // Eski içeriği temizle
  
      for (const item of this.history) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `${this.expression} = ${item}`;
        historyContainer.appendChild(historyItem);
      }
    }
  }
  
}
