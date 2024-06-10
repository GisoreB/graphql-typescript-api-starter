// declares Resolvers which are responsible for handling the logic and the response for each typeDef we define.
// It’s where the business logic is executed. Each typeDef will have a matching resolver.
import { Product, Category } from '../db/db'

export interface CtxArgs{
    db:{
        products: Product[]
        categories: Category[]
    }
}

export const resolvers = {
    Query: {
        hello: (_parent: any, args: any, _context: any) => {
            return "World!!!!!!"
        },
        numberOfAnimals: (_parent: any, args: any, _context: any) => {
            return 55;
        },
        price: (_parent: any, args: any, _context: any) => {
            return 222.2222
        },
        isCool: (_parent: any, args: any, _context: any) => {
            return true;
        },
        greeting: (_parent: any, args: any, _context: any) => {
            return ["Hello","my","friend"]
        },
        products: (_parent: any, args: any,  {db}: CtxArgs) => {
            return db.products;
        },
        categories: (_parent: any, args: any,  {db}: CtxArgs) => {
            return db.categories;
        },
    },
    Product: {
        category: (
            { categoryId }: { categoryId: string },
            _args: any,
            {db}: CtxArgs ) => {
            return db.categories.find((category) => category.id === categoryId)
        }
    },
    Category: {
        products: (
            { id: categoryId }: { id: string },
            args: any,
            {db}: CtxArgs) => {
            return db.products.filter((product) => product.categoryId === categoryId)
        }
    }
};