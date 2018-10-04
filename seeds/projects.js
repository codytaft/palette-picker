// let paletteData = {
//   palette_name: 'hot',
//   color1: '#def402',
//   color2: '#647eda',
//   color3: '#d71568',
//   color4: '#39658a',
//   color5: '#eac5d',
//   project_id: 1
// };

// let projectData = {
//   id: 1,
//   project_name: 'Dining Room'
// };

exports.seed = function(knex, Promise) {
  return knex('palettes')
    .del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects')
          .insert([
            {
              id: 1,
              project_name: 'Dining Room'
            },
            {
              id: 2,
              project_name: 'Living Room'
            },
            {
              id: 3,
              project_name: 'Project 1'
            }
          ])
          .then(() => {
            return knex('palettes').insert([
              {
                palette_name: 'hot',
                color1: '#def402',
                color2: '#647eda',
                color3: '#d71568',
                color4: '#39658a',
                color5: '#eac5d',
                project_id: 1
              },
              {
                palette_name: 'warm',
                color1: '#628C1',
                color2: '#BAA50B',
                color3: '#8A020',
                color4: '#6A629B',
                color5: '#C34DC7',
                project_id: 2
              }
            ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
