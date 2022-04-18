import { connect, model, Schema, Document, Model, ObjectId } from "mongoose";
connect('mongodb://localhost/practice')
    .then(() => {
        console.log("Mongo db ga ulanish hosil qilindi ")
    })

interface IAuthor extends Document {
    firstName: string;
    lastName: string;
    email: string;
    _id: ObjectId;
}
// interface IBook extends Document {
//     title: string;
//     author: IAuthor & {
//         _id: ObjectId;
//     };
//     _id: ObjectId;
// }

type Authors = IAuthor & { _id: ObjectId }

interface IBook extends Document {
    title: string;
    authors: Authors[];
    _id: ObjectId;
}

const authorSchema = new Schema<IAuthor>({
    firstName: String,
    lastName: String,
    email: String
})

// const bookSchema = new Schema<IBook>({
//     title: String,
//     author: authorSchema
// })
const bookSchema = new Schema<IBook>({
    title: String,
    authors: [authorSchema]
})

const Author = model<IAuthor>("Author", authorSchema)

const Book = model<IBook>("Book", bookSchema)

// const createAuthor = async ({ firstName, lastName, email }: Pick<IAuthor, "firstName" | "lastName" | "email">) => {
//     const author = new Author({
//         firstName,
//         lastName,
//         email
//     })
//     const newAuthor = await author.save()
//     console.log(newAuthor)
// }

// const createBook = async (title: string, author: IBook['author']) => {
//     const book = new Book({
//         title,
//         author
//     })
//     const newBook = await book.save()
//     console.log(newBook)
// }

const createBook = async (title: string, authors: IBook['authors']) => {
    const book = new Book({
        title,
        authors
    })
    const newBook = await book.save()
    console.log(newBook)
}



createBook("Node Js toliq qo'llanma",
    [
        new Author({
            firstName: "Farkhod",
            lastName: "Dadajonov",
            email: "dfarkhod"
        }),
        new Author({
            firstName: "Ibrohim",
            lastName: "Dadajonov",
            email: "dfarkhod"
        })
    ]
)

// const updateBook = async (bookId: string) => {
//     await Book.updateOne({ _id: bookId }, {
//         // $set: {
//         //     'author.firstName' : 'FafrhodJon bratan'
//         // }
//         $unset: {
//             'author': ''
//         }
//     })
//     const book = await Book.findById(bookId)
//     console.log(book)
// }

// updateBook('625d9eb7db0a25778676abac')
// const listBooks = async () => {
//     const books = await Book
//         .find()
//         .populate('author', 'firstName -_id')
//         .select('title author')
//     console.log(books)
// }