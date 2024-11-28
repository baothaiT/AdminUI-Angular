export interface HistoryOrderTradeInterface {
    id: string,
    symbol_Prefix: string,
    symbol_Suffix: string,
    orderTime: string,
    side: string,
    fillAndOrderPrice_Prefix: string,
    fillAndOrderPrice_Suffix: string,
    filledAndTotal_Prefix_Value: string,
    filledAndTotal_Prefix_Symbol: string,
    filledAndTotal_Suffix_Value: string,
    filledAndTotal_Suffix_Symbol: string
    filledAndOrderValue_Prefix: string,
    fee: string,
    isResovlve: boolean
}