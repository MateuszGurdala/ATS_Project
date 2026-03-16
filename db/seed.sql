SET IDENTITY_INSERT Year ON;

INSERT INTO Year
    (YearId, Value)
VALUES
    (1, 2025),
    (2, 2000),
    (3, 2001),
    (4, 2007),
    (5, 2016);

SET IDENTITY_INSERT Year OFF;

SET IDENTITY_INSERT Area ON;

INSERT INTO Area
    (AreaID, ParentID, Name)
VALUES
    (1, Null, 'Kabaty'),
    (2, Null, 'Natolin'),
    (3, Null, 'Imielin'),
    (4, Null, 'Stokłosy'),
    (5, Null, 'Ursynów'),
    (6, 5, 'Puławska'),
    (7, 3, 'Aleja KEN'),
    (8, 3, 'Służby Polsce'),
    (9, 2, 'Belgradzka'),
    (10, 1, 'Dembego'),
    (11, 1, 'Aleja KEN'),
    (12, 3, 'Pileckiego'),
    (13, 4, 'Jastrzębowskieg'),
    (14, 4, 'Aleja KEN'),
    (21, 4, 'Kopcińskiego'),
    (15, 5, 'Koncertowa'),
    (16, 5, 'Surowieckiego'),
    (17, 2, 'Żabińskiego'),
    (18, 1, 'Pustuleczki'),
    (19, 3, 'Polinezyjska'),
    (20, 4, 'Pasaż Ursynowski');

SET IDENTITY_INSERT Area OFF;

INSERT INTO AreaYear
    (AreaID, YearID)
VALUES
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 3),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 4),
    (14, 4),
    (21, 5),
    (15, 5),
    (16, 5),
    (17, 1),
    (18, 1),
    (19, 1),
    (20, 1);
