import React from 'react';
import './about.css';
import '../app.css';

export function About(props) {
  const [birdUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    // fetch('/api/birds')
      .then((response) => response.json())
      .then((birdInfo) => {
        // const birdUrl = birdInfo[0];
        const birdObj = birdInfo[0];
        const birdUrl = birdObj.download_url;
        //const birdUrl = birdObj.urls.regular;
        //const birdDescr = birdObj.description;
        setImageUrl(birdUrl);
      })
      .catch();
  }, []);

  return (
    <main className='container-fluid'>
      <div className="container-fluid">
        <div className="about">
        <h2>About</h2>
        <p>How to play: Click "Sing, Billy" and Billy will sing for you. Try your best to remember his notes and how many seconds he pauses in between. Right now there are 4 notes and either 1 or 2 seconds.</p>
        <p>The inspiration of this game came from a talk titled <a href="https://www.churchofjesuschrist.org/study/general-conference/1973/04/yellow-canaries-with-gray-on-their-wings?lang=eng">Yellow Canaries with Gray on Their Wings</a>, given by Thomas S. Monson in 1973.</p>
        {/* <frameborder id="myiframe" src="https://www.youtube.com/embed/W-vq72HOsOg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></frameborder> */}
        </div>
        <div className="birdOfTheDay">
        <section>
            <h2>Random Picture</h2>
            {/* <p id="birdInfo">{imgInfo}</p> */}
            <img id="birdImage" src={birdUrl}/>
            <audio controls src="https://www.bird-sounds.net/sounds/1630.mp3"></audio>
        </section>
        </div>
    </div>
    </main>
  );
}