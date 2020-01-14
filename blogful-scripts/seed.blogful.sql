BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
  ('articleA', '2016-01-16 12:00:00',       'Despotato'),
  ('articleB',  '2016-05-01 15:00:00',       'Shape of Pooh'),
  ('articleC',     '2017-02-22 12:00:00',       'UpTown Monk'),
  ('articleD',      '2017-04-04 08:00:00',       'Despotato'),
  ('articleE',  '2017-04-23 15:00:00',       'Despotato'),
  ('articleF', '2017-08-11 13:00:00',       'Cats that teach SQL'),
  ('articleG',  '2017-12-09 17:00:00',       'Despotato'),
  ('articleH',     '2018-01-24 19:00:00',       'Cats that teach SQL'),
  ('articleI',      '2018-01-29 11:00:00',       'Man''s not torrid'),
  ('articleJ', '2018-02-13 05:00:00',       'UpTown Monk'),
  ('articleK',  '2018-03-13 09:00:00',       'Shape of Pooh'),
  ('articleL',     '2018-03-31 13:00:00',       'UpTown Monk'),
  ('articleM', '2019-04-03 07:00:00',       'Despotato'),
  ('articleN',      '2019-05-05 21:00:00',       'UpTown Monk'),

COMMIT;