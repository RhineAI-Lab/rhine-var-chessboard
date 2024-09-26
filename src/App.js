import React from 'react';
import {rhineProxy, useRhine} from "rhine-var";

const url = 'ws://localhost:6600/room-0'
const defaultValue = {
    squares: Array(10).fill(null),
    rounds: 0
}
const gameState = rhineProxy(defaultValue, url);

const Game = () => {
    const snap = useRhine(gameState);

    const handlePlay = (i) => {
        const winner = calculateWinner(snap.squares);
        console.log("snap.rounds % 2", snap.rounds % 2);
        if (winner || snap.squares[i]) return;
        snap.squares[i] = snap.rounds % 2 === 0 ? 'X' : 'O';
        snap.rounds += 1;
    };

    const winner = calculateWinner(snap.squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${snap.rounds % 2 === 0 ? 'X' : 'O'}`;

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                {[0, 1, 2].map(row => (
                    <div key={row} className="board-row">
                        {[0, 1, 2].map(col => {
                            const i = row * 3 + col;
                            return (
                                <button key={i} className="square" onClick={() => handlePlay(i)}>
                                    {snap.squares[i]}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Game;