CREATE DATABASE dentorodev;
CREATE USER dentorouser WITH superuser password '123456';
ALTER DATABASE dentorodev OWNER TO dentorouser;
-- test db
CREATE DATABASE dentorotest;
CREATE USER dentorouser2 WITH superuser password '123456';
ALTER DATABASE dentorotest OWNER TO dentorouser2;
