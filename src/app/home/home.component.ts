import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  expression: string = '';
  result: string = '';

  appendValue(value: string) {
    this.expression += value;
  }

  appendOperator(operator: string) {
    this.expression += operator;
  }

  calculate() {
    try {
      this.result = eval(this.expression);
    } catch (error) {
      this.result = 'Error';
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
  }

  showHistory() {
    const history = [
      { expression: '2+2', result: '4' },
      { expression: '3*5', result: '15' },
      { expression: '8-6', result: '2' }
    ];
  
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
      historyContainer.innerHTML = ''; // Eski içeriği temizle
  
      for (const item of history) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `${item.expression} = ${item.result}`;
        historyContainer.appendChild(historyItem);
      }
    }
  }
  
}
