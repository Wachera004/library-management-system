import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery' } });
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy' } });

  await prisma.book.createMany({
    data: [
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960, genreId: fiction.id },
      { title: '1984', author: 'George Orwell', publishedYear: 1949, genreId: fiction.id },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925, genreId: fiction.id },
      { title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813, genreId: fiction.id },

      { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, genreId: sciFi.id },
      { title: 'Ender\'s Game', author: 'Orson Scott Card', publishedYear: 1985, genreId: sciFi.id },
      { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984, genreId: sciFi.id },
      { title: 'The Martian', author: 'Andy Weir', publishedYear: 2011, genreId: sciFi.id },

      { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', publishedYear: 1902, genreId: mystery.id },
      { title: 'And Then There Were None', author: 'Agatha Christie', publishedYear: 1939, genreId: mystery.id },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', publishedYear: 2005, genreId: mystery.id },
      { title: 'Gone Girl', author: 'Gillian Flynn', publishedYear: 2012, genreId: mystery.id },

      { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', publishedYear: 1954, genreId: fantasy.id },
      { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', publishedYear: 1997, genreId: fantasy.id },
      { title: 'The Way of Kings', author: 'Brandon Sanderson', publishedYear: 2010, genreId: fantasy.id },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', publishedYear: 2007, genreId: fantasy.id },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });