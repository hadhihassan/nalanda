import Borrow from '../../models/borrow.model.js'
import Books from '../../models/book.model.js'
import { GraphQLString, GraphQLID, GraphQLList } from 'graphql'
import { BorrowType } from '../types/types.js'
import mongoose from 'mongoose'

// User queries
export const borrowQueries = {
    borrows: {
        type: new GraphQLList(BorrowType),
        resolve: async () => await Borrow.find()
    },
    borrow: {
        type: BorrowType,
        args: { id: { type: GraphQLID } },
        resolve: async (_, { id }) => await Borrow.findById(id)
    },
    borrowHistory: {
        type: new GraphQLList(BorrowType),
        args: { userId: { type: GraphQLID } },
        resolve: async (_, { userId }) => {
            const borrowHistories = await Borrow.find({ user: userId })
                .populate('book', 'title author genre')
                .sort({ borrowedDate: -1 });

            if (!borrowHistories) {
                throw new Error("Borrows not found");
            }
            return borrowHistories
        }
    }
}

// User mutations
export const borrowMutations = {
    borrowABook: {
        type: BorrowType,
        args: {
            userId: { type: GraphQLID },
            bookId: { type: GraphQLID },
            returnDate: { type: GraphQLString },
        },
        resolve: async (_, { bookId, returnDate, userId }) => {
            // const { error } = registerSchema.validate(args);
            // if (error) {
            //     throw new Error(error.details[0].message);
            // }

            const isBooksExisting = await Books.findById(bookId);
            if (!isBooksExisting) {
                throw new Error("Books not found");
            }

            if (isBooksExisting.copies <= 0) {
                throw new Error("Books not unavailable");
            }

            isBooksExisting.copies -= 1
            await isBooksExisting.save()

            const newBorrow = new Borrow({
                user: userId,
                book: bookId,
                returnDate
            })
            await newBorrow.save();

            return newBorrow
        }
    },
    returnBook: {
        type: BorrowType,
        args: {
            borrowId: { type: GraphQLID },
        },
        resolve: async (_, { borrowId }) => {
            // const { error } = registerSchema.validate(args);
            // if (error) {
            //     throw new Error(error.details[0].message);
            // }

            if (!mongoose.isValidObjectId(borrowId)) {
                throw new Error("Borrow id not correct formate")
            }

            const isBorrowExisting = await Borrow.findById(borrowId);
            if (!isBorrowExisting) {
                throw new Error("Borrow not found")
            }

            const book = await Books.findById(isBorrowExisting.book)
                .populate('book', 'title author genre')


            if (book) {
                book.copies += 1
                await book.save()
            }

            isBorrowExisting.isReturned = true
            await isBorrowExisting.save()

            return isBorrowExisting
        }
    },
};