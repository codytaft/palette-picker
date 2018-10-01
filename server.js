const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(function(req, res) {
  res.status(404).send(`Sorry can't find that!`);
});

app.get('/', (request, response) => {
  repsonse.sendFile(index.html);
});

app.listen(3000, () => {
  console.log('Palette Picker running on localhost:3000');
});
