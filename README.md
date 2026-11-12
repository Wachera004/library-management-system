# Library Management System

## Schema Decisions

Book references Genre through genreId instead of embedding genre details in each book. Genres are shared data, so a separate Genre model avoids repeating the same genre name on many books. The foreign-key relation also keeps each book associated with a valid genre and makes it straightforward to query books by genre.
