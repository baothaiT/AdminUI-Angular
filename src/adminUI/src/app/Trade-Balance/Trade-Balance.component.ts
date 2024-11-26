import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-Trade-Balance',
  templateUrl: './Trade-Balance.component.html',
  styleUrls: ['./Trade-Balance.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TradeBalanceComponent implements OnInit {
  title = 'Trade Balance';
  items = [
    { name: 'Item 1', checked: false },
    { name: 'Item 2', checked: false },
    { name: 'Item 3', checked: false },
  ];

  checked = true;
  constructor() { }

  ngOnInit() {
  }

  Confirm(item: { checked: boolean }) {
    item.checked = !item.checked; // Toggle the checked value
    console.log('Item checked status:', item.checked); // Log the updated value
  }

  Console()
  {
    console.log(this.checked);
  }

}
