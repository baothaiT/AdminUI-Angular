import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TradeService } from './../../shared/services/historyOrderTrading/trade.service';
import { HistoryOrderTradeInterface } from '../../shared/interfaces/HistoryOrderTrade-interface';
import { HistoryOrderTradingEnum } from '../../shared/common/Enums/HistoryOrderTradingEnum';

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
  historyOrderTradeDisplay: HistoryOrderTradeInterface[] = [];
  historyOrderTradeOrginal: HistoryOrderTradeInterface[] = [];
  constructor(private tradeService: TradeService) { }

  sideDropDownName = 'All';
  symbolPrefixDropDownName = "All TOKEN";
  isresolveDropDownName = 'All STATUS';

  _total = 0;

  _sortOrderPrice :HistoryOrderTradingEnum = HistoryOrderTradingEnum.None;


  isDisplay_OrderTime = true;
  isDisplay_Side = true;
  isDisplay_OrderValue = true;
  isDisplay_Fee = true;

  ngOnInit() {
    this.tradeService.setSide("");
    this.fetchTradesLoop('');
  }

  Confirm(item: { id: string, isResovlve: number }) {
    item.isResovlve = item.isResovlve == 1 ? 2 : 1;
    this.tradeService.changeIsResolve(item.id).subscribe(
      (data) => { },
      (error) => {
        console.error('Error in component:', error);
      });
    this.getTotalCoinExisting();
  }

  FormatList(inputData: HistoryOrderTradeInterface[]): HistoryOrderTradeInterface[] {
    return inputData.map(item => {
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
  fetchTradesLoop(side: string): void {
    this.tradeService.setSide(side);
    this.tradeService.getTrade(5000).subscribe((trades) => {
      this.historyOrderTradeDisplay = this.FormatList(trades);
    });
  }
  setSide(side: string) {
    this.sideDropDownName = side;
    this.tradeService.setSide(this.sideDropDownName);
    this.tradeService.getByParam().subscribe((trades) => {
      this.historyOrderTradeDisplay = this.FormatList(trades);
    });
  }

  setSymbolPrefix(symbolPrefix: string) {
    this.symbolPrefixDropDownName = symbolPrefix;
    this.tradeService.setSymbolPrefix(this.symbolPrefixDropDownName);
    this.tradeService.getByParam().subscribe((trades) => {
      this.historyOrderTradeDisplay = this.FormatList(trades);
    });
    this.getTotalCoinExisting();
  }

  setIsresolveDropDownName(isresolveDropDownName: string) {
    this.isresolveDropDownName = isresolveDropDownName;
  }
  genIsResolve(item: { isResovlve: number }): boolean {
    if (item.isResovlve == 1)
      return true;
    return false;
  }
  setIsResolve(isResovlve: number) {
    switch (isResovlve) {
      case 1: {
        //statements; 
        this.isresolveDropDownName = 'Resolved';
        break;
      }
      case 2: {
        //statements; 
        this.isresolveDropDownName = 'Not Yet';
        break;
      }
      default: {
        //statements; 
        this.isresolveDropDownName = 'ALL STATUS';
        break;
      }
    }
    this.tradeService.setIsResolve(isResovlve);
    this.tradeService.getByParam().subscribe((trades) => {
      this.historyOrderTradeDisplay = this.FormatList(trades);
    });
  }

  getTotalCoinExisting(): number {

    this._total = this.historyOrderTradeDisplay.reduce((sum, x) => {
      if (x.side === 'BUY' && x.isResovlve != 1 && x.symbol_Prefix == this.symbolPrefixDropDownName) {
        return sum + Number(x.filledAndTotal_Suffix_Value); // Or sum + x.someValue if you want to total a specific property
      }
      return sum; // Skip items that don't meet the condition
    }, 0);
    return this._total;
  }
  SortOrderPrice()
  {
    if(this._sortOrderPrice == HistoryOrderTradingEnum.OrderPrice_Asc)
    {
      this._sortOrderPrice = HistoryOrderTradingEnum.OrderPrice_Desc;
    }
    else
    {
      this._sortOrderPrice = HistoryOrderTradingEnum.OrderPrice_Asc;
    }
    this.tradeService.setColSortName(this._sortOrderPrice);
    this.tradeService.getByParam().subscribe((trades) => {
      this.historyOrderTradeDisplay = this.FormatList(trades);
    });
  }
  
}

