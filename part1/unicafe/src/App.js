import { useState } from 'react'

const goodText = 'good';
const neutralText = 'neutral';
const badText = 'bad';

const Header = ({text}) => <h1>{text}</h1>;

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>;

const Statistics = ({good, neutral, bad}) => {
  const noFeedBack = (good + neutral + bad) === 0;
  const displayAverage = () => noFeedBack ? 0 : (good - bad) / (good + neutral + bad);
  const goodPercentage = () => noFeedBack ? 0 : (good / (good + neutral + bad)) * 100 + ' %';

  if (noFeedBack) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <table>
          <tbody>
            <StatisticsLine text={goodText} value={good}/>
            <StatisticsLine text={neutralText} value={neutral}/>
            <StatisticsLine text={badText} value={bad}/>
            <StatisticsLine text='all' value={good + neutral + bad}/>
            <StatisticsLine text='average' value={displayAverage()}/>
            <StatisticsLine text='positive' value={goodPercentage()}/>
          </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={() => setGood(good + 1)} text={goodText}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutralText}/>
      <Button handleClick={() => setBad(bad + 1)} text={badText}/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;