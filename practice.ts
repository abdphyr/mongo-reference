import { connect, model, Schema, Document, ObjectId } from "mongoose";
connect('mongodb://localhost/practice')
    .then(() => {
        console.log("Mongo db ga ulanish hosil qilindi ")
    })

interface IAuthor extends Document<ObjectId> {
    firstName: string;
    lastName: string;
    email: string;
}
interface IBook extends Document<ObjectId> {
    title: string;
    author: string
}

const Author = model<IAuthor>("Author", new Schema<IAuthor>({
    firstName: String,
    lastName: String,
    email: String
}))
const Book = model<IBook>("Book", new Schema<IBook>({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' }
}))

const createAuthor = async ({ firstName, lastName, email }: Pick<IAuthor, "firstName" | "lastName" | "email">) => {
    const author = new Author({
        firstName,
        lastName,
        email
    })
    const newAuthor = await author.save()
    console.log(newAuthor)
}
const cerateBook = async (title: string, authorId: string) => {
    const book = new Book({
        title,
        author: authorId
    })
    const newBook = await book.save()
    console.log(newBook)
}

const listBooks = async () => {
    const books = await Book
        .find()
        .populate('author', 'firstName -_id')
        .select('title author')
    console.log(books)
}

// createAuthor({ firstName: "Farhod", lastName: "Dadajonov", email: "dfarkhod@email" })
// cerateBook("Node js toliq qollanma", "625d9310b846cbcb41559868")
listBooks()