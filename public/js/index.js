$(document).ready(() => {
  const randomColors = getRandomColors();
  displayColors(randomColors);
  handleSavePaletteClick();
  handleDropdownSelector();
  handleSaveProjectClick();
  getSavedProjects();
  getSavedPalettes();
});

var newColorArray = [];
var selectedProject = '';
var savedProjects = [];

const handleSavePaletteClick = () => {
  $('.save-palette-btn').click(e => {
    e.preventDefault();
    const paletteName = $('.palette-name-input').val();
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

const handleSaveProjectClick = () => {
  $('.save-project-btn').click(e => {
    e.preventDefault();
    const projectName = $('.project-name-input').val();
    fetch('./api/v1/projects')
      .then(response => response.json())
      .then(projects => {
        if (
          projectName.length &&
          !projects.find(
            project =>
              // project => console.log(project.project_name)
              project.project_name === $('.project-name-input').val()
          )
        ) {
          saveProjectToDatabase(projectName);
          displayProject(projectName);
          populateDropDown(projectName);
          $('.project-name-input').val('');
        }
      });
  });
};

const populateDropDown = projectName => {
  $('.select-dropdown').append(`<option >${projectName}</option>`);
};

const displayProject = projectName => {
  $('.project-section').append(`
  <article class='project-card'>
  <button class='project-btn'>${projectName}</button>
  </article>`);
};

const displayPalette = (paletteName, colors, projectName) => {
  $('.project-section')
    .find(`:contains(${projectName})`)[0]
    .insertAdjacentHTML(
      'beforeend',
      `
      <section class='palette-card'>
      <h2 class='palette-name'>${paletteName}</h2>
      <span class="circle" style='background-color: ${colors[0]}'></span>
      <span class="circle" style='background-color: ${colors[1]}'></span>
      <span class="circle" style='background-color: ${colors[2]}'></span>
      <span class="circle" style='background-color: ${colors[3]}'></span>
      <span class="circle" style='background-color: ${colors[4]}'></span>
      <span class="delete-btn"></span>
      </section>
      `
    );
};

const displaySavedPalettes = palettes => {
  // console.log(savedProjects);
  // palettes.forEach(palette => {
  //   console.log(palette);
  //   palette;
  //   $('.project-section')
  //     .find(`:contains(${palette.project_id})`)[0]
  //     .insertAdjacentHTML(
  //       'beforeend',
  //       `
  //       <h2>${palette.palette_name}</h2>
  //       <span class="circle" style='background-color: ${palette.color1}'></span>
  //       <span class="circle" style='background-color: ${palette.color2}'></span>
  //       <span class="circle" style='background-color: ${palette.color3}'></span>
  //       <span class="circle" style='background-color: ${palette.color4}'></span>
  //       <span class="circle" style='background-color: ${palette.color5}'></span>
  //       <button class="circle delete-btn"/>
  //       `
  //     );
  // });
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
      project.forEach(project => displayProject(project.project_name));
      project.forEach(project => savedProjects.push(project.project_name));
    });
};

const getSavedPalettes = () => {
  fetch('/api/v1/palettes')
    .then(response => response.json())
    .then(palettes => {
      displaySavedPalettes(palettes);
    });
};

// const cleanProjectId = palettes => {
//   let newPalettes = [...palettes];
//   palettes.forEach(async palette => {
//     await fetch(`/api/v1/projects/${palette.project_id}`)
//       .then(response => response.json())
//       .then(projectName => {
//         palette.project_id = projectName;
//       });
//   });
//   displaySavedPalettes(palettes);
// };

const handleDropdownSelector = () => {
  return $('.select-dropdown').change(() => {
    selectedProject = $('select option:selected').text();
  });
};

const getRandomColors = () => {
  while (newColorArray.length < 5) {
    const newColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).toUpperCase();
    newColorArray.push(newColor);
  }
  return newColorArray;
};

const displayColors = colors => {
  // if (!$('.lock-icon').hasClass('locked')) {
  //   $('.lock-icon')
  //     .parent()
  //     .remove();
  // }

  // $('.color-card')
  //   .not('.isLocked')
  //   .remove();

  $('.color-card-display').empty();

  colors.map(color => {
    return $('.color-card-display').append(
      `<div class="color-card ${color}" style="background-color:${color}">
        <p>${color}</p>
        <div class="lock-icon ${color}"> 
        </div>
        `
    );
  });
};

const handleLockClick = e => {
  $(e.target).toggleClass('locked');
  $(e.target)
    .parent()
    .toggleClass('isLocked');
};

const handleDeleteBtn = e => {
  const paletteName = $(e.target)
    .siblings('.palette-name')
    .text();
  const paletteCard = $(e.target).parent('.palette-card');
  fetch('/api/v1/palettes', {
    method: 'DELETE',
    body: JSON.stringify({
      palette_name: paletteName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  $(paletteCard[0]).remove();
};

$(window).keypress(e => {
  if (e.which === 32 && !($(document.activeElement)[0].localName === 'input')) {
    e.preventDefault();
    newColorArray = [];
    const lockedElements = $('.isLocked');
    lockedElements.each(function() {
      const lockedHex = $(this)[0].classList[1];
      newColorArray.push(lockedHex);
    });
    const randomColors = getRandomColors();
    displayColors(randomColors);
  }
});

$('.color-card-display').on('click', '.lock-icon', handleLockClick);
$('.project-section').on('click', '.delete-btn', handleDeleteBtn);
