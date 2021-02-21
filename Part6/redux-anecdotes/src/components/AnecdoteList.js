import React from 'react'
import {useSelector} from 'react-redux'
const AnecdoteList = ({anecdotes,vote}) => {
    const msg = useSelector(state => state.filter)
    return (
        <div>
            
            {anecdotes.filter(e => e.content.toLowerCase().includes(msg.toLowerCase())).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
