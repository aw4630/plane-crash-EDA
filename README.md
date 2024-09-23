**FULL-STACK WEB APP AND EXPLORATORY DATA ANALYSIS OF FATAL COMMERCIAL JETLINER INCIDENTS**


Database scraped: [ASN](https://asn.flightsafety.org/asndb/types/CJ)\
*Used Selenium library to scrape Javascript-generated HTML site \
Below is the code used for scraping and formatting my .csv file*

**[Scraping code and explanation](backend/ASNscraper.ipynb)**


As part of my exploratory data analysis, I wanted to ask important questions relating to fatal commerical aviation incidents that have occurred worldwide and provide valuable aviation safety insights.
The questions include:

- *Are certain aircraft models/manufacturers statistically more dangerous to fly on?*
- *Is there a correlation between aircraft hours and likelihood of being in a fatal accident?*
- *What was the deadliest year in commerical aviation?*
- *During what phase of flight (e.g., Takeoff, Landing, En route) are fatal incidents most frequent?* 
- *Does phase of flight impact severity of the incident (# of fatalities)?* 
- *What are some of the most frequent causes of commercial plane crashes?*


To answer these questions, I examined the **[dataset](final_cleaned_asndb.csv)** which I scraped and processed, conducting data analysis using significance tests, linear regression, and time series analysis(REPORT IN PROGRESS). The full report,  with dashboards created using Microsoft Power BI, can be viewed on my full-stack webpage which includes also a page where the user can query my PostgreSQL database to filter and sort incidents. WEBSITE HERE: **(https://planecrasheda.vercel.app)**

