const express = require('express')
const router = express.Router()
const Book = require('../Models/books');
const Reviews=require('../Models/review')
const {isAuthenticated, isAdmin} = require('../Authentication/Auth');
const { exit } = require('process');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch(err) {
        res.status(500).json(err.message);
    }
})

router.get('/:isbn',async (req,res) => {

        const isbnum=req.params.isbn;
        //  Book.findOne({ISBN: isbnum}, (error, result)=>{
        //     if (error) {
        //         console.error('Error:', error.message);
        //         return res.json(error);
        //     }
        //     res.json(result);
        // })

        try {
            const book = await Book.findOne({ISBN: isbnum});
            res.json(book);
        } catch (error) {
            // console.error('Error:', error.message);
                return res.json(error.message);
        }
    
})

// router.get('/:titles', (req,res) => {

//     const booktitle=req.params.titles;
//     Book.findOne({title: booktitle}, (error, result)=>{
//         if (error) {
//             console.error('Error:', error.message);
//             return res.json(error);
//         }
//         res.json(result);
//     })

// })


router.get('/:bookId/review', async(req,res) => {

    const bookId = req.params.bookId;
    try {
      const book = await Book.findById(bookId);
    //   const book = await Book.findById(bookId).populate('reviews');
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book.reviews);
    }
    catch(err){
        return res.status(500).json(err.message);
    }

})


router.post('/addBooks', isAuthenticated,  async (req, res) => {
    try {
        const {title, author, isbn} = req.body;

        const book = new Book({
            title:title, author:author, ISBN:isbn
        });

        await book.save();

        return res.json(book);
    } catch (error) {
        return res.status(500).json(error.message);
    }
})


router.post('/:bookId/review', isAuthenticated, async (req, res) => {
    const bookId = req.params.bookId;
    const {reviewText } = req.body;
    const userId = req.user;
    // console.log(req.user)
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // const existingReview = book.reviews.find(review => review.user === userId);
      let existingReview = book.reviews;
      existingReview =  existingReview.filter((review) => review.user == userId);
      console.log(existingReview)
      if (existingReview.length > 0) {
        existingReview[0].reviewText = reviewText;
      } else {
        book.reviews.push({ user: userId, reviewText });
      }
  
      await book.save();
      res.json({ message: 'Review added/modified successfully', review : existingReview });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


router.delete('/delete/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const removedBook = await Book.findByIdAndDelete(bookId);

        res.json(removedBook);
    } catch (error) {
        res.status(500).json(error.message);        
    }
})
module.exports = router;