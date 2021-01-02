import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good * 100) / all;
  const Statistics = ({ all, average, positive }) => {
    if (all !== 0) {
      return (
        <>
          <h1>Statistics</h1>
          <p>Good:{good}</p>
          <p>Bad:{bad}</p>
          <p>Neutral:{neutral}</p>
          <p>all:{all}</p>
          <p>average:{average} </p>
          <p>positive:{positive + '%'}</p>
        </>
      );
    } else {
      return <h3>No Feedback Given.</h3>;
    }
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <Statistics all={all} average={average} positive={positive} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
