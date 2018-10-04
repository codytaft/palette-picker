$(document).ready(() => {
  getRandomColors();
  handleSavePaletteClick();
  handleDropdownSelector();
  handleSaveProjectClick();
  getSavedProjects();
  handleLockClick();
});

var newColorArray = [];
var selectedProject = '';

const handleLockClick = () => {
  $('.lock-icon').click(() => {
    $('.lock-icon').toggleClass('locked');
  });
};

const handleSavePaletteClick = () => {
  $('.save-palette-btn').bind('keypress', e => {
    e.stopPropogation;
  });
  $('.save-palette-btn').click(e => {
    e.preventDefault();
    const paletteName = $('.palette-input').val();
    savePaletteToDatabase(paletteName, newColorArray, selectedProject);
    displayPalette(paletteName, newColorArray, selectedProject);
    $('.palette-name-input').val('');
  });
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

const handleSaveProjectClick = () => {
  $('.save-project-btn').click(e => {
    e.preventDefault();
    const projectName = $('.project-name-input').val();
    saveProjectToDatabase(projectName);
    displayProject(projectName);
    populateDropDown(projectName);
    $('.project-name-input').val('');
  });
};

const populateDropDown = projectName => {
  $('.select-dropdown').append(`<option >${projectName}</option>`);
};

const displayProject = projectName => {
  console.log(projectName);
};

const saveProjectToDatabase = projectName => {
  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({
      project_name: projectName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const getSavedProjects = () => {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(project => {
      project.forEach(project => populateDropDown(project.project_name));
    });
};

const handleDropdownSelector = () => {
  return $('.select-dropdown').change(() => {
    selectedProject = $('select option:selected').text();
  });
};

const getRandomColors = () => {
  for (let i = 0; i < 5; i++) {
    const newColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).toUpperCase();
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
      <div class="lock-icon">     
      `
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
