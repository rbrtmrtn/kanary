exports.seed = async (knex) => {
  // note: this deletes all existing rows!
  await knex('sightings').del();
  return knex('sightings').insert([
    {
      sighted_at: '2021-12-25 13:01:34+00',
      location: 'Oriole Park',
      common_name: 'American yellow warbler',
      count: 2,
      notes: 'Living their best lives!',
    },
    {
      sighted_at: '2021-12-27 05:32:01+00',
      location: 'Magic Point',
      common_name: 'American robin',
      count: 12,
      notes: 'So many...',
    },
  ]);
};
