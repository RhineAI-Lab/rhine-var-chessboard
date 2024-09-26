import React from 'react'
import {rhineProxy, useRhine} from 'rhine-var'

const url = 'room-0'
const defaultValue = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  rounds: 0
}
const state = rhineProxy(defaultValue, url, true)

export default function Game() {
  const snap = useRhine(state)

  const next = snap.rounds % 2 === 0 ? 'X' : 'O'
  const status = `Next player: ${next}`

  return <div className='game'>
    <div className='game-board'>
      <div className='status'>{status}</div>
      {snap.board.map((row, i) => (
        <div key={i} className='board-row'>
          {row.map((col, j) => (
            <button key={j} className='square' onClick={() => {
              if (!state.board[i][j]) {
                state.board[i][j] = next
                state.rounds++
              }
            }}>
              {snap.board[i][j]}
            </button>
          ))}
        </div>
      ))}
    </div>
  </div>
}
