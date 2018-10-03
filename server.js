const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Palette Picker';

app.locals.palettes = [
  {
    id: 1,
    name: 'warm',
    color1: '#def402',
    color2: '#647eda',
    color3: '#d71568',
    color4: '#39658a',
    color5: '#eac5d',
    project_id: 1
  },
  {
    id: 2,
    name: 'cool',
    color1: '#def402',
    color2: '#647eda',
    color3: '#d71568',
    color4: '#39658a',
    color5: '#eac5d',
    project_id: 1
  },
  {
    id: 3,
    name: 'cold',
    color1: '#def402',
    color2: '#647eda',
    color3: '#d71568',
    color4: '#39658a',
    color5: '#eac5d',
    project_id: 2
  }
];

app.locals.projects = [
  { id: 1, name: 'living room' },
  { id: 2, name: 'dining room' }
];

app.use(express.static('public'));

// app.post('/api/v1/palettes', (request, response) => {
//   const { palette } = request.body;
//   app.locals.palettes.push(palette);
// });

app.get('/', (request, response) => {
  response.sendFile(index.html);
});

app.post('/api/v1/projects', (request, response) => {
  // const palette
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on ${app.get('port')}`);
});
