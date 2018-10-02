$(document).ready(() => {
  getRandomColors();
  $('.save-palette-btn').click(e => {
    e.preventDefault();
    savePaletteToProject();
  });
});

var newColorArray = [];

const savePaletteToProject = () => {
  console.log(newColorArray);
  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ newColorArray }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const getRandomColors = () => {
  for (let i = 0; i < 5; i++) {
    const newColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    if (newColorArray.length < 5) {
      newColorArray.push(newColor);
    }
  }
  displayColors(newColorArray);
};

const displayColors = colors => {
  $('.color-card-display').empty();
  colors.map(color => {
    return $('.color-card-display').prepend(
      `<div class="color-card ${color}" style="background-color:${color}">`
    );
  });
};

$(window).keypress(e => {
  if (e.which === 32) {
    e.preventDefault();
    newColorArray = [];
    getRandomColors();
  }
});
