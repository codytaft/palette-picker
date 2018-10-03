$(document).ready(() => {
  getRandomColors();
  handleSavePaletteClick();
  handleDropdownSelector();
});

var newColorArray = [];

const handleSavePaletteClick = () => {
  $('.save-palette-btn').click(e => {
    e.preventDefault();
    savePaletteToProject($('.project').val());
    console.log('.project');
  });
};

const handleDropdownSelector = () => {
  return $('.select-dropdown').change(() => {
    console.log($('select option:selected').text());
  });
};

const savePaletteToProject = project => {
  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({
      name: 'hot',
      color1: '#def402',
      color2: '#647eda',
      color3: '#d71568',
      color4: '#39658a',
      color5: '#eac5d',
      project_id: 2
    }),
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
      `<div class="color-card ${color}" style="background-color:${color}">
      <p>${color}</p>
      <img src="../images/unlock.svg" alt="lock.png" class="lock-icon">`
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
