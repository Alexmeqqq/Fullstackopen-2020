import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = ({ text, votes = 0 }) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const [mostVotes, setMostVotes] = useState(0);
  const handleAnecdotes = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(random);
  };

  //console.log(copy);

  const handleVoteAnecdote = () => {
    const selectedVoteCount = votes[selected] || 0;
    setVotes({
      ...votes,
      [selected]: selectedVoteCount + 1,
    });
    if (!votes[mostVotes] || selectedVoteCount + 1 > votes[mostVotes]) {
      setMostVotes(selected);
    }
  };
  // increment the value in position 2 by one
  console.log();
  return (
    <div>
      <h1>Anecodote of the day:</h1>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => handleAnecdotes()}>Next</button>
      <button onClick={() => handleVoteAnecdote()}>Vote</button>
      <h2>Anecdote with most Votes:</h2>
      <Anecdote text={props.anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
