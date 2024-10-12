import yfinance as yf
import pandas as pd
import os
import matplotlib.pyplot as plt  

# Check if the CSV file already exists
if os.path.exists("sp500.csv"):
    sp500 = pd.read_csv("sp500.csv", index_col=0)
    sp500.index = pd.to_datetime(sp500.index)  
else:
   
    sp500 = yf.Ticker("^GSPC")
    sp500 = sp500.history(period="max")
    
    
    sp500.to_csv("sp500.csv")
    
    
    sp500.index = pd.to_datetime(sp500.index)


sp500.plot.line(y="Close", use_index=True)
plt.title("S&P 500  Closing Prices over the years") 
plt.xlabel("Years")  
plt.ylabel("Closing Price ($)")  
plt.grid()  
plt.show()  #


if "Dividends" in sp500.columns:  # Check if column exists before deleting
    del sp500["Dividends"]
if "Stock Splits" in sp500.columns:  # Check if column exists before deleting
    del sp500["Stock Splits"]
