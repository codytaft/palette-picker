$(document).ready(() => {
  fetch('/api/v1/colors')
    .then(response => {
      return response.json();
    })
    .then(colors => {
      displayColors(colors);
    });
});

const displayColors = colors => {
  $('.color-card-display').empty();
  colors.map(color => {
    return $('.color-card-display').prepend(
      `<div class="color-card" style="background-color:${color.color}">`
    );
  });
};

$(window).keypress(e => {
  if (e.which === 32) {
    fetch('/api/v1/colors2')
      .then(response => {
        return response.json();
      })
      .then(colors => {
        displayColors(colors);
      });
  }
});

$('#target').keypress(() => {
  console.log('spacebar pressed');
});
