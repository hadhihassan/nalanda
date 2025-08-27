import User from '../../models/user.models.js'
import { loginSchema, registerSchema } from '../validationSchema/authSchema.js';
import { GraphQLString, GraphQLID, GraphQLList } from 'graphql' 
import { UserType } from '../types/types.js'
import { generateJwtToken } from '../../utils/jwt.utils.js';
import { comparePasswords, convertSecurePassword } from '../../utils/bcrypt.utils.js';

// User queries
export const userQueries = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async () => await User.find()
    },
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: async (_, { id }) => await User.findById(id)
    }
}

// User mutations
export const userMutations = {
    registerUser: {
        type: UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            confirmPassword: { type: GraphQLString }
        },
        resolve: async (_, args) => {
            const { error } = registerSchema.validate(args);
            if (error) {
                throw new Error(error.details[0].message);
            }

            const { name, email, password } = args;
            const hashedPassword = await convertSecurePassword(password);
            const user = new User({ name, email, password: hashedPassword });
            return await user.save();
        }
    },
    loginUser: {
        type: GraphQLString,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: async (_, args) => {
            const { error } = loginSchema.validate(args);
            if (error) {
                throw new Error(error.details[0].message);
            }

            const { email, password } = args;
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
            const isMatch = await comparePasswords(user.password, password);
            if (!isMatch) throw new Error('Invalid credentials');

            const token = await generateJwtToken(user._id,"Member");
            return token;
        }
    }
};