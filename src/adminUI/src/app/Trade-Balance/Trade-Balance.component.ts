import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TradeService } from './../../shared/services/historyOrderTrading/trade.service';
import { HistoryOrderTradeInterface } from '../../shared/interfaces/HistoryOrderTrade-interface';

@Component({
  standalone: true,
  selector: 'app-Trade-Balance',
  templateUrl: './Trade-Balance.component.html',
  styleUrls: ['./Trade-Balance.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TradeBalanceComponent implements OnInit {
  title = 'Trade Balance';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  historyOrderTrade: HistoryOrderTradeInterface[] = [];
  constructor(private tradeService: TradeService) 
  { }

  ngOnInit() {
    this.fetchHistoryOrderTrade();
    console.log(this.historyOrderTrade);
    
  }

  Confirm(item: { id: string, isResovlve: boolean }) {
    item.isResovlve = !item.isResovlve; // Toggle the checked value

    this.tradeService.changeIsResolve(item.id).subscribe({
      next: (isResolved) => console.log('Success:', isResolved),
      error: (err) => console.error('Failed:', err.message),
    });
  }

  FormatList()
  {
    this.historyOrderTrade = this.historyOrderTrade.map(item => {
      const formattedDatetime = new Date(item.orderTime)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      return {
        ...item,
        orderTime: formattedDatetime,
      };
    });
   }

  fetchHistoryOrderTrade(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.tradeService.getTrades().subscribe({
      next: (historyOrderTrade: HistoryOrderTradeInterface[]) => {
        this.historyOrderTrade = historyOrderTrade;
        this.isLoading = false;
        this.FormatList();
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load history order trade. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
