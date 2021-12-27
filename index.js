const bodyParser = require('body-parser');
const express = require('express');
const Router = require('express-promise-router');
const { Pool: DbPool } = require('pg');

const PORT = 3000;

const app = express();

// set up pug
app.set('views', './views');
app.set('view engine', 'pug');

// serve static assets
app.use(express.static('public'))

// for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// connect to db
const dbPool = new DbPool({
  // TODO un-hard code this
  database: 'kanary',
});

// create router
const router = new Router();
app.use(router);

router.get('/', async (req, res) => {
  // TODO sort
  const { rows } = await dbPool.query('select * from sightings');

  // parse sighted at timestamp into date, time
  const rowsWithDatesAndTimes = rows.map((row) => {
    const rowWithDateAndTime = Object.assign({}, row);
    const sightedAt = row.sighted_at;

    rowWithDateAndTime.date = sightedAt.toLocaleDateString();
    rowWithDateAndTime.time = sightedAt.toLocaleTimeString();
    delete rowWithDateAndTime.sighted_at;

    return rowWithDateAndTime;
  });

  res.render('index', { sightings: rowsWithDatesAndTimes });
});

router.get('/add-sighting', (req, res) => {
  res.render('add-sighting-form');
});

router.post('/add-sighting', async (req, res) => {
  const { body } = req;

  // merge date and time into timestamp
  // TODO is there a more elegant way of doing this?
  const sightedAtTimestamp = new Date(`${body.date} ${body.time}`);
  
  const vals = [
    sightedAtTimestamp,
    body.location,
    body['common-name'],
    body.count,
    body.notes,
  ];

  await dbPool.query(
    `
      insert into sightings (
        sighted_at,
        location,
        common_name,
        count,
        notes
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5
      )
    `,
    vals,
  );

  // TODO handle error

  res.render('add-sighting-result');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}...`);
});

// TODO do we need this? to not orphan db connections?
process.on('exit', () => {
  dbPool.end();
});
