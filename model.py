#import yFinance as yf
import pandas as pd
import os
import json

# Check if the CSV file already exists
if os.path.exists("sp500.csv"):
    sp500 = pd.read_csv("sp500.csv", index_col=0)
    sp500.index = pd.to_datetime(sp500.index)  
else:
    sp500 = yf.Ticker("^GSPC")
    sp500 = sp500.history(period="max")
    sp500.to_csv("sp500.csv")
    sp500.index = pd.to_datetime(sp500.index)

# Selecting specific parts (for example: closing prices and volumes for the last 5 years)
filtered_data = sp500.loc[sp500.index >= '2018-01-01', ['Close', 'Volume']]
filtered_data.reset_index(inplace=True)
filtered_data['Date'] = filtered_data['Date'].astype(str)  # Convert dates to strings for JSON serialization

# Export to JSON
with open("sp500_data.json", "w") as f:
    json.dump(filtered_data.to_dict(orient="records"), f)
