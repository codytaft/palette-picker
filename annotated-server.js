const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// sets port to PORT variable or 3000
app.set('port', process.env.PORT || 3000);

// Tells app to use bodyParser for body requests
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Creates a variable used later to make sure server is running
app.locals.title = 'Palette Picker';

//Use the public folder for static files
app.use(express.static('public'));

//The get request to send the index.html onload
app.get('/', (request, response) => {
  response.sendFile(index.html);
});

//get request to fetch projects
app.get('/api/v1/projects', (request, response) => {
  database('projects')
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//get request to fetch palettes
app.get('/api/v1/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//get request to fetch palettes using project id
app.get('/api/v1/palettes/:project_id', (request, response) => {
  let projectId = request.params.project_id;
  database('palettes')
    .where('project_id', projectId)
    .then(palettes => {
      response.status(200).json(palettes);
    });
});

//get request to fetch palettes using palette id
app.get('/api/v1/palettes/:id/palettes', (request, response) => {
  let paletteId = request.params.id;
  database('palettes')
    .where('id', paletteId)
    .then(palette => {
      response.status(200).json(palette[0]);
    });
});

//delete request to delete palettes using project id
app.delete('/api/v1/palettes/', (request, response) => {
  const paletteId = request.body.id;
  database('palettes')
    .where('id', paletteId)
    .del()
    .catch(error => {
      response.status(500).json({ error });
    });
});

//post request to add projects to project database
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

//post request to add palettes to palette database
app.post('/api/v1/palettes', (request, response) => {
  let palette = request.body;
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
        });
    })
    .catch(error => response.status(500).json({ error }));
});

//listens and gets set port variable
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} running on ${app.get('port')}`);
});
