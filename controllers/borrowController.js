exports.borrowBook = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || book.copies <= 0) {
      return res.status(400).json({ error: "Book not available" });
    }

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save();
    book.copies -= 1;
    await book.save();

   return res.status(201).json(borrow);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.returnBook = async (req, res) => {
  const { id } = req.params;
  try {
    const borrow = await Borrow.findById(id).populate("book");
    if (!borrow || borrow.returnDate) {
      return res.status(400).json({ error: "Invalid borrow record" });
    }

    borrow.returnDate = new Date();
    await borrow.save();
    borrow.book.copies += 1;
    await borrow.book.save();

    return res.json(borrow);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.borrowHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const history = await Borrow.aggregate([
      { $match: { user: userId } }, // Filter by user
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" }, 
      { $sort: { borrowDate: -1 } }, 
    ]);

    return res.json(history);
  } catch (error) {
    return  res.status(400).json({ error: error.message });
  }
};
