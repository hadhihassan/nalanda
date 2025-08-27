import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } from 'graphql';
import Borrow from '../../models/borrow.model.js'
import Books from '../../models/book.model.js'
import mongoose from 'mongoose'

// Type for Active Members
const ActiveMemberType = new GraphQLObjectType({
    name: 'ActiveMember',
    fields: () => ({
        user: { type: GraphQLID },
        borrowCount: { type: GraphQLInt },
    })
});

// Type for Book Availability Status
const BookAvailabilityStatusType = new GraphQLObjectType({
    name: 'BookAvailabilityStatus',
    fields: () => ({
        message: { type: GraphQLString },
        totalBooks: { type: GraphQLInt },
        borrowedBooks: { type: GraphQLInt },
        availableBooks: { type: GraphQLInt },
    })
});

// Type for Most Borrowed Books
const MostBorrowedBookType = new GraphQLObjectType({
    name: 'MostBorrowedBook',
    fields: () => ({
        book: { type: GraphQLID },
        borrowCount: { type: GraphQLInt },
        bookDetails: {
            type: new GraphQLObjectType({
                name: 'BookDetails',
                fields: () => ({
                    title: { type: GraphQLString },
                    author: { type: GraphQLString },
                    genre: { type: GraphQLString }
                })
            }),
            resolve: async (parent) => {
                // Fetch book details based on parent.book
                return await Books.findById(parent.book);
            }
        }
    })
});



export const reportQueries = {
    activeMembers: {
        type: new GraphQLList(ActiveMemberType),
        resolve: async () => {
            const pipeline = [
                {
                    $match: { isReturned: true }
                },
                {
                    $group: {
                        _id: "$user",
                        borrowCount: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: '_id',
                        foreignField: '_id',
                        as: "user"
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $sort: {
                        borrowCount: -1
                    }
                }
            ];

            const activeMembers = await Borrow.aggregate(pipeline);

            return activeMembers.map(member => ({
                user: member._id,
                borrowCount: member.borrowCount
            }));
        }
    },
    booksAvailabilityStatus: {
        type: BookAvailabilityStatusType,
        resolve: async () => {
            const totalBooks = await Books.countDocuments();
            const borrowedBooks = await Borrow.countDocuments({ isReturned: false });
            const availableBooks = totalBooks - borrowedBooks;

            return {
                message: "Books availability.",
                totalBooks,
                borrowedBooks,
                availableBooks,
            }
        }
    },
    getMostBorrowedBooks: {
        type: new GraphQLList(MostBorrowedBookType),
        resolve: async (_,) => {
            const pipeline = [
                {
                    $match: { isReturned: true }
                },
                {
                    $group: {
                        _id: "$book",
                        borrowCount: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "books",
                        localField: '_id',
                        foreignField: '_id',
                        as: "book"
                    }
                },
                {
                    $unwind: '$book'
                },
                {
                    $sort: {
                        borrowCount: -1
                    }
                }
            ];

            const mostBorrowedBooks = await Borrow.aggregate(pipeline);

            return mostBorrowedBooks.map(item => ({
                book: item._id,
                borrowCount: item.borrowCount,
                bookDetails: item.book[0] // Assuming that `book` array has one item
            }));
        }
    }
};