import React from 'react';
import Link from 'next/link';

function DataAnalysisPage() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '0px',
      fontFamily: "'Roboto', sans-serif",
      background: '#ecf0f1',
      minHeight: '100vh',
      padding: '5px'
    }}>
      <h1 style={{ fontSize: '40px', fontWeight: '700', color: '#2c3e50' }}>
        Data Analysis Page
      </h1>

      <div>
        <p> User must sign into Power BI to view my data visualization dashboard with interactive maps and charts (scroll for data analysis)</p>
      </div>
      {/* Back to Home Link */}
      <div style={{ marginTop: '10px' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: '500', color: '#2980b9', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>

      {/* Embed Power BI Dashboard */}
      <iframe
        title="planecrasheda"
        width="1200"
        height="600"
        src="https://app.powerbi.com/reportEmbed?reportId=a2c6767a-d2e2-48a5-bdfe-b3d374224b84&autoAuth=true&embeddedDemo=true"
        frameBorder="0"
        allowFullScreen={true}
        style={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          marginTop: '20px'
        }}
      ></iframe>

      {/* Data Analysis Section */}
      <div style={{ marginTop: '40px', textAlign: 'left', padding: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#2c3e50' }}>1. What are the main causes of fatal plane crashes?</h2>
        <img src="/graph1.png" alt="Distribution of Primary Causes" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        <p>The chart above shows the distribution of the primary causes of fatal plane crashes. 
          The three most common causes include pilot error, mechanical failure, and sabotage, which account for roughly 78% of all fatal incidents. 
          <br/><br/>
          - <i>Pilot error: 44.6%</i> <br/>
          - <i>Mechanical failure: 18.4%</i><br/>
          - <i>Sabotage: 14.5%</i><br/>
          - <i>Weather: 9.7%</i><br/>
          - <i>Unknown: 4.7%</i><br/>
          - <i>ATC error: 4.7%</i><br/>
          - <i>Other: 3.4%</i>
          <br/><br/>
          <strong>IMPORTANT DEFINITIONS</strong>
          <br/><strong>Pilot error:</strong> This occurs when the pilot makes a mistake that leads to an accident. It can include misjudgment during takeoff, flight, or landing, incorrect handling of the aircraft, improper decision-making, or failure to follow standard operating procedures.
          <br/><i>ex:  Forgetting to drop gear for landing, misunderstanding air traffic control instructions, flying into hazardous weather conditions without adequate preparation, failing to read instruments properly</i>
          <br/>
          <br/><strong>Mechanical failure:</strong> This refers to accidents caused by the malfunction or failure of an aircraft’s components or systems. It can result from design flaws, manufacturing defects, maintenance errors, or wear and tear.
          <br/><i>ex: Catastrophic engine failure, hydraulic system breakdown, faulty/incorrect critical instrument readings, structural failures like a wing detaching mid-flight</i>
          <br/>
          <br/><strong>Sabotage:</strong> Sabotage involves deliberate acts intended to cause harm. This can include terrorism, hijacking, or intentional damage to the aircraft.
          <br/><i>ex: Pilot suicide, explosions/bombings, hijackings, and other acts of terrorism or homicide</i>
          <br/>
          <br/><strong>Weather:</strong> Incidents caused by adverse weather conditions that make flying hazardous. Severe weather can affect visibility, aircraft handling, and flight safety.
          <br/><i>ex: Severe thunderstorms, microbursts, heavy fog, icing on the wings, turbulence, lightning strikes</i>
          <br/>
          <br/><strong>Unknown:</strong> Incidents where the cause could not be determined from investigation, or lack thereof. This can be due to the lack of sufficient evidence or information to identify the primary cause.
          <br/><i>ex: Disappeared aircraft, missing flight recorders, lack of eyewitness accounts, incomplete wreckage</i>
          <br/>
          <br/><strong>ATC error:</strong> These incidents occur due to mistakes made by air traffic controllers in managing the aircraft's flight path, providing incorrect instructions, or failing to detect potential conflicts between aircraft.
          <br/><i>ex: Failure to warn of upcoming hazards, two aircraft directed into same ground/airspace, incorrect altitude guidance</i>
          <br/>
          <br/><strong>Other:</strong> This category includes accidents that do not fit into the other defined causes. It can involve rare or unusual circumstances that lead to death(s).
          <br/><i>ex: Heart attacks, bird strikes, runway incursions, ground crew errors</i>
          <br/>

          
          
          </p>

        <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#2c3e50' }}>2. Are certain airliner models or manufacturers statistically deadlier? Boeing vs Airbus</h2>
        <img src="/graph2.png" alt="Deadliest Aircraft Manufacturers" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        <p>This graph depicts number of fatalities for the top 5 aircraft manufacturers in the last 10 years (2014-2024). While some manufacturers have higher fatality rates, this data does not imply direct causation and should be analyzed in context with other factors which may include: market share of manufacturer, age of manufacturer, aircraft type and size. 
        <br/> <br/>According to Statista, in 2024, there are more than 28,000 commercial aircraft in service worldwide, but the number of jetliners is unknown and unfortunately I cannot find reliable data on that metric on the internet.
        <br/> <br/>However, I am able to compare Boeing and Airbus aircraft (all jetliners) that are in service, with 10218 and 13636 aircraft in operation respectively in 2023. I also have this service data directly from Airbus and Boeing for the last 10 years, excluding 2021-2022 (source: Boeing.com, Airbus.com). I have calculated a fatality rate, which is calculated by taking number of fatalities divided by number of aircraft in service.
        <br/>
        <img src="/graph21.png" alt="Fatality rates Boeing v Airbus" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />

        <br/><br/>Boeing Fatalities (2014-2023): 1422
        <br/>Airbus Fatalities (2014-2023): 704
        <br/><br/>Fatality Rate for Boeing (2014-2023): 0.01479 deaths per aircraft in service
        <br/>Fatality Rate for Airbus (2014-2023): 0.00950 deaths per aircraft in service<br/>
        <br/> I conducted a two-proportion Z-test with a two-tailed p-value set at 0.05 (pooled proportion for Airbus and Boeing) to determine if one manufacturer is statistically deadlier than the other.
        <br/><br/> <strong>Z-stat:</strong> 9.46, <strong>p-value:</strong> 0.0000000000 <br/> 
        <br/> <strong>Interpretation:</strong> Boeing airliners have statistically more deaths than Airbus airliners. The probability that the difference in deaths between Boeing vs Airbus is due to chance is extremely low, nearly impossible. This means that there exist some external factors other than chance that make Boeing aircraft deadlier.
        <br/>
        <br/> However, this includes data of MH370, or Malaysia Airlines Flight 370, which disappeared over the Indian Ocean on Mar 8 2014 without a trace with 239 souls on board, the cause of which has yet to be determined ten years later, with the victims never being found. What if we exclude this unknown case, which is unfavorable to Boeing, from our Z-test calculation?
        <br/>
        <br/> <strong>Adjusted Z-stat:</strong> 4.3258, <strong>adjusted p-value:</strong> 0.0000151979
        <br/> 
        <br/> <strong>Interpretation:</strong> After excluding MH370, although the Z-stat has decreased a lot, we are still about 4 standard deviations from the expected deaths of Boeing vs Airbus airliners. The extremely low p-value indicates there is a 0.0015% probability that the difference in deaths between Boeing and Airbus airlines is due to chance. This indicates that Boeing airliners, accounting for number of planes in service and excluding unknown cases, still are statistically deadlier than Airbus airliners in the last 10 years.
        <br/>
        <br/> <strong>Possible explanation #1 (THE GOOD):</strong> <i>"Boeing is not responsible, their aircraft are older"</i>
        <br/> Boeing's commercial airliner divison has been in operation since 1963 when the Boeing 707 went into service. Airbus's first aircraft, the A300, only came into service in 1974, with lower production numbers compared to Boeing until about 20 years ago. Now, the number of Airbus aircraft in service has surpassed Boeing. It should be noted that older aircraft (mid to end-of-life) tend to require more maintanence and tend to be involved in more accidents (see question 3 below). The oldest aircraft in U.S. airline fleets tend to be Boeing aircraft: <a href="https://www.nasdaq.com/articles/oldest-youngest-average-fleet-age-10-major-us-airlines-2017-07-03#">(link)</a> This is also a trend with airlines in other countries as well, which have older fleets due to lack of capital for investment in new aircraft, and possibly looser regulations, leading to a higher rate of fatal incidents with Boeing jetliners<br/>

        <br/> <strong>Possible explanation #2 (THE BAD):</strong> <i>"Boeing is responsible, because of negligence"</i>
        <br/> Boeing's negligent business practices has directly led to at least two of their aircraft being lost, totaling 346 deaths (Lion Air Flight 610 in 2018, Ethiopian Airlines 302 in 2019). The Boeing 737 MAX was marketed to airlines as a new model that required minimal training for pilots; Boeing did not mention in 737 MAX manuals about the implementation of the new MCAS software which would override a pilot's manual inputs when high nose-up attitude was detected. Furthermore, whistleblowing about poor build quality and defects has brought to light more possibles issues with Boeing's aircraft.
        <br/>
        <br/> <strong>Possible explanation #3 (THE UGLY):</strong> <i>"Not enough data/other factors"</i>
        <br/> We have looked at a small excerpt of data comparing the current state of commercial jetliner aviation from 2014-2023. This snippet of 10 years may not be enough of a sample size to derive meaningful insights about whether Boeing or Airbus is deadlier. It should be noted that it is hard to derive these insights because the market share of Boeing and Airbus has differed over the years, with Airbus's number of aircraft overtaking that of Boeing within the last 5 years.
          With a field as complex as modern commercial aviation, there are hundreds, possibly thousands of external factors that may influence why planes crash (ex: weather, hijacking, ATC error, heart attacks, ground incidents, unknown factors, etc). Again, my goal is to show statistical significance here, not to determine if there is a causal relationship between Boeing as a company and their aircraft being involved in statistically more deaths than other manufacturers.
        
        </p>

        <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#2c3e50' }}>3. Is there a relationship between airframe hours and the likelihood of being in a fatal accident?</h2>
        <img src="/graph3.png" alt="Relationship between Aircraft Hours and Fatalities" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        <p>This is a binned plot which tries shows the relationship between airframe hours and fatalities. Airframe hours are defined as an aircraft's time in flight. 
        <br/>
        <br/> Now you may be asking, why are the bins uneven? Doesn't that skew the data? Well we must take into account the domain of commercial aviation. I have provided an explanation below:
        <br/><br/>
        <strong>Early life (0-5000 hours)</strong><br/>
        Aircraft in their early stages of use may be more susceptible to initial teething problems and unexpected failures. By using narrower bins in this range (500-1000 hour increments), we can examine if there is a higher frequency of incidents during these specific teething phases, which would suggest that early-life operational risk needs more detailed scrutiny. We must consider that during the initial few thousand hours (0–5000 hours), aircraft undergo regular checks, each varying in complexity. Binning with smaller ranges in this early phase (e.g., 500 hour increments) allows us to capture fatal incidents that might be linked to manufacturing defects or other errors common in new aircraft, such as a pilot's unfamiliarity with the aircraft.
        <br/>
        <br/>
        <strong>Mid-life (5000-20000 hours)</strong><br/>
        As aircraft enter their mid-life (around 5000–20000 hours), maintenance becomes more routine, and failure rates typically stabilize. Larger bins (e.g., 5000-10000 hour increments) are used here because the changes in risk are more gradual and influenced by cumulative effects such as wear and tear, aging, and component fatigue.<br/>

        <br/>
        <strong>End-of-life (20000+ hours)</strong><br/>
        Certain key milestones in an aircraft’s life, such as reaching 20k hours, often coincide with major maintenance checks (like D-checks, which are extensive and occur every 6–10 years). These checks involve deep inspections and overhauls of aircraft components. These checks can lead to more points of failure and indicate that the aircraft would likely not be operational if not for the proper maintanence.
        These aircraft often operate under different economic pressures. They may be operated by budget airlines, less developed regions, or smaller carriers that could be under greater economic constraints, potentially impacting maintenance quality or operational protocols. Using wider bins in this phase (e.g., 10,000-hour increments) is effective because the incidents in these bins may relate to operational and economic factors that affect a broader range of aircraft ages and usage patterns.
        <br/>
        <br/><strong>What can we take from this data?</strong><br/>
        In practice, if we modeled with even bins, we would notice that fewer incidents occur at extreme airframe hours, while more incidents might cluster around the middle-higher age ranges. Uneven bins help accommodate this distribution by providing finer granularity where incidents are more frequent (early life) and less granularity where incidents are sparse (high airframe hours). This makes it easier to detect patterns that would otherwise be diluted if evenly sized bins were used throughout. Remember that this is historical data dating all the way back to the 1950s, where airliner safety was in its infancy. Much of the fatal incident data involving aircraft from 0-5k hours is derived from the beginnings of the Jet Age. It is less common in the 21st century for aircraft in early life to have fatal incidents. Of the 20 latest airliner crashes in my database, only two fatal incidents involved an aircraft with less than 5k hours. If we plot for only the last 10 years, the relationship becomes even more apparent:
        <br/>
        <img src="/graph31.png" alt="Relationship between Aircraft Hours and Fatalities" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        
        <br/>
        <br/>Looking back at the original graph, it is evident that in the initial 0-500 hours of flight time, a bump of fatal incidents will occur due to the young relative age of the aircraft, decreasing until rate of fatal incidents hits another bump around the 2k hour mark. What we can take from this data is that after 5k hours, airliners will experience a stabilization in fatal incidents around mid-life. Once the aircraft enters end-of-life, reaching the 20k+ range, they are more prone to fatal incidents, which makes sense when one factors in increased maintenance and wear-and-tear on the airframe as well as general outdatedness of the aircraft.
        </p>

        <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#2c3e50' }}>4. Is commercial aviation getting safer over time? </h2>
        <img src="/graph41.png" alt="Deadliest Year in Aviation" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        <p>This scatterplot illustrates the total fatalities per year since jetliner aviation began in 1952. We can see that fatalities in commerical jetliner aviation grew rapidly in the 1970s, peaking in 1985 with 1,930 deaths in one year, the deadliest year for commercial aviation in history. In the 1990s, deaths per year began to decline and that is a trend the industry has followed since.
        <br/>
        <br/> Regression line equation: Fatalities = -3.1459 * Year + 6862.7003 <br/>
        Correlation coefficient (r): -0.1516
        <br/>

        <br/> The parabolic shape of this scatterplot lacks context and affects the regression line because of the rapid increase (positive slope) of fatalities in the dawn of the jet age (1960s-1970s). What happens if we filter for the last 30 years of data?
        <br/>
        <img src="/graph42.png" alt="Deadliest Year in Aviation" style={{ width: '80%', margin: '20px 0', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
        <br/>
        <br/> Regression line equation: Fatalities = -28.1468 * Year + 57029.0410<br/>
        Correlation coefficient (r): -0.7254
        <br/>
        <br/> As we can see there's a strong negative linear relationship for fatalities over the last 30 years. Note: This data includes the deaths from the four plane crashes on 9/11/2001, excluding deaths on the ground (remember I do include terrorism/sabotage as a primary cause in my database). The commercial aviation industry is getting safer every year, and using this equation to predict future fatalities, we can expect just 31.71 deaths on commerical jetliners in 2025. Obviously this linear relationship is not so extreme that we should take this data to heart, and the very fact that we have fewer jetliner deaths (fewer data points) over the last 30 years means that this model can be prone to overfitting. So, take the prediction with a grain of salt, because a large commercial jetliner such as a Boeing 747 going down with 300+ passengers will end up making this negative linear relationship (and correlation r-value) weaker.
        <br/><br/>
        There's a saying in the world of aviation that goes like this: The advancements and regulations in the commercial aviation industry are written in blood. What it means, is the information contained and safety advancements made are there because someone before you has done something which created an unsafe situation that probably resulted in loss of life. It took the lives of thousands of people over the last 70+ years so that we can having our current state of commercial aviation today...
        <br/> 

        </p>


      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: '40px' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: '500', color: '#2980b9', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DataAnalysisPage;
