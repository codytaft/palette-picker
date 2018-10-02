const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Palette Picker';
app.locals.colors = [
  { id: 1, color: `#4E1DB7` },
  { id: 2, color: `#000744` },
  { id: 3, color: `#0719B7` },
  { id: 4, color: `#514103` },
  { id: 5, color: `#AA8D18` }
];
app.locals.colors2 = [
  { id: 1, color: `#ff0000` },
  { id: 2, color: `#ff0000` },
  { id: 3, color: `#ff0000` },
  { id: 4, color: `#ff0000` },
  { id: 5, color: `#ff0000` }
];
app.locals.palettes = [
  { id: 1, name: 'warm', project_id: 1 },
  { id: 2, name: 'cool', project_id: 1 },
  { id: 3, name: 'cold', project_id: 2 }
];

app.locals.projects = [
  { id: 1, name: 'living room' },
  { id: 2, name: 'dining room' }
];

app.use(express.static('public'));
// app.use(function(req, res) {
//   res.status(404).send(`Sorry can't find that!`);
// });

app.post('/api/v1/palettes', (request, response) => {
  const { palette } = request.body;
  app.locals.palettes.push(palette);
});

app.get('/', (request, response) => {
  response.sendFile(index.html);
});

app.get('/api/v1/colors', (request, response) => {
  response.status(200).json(app.locals.colors);
});

app.get('/api/v1/colors2', (request, response) => {
  response.status(200).json(app.locals.colors2);
});

app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body;
  app.locals.projects.push(project);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on ${app.get('port')}`);
});
