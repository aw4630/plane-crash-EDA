**EXPLORATORY DATA ANALYSIS ON ALL FATAL COMMERCIAL JETLINER INCIDENTS**

Database used: [ASN](https://asn.flightsafety.org/asndb/types/CJ)
Used Selenium library to scrape Javascript-generated HTML site 
Below is the code used for scraping and formatting my .csv file
**[Scraping code](docs/ASNscraper.ipynb)**



As part of my exploratory data analysis, I wanted to ask 20 important and relevant questions relating to fatal commerical aviation incidents that have occurred worldwide.
The questions include:
- *Are certain aircraft models statistically more dangerous to fly on?*
- *Is there a correlation between aircraft age and likelihood of being in a fatal accident?*
- *Does time of day have an effect on fatal plane crashes?*
- *What was the deadliest year in commerical aviation?*
- *During what phase of flight (e.g., Takeoff, Landing, En route) are fatal incidents most frequent?* 
- *Does phase of flight impact severity of the incident (# of fatalities)?* 
- *What are some of the most frequent causes of commercial plane crashes?*


To answer these questions, I examined the **[dataset](docs/cleaned_asndb.csv)** and conducted data analysis using significance tests, linear regression, time series analysis, and NLP. The full report can be viewed with my PDF file and I also created a page with dashboards using Microsoft Power BI.
