
async function loadBird(){
    const response = await fetch('/api/birds');
    const birdInfo = await response.json();
    const birdObj = birdInfo[0];
    const birdUrl = birdObj.urls.regular;
    const birdDescr = birdObj.description;
    let bird = [birdUrl, birdDescr];
    return bird;
  }

function displayBird() {
    loadBird()
    .then((bird) => {
        const imgEl = document.getElementById('birdImage');
        imgEl.src = bird[0];
        const textEl = document.getElementById('birdInfo');
        textEl.textContent = bird[1];
    });
}
displayBird();
