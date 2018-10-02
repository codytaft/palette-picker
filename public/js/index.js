$(document).ready(() => {
  getRandomColors();
});

const getRandomColors = () => {
  const newColorArray = [];
  for (i = 0; i < 5; i++) {
    const newColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    newColorArray.push(newColor);
  }
  displayColors(newColorArray);
};

const displayColors = colors => {
  $('.color-card-display').empty();
  colors.map(color => {
    return $('.color-card-display').prepend(
      `<div class="color-card" style="background-color:${color}">`
    );
  });
};

$(window).keypress(e => {
  if (e.which === 32) {
    getRandomColors();
  }
});

$('.save-palette-btn').click(e => {
  e.prevent.default();
  console.log(e.target.value);
});
