def maxProfit(prices):
    right = 1
    max_profit = 0

    if len(prices) <= 1:
            return max_profit

    for price in prices:
        next_day_price = prices[right]
        if next_day_price > price:
            max_profit += next_day_price - price
        if right < len(prices) - 1:
            right += 1
    
    return max_profit
