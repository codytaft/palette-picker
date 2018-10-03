const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.setHeader('Content-Type', 'application/json');

//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.locals.title = 'Palette Picker';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(index.html);
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['project_name']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { project_name: <string>}. You're missing a "${requiredParameter}" property`
      });
    }
  }
  database('projects')
    .insert(project, 'id')
    .then(project => {
      response.status(201).json(project);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  let palette = request.body;
  console.log(palette);

  for (let requiredParameter of [
    'palette_name',
    'project_id',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5'
  ]) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { palette_name: <string>, project_id: <string>, color1: <string>, color2: <string>, color3: <string>, color4: <string>, color5: <String>}. You're missing a "${requiredParameter}" property`
      });
    }
  }
  database('projects')
    .where({ project_name: palette.project_id })
    .select()
    .then(id => {
      console.log(id[0].id);
      palette.project_id = id[0].id;
    })
    .then(() => {
      database('palettes')
        .insert(palette, 'id')
        .then(palette => {
          response.status(201).json(palette);
        })
        .catch(error => {
          response.status(500).json({ error });
        })
        .catch(error => response.status(500).json({ error }));
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on ${app.get('port')}`);
});

// app.locals.palettes = [
//   {
//     id: 1,
//     name: 'warm',
//     color1: '#def402',
//     color2: '#647eda',
//     color3: '#d71568',
//     color4: '#39658a',
//     color5: '#eac5d',
//     project_id: 1
//   },
//   {
//     id: 2,
//     name: 'cool',
//     color1: '#def402',
//     color2: '#647eda',
//     color3: '#d71568',
//     color4: '#39658a',
//     color5: '#eac5d',
//     project_id: 1
//   },
//   {
//     id: 3,
//     name: 'cold',
//     color1: '#def402',
//     color2: '#647eda',
//     color3: '#d71568',
//     color4: '#39658a',
//     color5: '#eac5d',
//     project_id: 2
//   }
// ];

// app.locals.projects = [
//   { id: 1, name: 'living room' },
//   { id: 2, name: 'dining room' }
// ];
