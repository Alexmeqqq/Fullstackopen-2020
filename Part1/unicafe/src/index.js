import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good * 100) / all;
  const Button = (props) => {
    return <button onClick={props.onClick}>{props.name}</button>;
  };
  const Statistic = (props) => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  };
  const Statistics = ({all, average, positive}) => {
    if (all !== 0) {
      return (
        <>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <Statistic text="Good" value={good} />
              <Statistic text="Bad" value={bad} />
              <Statistic text="Neutral" value={neutral} />
              <Statistic text="All" value={all} />
              <Statistic text="Average" value={average} />
              <Statistic text="Positive" value={positive} />
            </tbody>
          </table>
        </>
      );
    } else {
      return <h3>No Feedback Given.</h3>;
    }
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="Good" onClick={() => setGood(good + 1)} />
      <Button name="Bad" onClick={() => setBad(bad + 1)} />
      <Button name="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Statistics all={all} average={average} positive={positive} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
