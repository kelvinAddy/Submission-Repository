import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>
      {text} {value}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const updateAverage = () => {
    return (good + neutral * 0 + bad * -1) / (good + neutral + bad);
  };

  const updatePostiveFeedback = () => {
    return (
      Math.round(((good * 100) / (good + neutral + bad)) * 100) / 100 + " %"
    );
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h1>statistics</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={good + neutral + bad} />
        <StatisticsLine text={"average"} value={updateAverage()} />
        <StatisticsLine text={"positive"} value={updatePostiveFeedback()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    setGood(good + 1);
  };

  const updateNeutral = () => {
    setNeutral(neutral + 1);
  };

  const updateBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button onClick={updateGood} text={"good"} />
      <Button onClick={updateNeutral} text={"neutral"} />
      <Button onClick={updateBad} text={"bad"} />
      {good | neutral | bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feeback given</p>
      )}
    </div>
  );
};

export default App;
