import React from 'react';

export function Scores() {
  const [scores, setScores] = React.useState([]);
    React.useEffect(() => {
      fetch('/api/scores')
        .then((response) => response.json())
        .then((scores) => {
          setScores(scores);
          localStorage.setItem('scores', JSON.stringify(scores));
        })
        .catch(() => {
          console.log('used catch');
          const scoresText = localStorage.getItem('scores');
          if (scoresText) {
            setScores(JSON.parse(scoresText));
          }
        });
    }, []);
  
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }
  return (
    <main className='container-fluid text-center'>
      <div className="container-fluid">
        <div className="scoreboard">
        <h1>Score</h1>
        <table className="table table-info table-striped-columns">
            <thead className="table-light">
            <tr>
                <th >#</th>
                <th >Name</th>
                <th >Score</th>
                <th >Date</th>
            </tr>
            </thead>
            <tbody id="scores">{scoreRows}</tbody>
          </table>
        </div>
    </div>
    </main>
  );
}