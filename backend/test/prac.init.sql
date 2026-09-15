CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rating FLOAT,
    director TEXT,
    tags TEXT[],
    title TEXT NOT NULL,
    about TEXT,
    description TEXT,
    image TEXT,
    cover TEXT
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "filmId" UUID REFERENCES films(id) ON DELETE CASCADE,
    daytime TIMESTAMP NOT NULL,
    hall TEXT NOT NULL,
    rows INT NOT NULL,
    seats INT NOT NULL,
    price INT NOT NULL,
    taken TEXT[] DEFAULT '{}'
);