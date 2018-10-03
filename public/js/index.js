$(document).ready(() => {
  getRandomColors();
  handleSavePaletteClick();
  handleDropdownSelector();
});

var newColorArray = [];
var selectedProject = '';

const handleSavePaletteClick = () => {
  $('.save-palette-btn').click(e => {
    e.preventDefault();
    const paletteName = $('.palette-input').val();
    savePaletteToDatabase(paletteName, newColorArray, selectedProject);
    displayPalette(paletteName, newColorArray, selectedProject);
    $('.palette-input').val('');
  });
};

const handleDropdownSelector = () => {
  return $('.select-dropdown').change(() => {
    selectedProject = $('select option:selected').text();
  });
};

const savePalette = (paletteName, colors, projectName) => {
  console.log(projectName);
  console.log(paletteName);
  console.log(colors);
  savePaletteToDatabase(paletteName, colors, projectName);
};

const savePaletteToDatabase = (paletteName, colors, projectName) => {
  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({
      palette_name: paletteName,
      color1: colors[0],
      color2: colors[1],
      color3: colors[2],
      color4: colors[3],
      color5: colors[4],
      project_id: projectName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const displayPalette = (paletteName, colors, projectName) => {
  console.log(paletteName, colors, projectName);
};

const getRandomColors = () => {
  for (let i = 0; i < 5; i++) {
    const newColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).toUpperCase();
    if (newColorArray.length < 5) {
      newColorArray.push(newColor);
    }
  }
  console.log(newColorArray);
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
