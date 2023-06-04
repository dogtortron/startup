async function loadBird(){
    const response = await fetch('/api/birds');
    const birdInfo = await response.json();
    const birdObj = birdInfo[0];
    const birdUrl = birdObj.urls.regular;
    const birdDescr = birdObj.description;
    let bird = [birdUrl, birdDescr];
    return bird;
  }

function displayPicture() {
    loadBird()
    .then((bird) => {
        const containerEl = document.getElementById('birdImage');
        containerEl.src = bird[0];
      });
}

function displayBirdInfo(){
    loadBird()
    .then((bird) => {
        const containerEl = document.getElementById('birdInfo');
        containerEl.textContent = bird[1];
    });
}

displayPicture();
displayBirdInfo();
