import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { addAnecdoteOf, addVoteOf } from './reducers/anecdoteReducer'
import { notificationCreater, notificationDelete } from './reducers/notificationReducer'

const App = () => {
  const anecdotesInitial = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const anecdotes = [...anecdotesInitial].sort((b, a) => {
    return a.votes - b.votes
  })
  const vote = (id,anecdotes) => {
    dispatch(addVoteOf(id))
    dispatch(notificationCreater(anecdotes))
    setTimeout(() => {
      dispatch(notificationDelete())
  }, 5000)
  }
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value=''
    dispatch(addAnecdoteOf(content))
    dispatch(notificationCreater(content))
    setTimeout(() => {
      dispatch(notificationDelete())
  }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification />
      <AnecdoteList anecdotes={anecdotes} vote={vote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App