
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users.map(user => {
          return { ...user._doc, _id: user.id };
        });
      } catch (err) {
        throw err;
      }
    },
    books: async () => {
      try {
        const books = await Book.find();
        return books.map(book => {
          return { ...book._doc, _id: book.id };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { name, email, password } = args.userInput;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        const result = await user.save();
        return { ...result._doc, _id: result.id, password: null };
      } catch (err) {
        throw err;
      }
    },
    createBook: async (parent, args) => {
      const { title, author, ISBN, publicationDate, genre, copies } = args.bookInput;
      try {
        const existingBook = await Book.findOne({ ISBN });
        if (existingBook) {
          throw new Error('Book with this ISBN already exists.');
        }
        const book = new Book({
          title,
          author,
          ISBN,
          publicationDate,
          genre,
          copies,
        });
        const result = await book.save();
        return { ...result._doc, _id: result.id };
      } catch (err) {
        throw err;
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not exist.');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect.');
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        { expiresIn: '1h' }
      );
      return { userId: user.id, token, tokenExpiration: 1 };
    },
  },
};

module.exports = resolvers;
