import { useState } from "react";

const Anecdote = ({ anecdotes, votes, selected }) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  );
};

const HighestVoteAnecdote = ({ anecdotes, votes, selected }) => {
  const votesMax = votes.reduce(
    (accum, currentVal) => Math.max(accum, currentVal),
    -Infinity,
  );
  const selectedMax = votes.indexOf(votesMax);
  return (
    <Anecdote anecdotes={anecdotes} votes={votes} selected={selectedMax} />
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomNumber = () => Math.trunc(Math.random() * anecdotes.length);
  const updateSelected = () => {
    setSelected((prev) => getRandomNumber());
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <button onClick={handleVotes}>vote</button>
      <button onClick={updateSelected}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <HighestVoteAnecdote
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
    </div>
  );
};

export default App;
