import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>;

const Anecdote = ({text, votes}) => {
  return (
    <>
      <p>{text}</p><p>has {votes} votes</p>
    </>
  );
};

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const randIndex = Math.floor(Math.random()*anecdotes.length);
  const [currentIndex, setCurrentIndex] = useState(randIndex);
  const [mostVotedIndex, setMostVoted] = useState(randIndex);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const newAnecdote = () => {
    setCurrentIndex(Math.floor(Math.random()*anecdotes.length));
  };

  const upvote = () => {
    const newArray = [...votes];
    newArray[currentIndex] += 1;
    setMostVoted(newArray[currentIndex] > newArray[mostVotedIndex] ? currentIndex : mostVotedIndex);
    setVotes(newArray);
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[currentIndex]} votes={votes[currentIndex]}/>
      <Button handleClick={upvote} text='vote'/>
      <Button handleClick={newAnecdote} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]}/>
    </div>
  );
};

export default App;