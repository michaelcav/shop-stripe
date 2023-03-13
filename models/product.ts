import { Schema, Model, model, models, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    picture: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    picture: { type: String, required: true }
});

const Product: Model<IProduct> = models?.Product || model<IProduct>('Product', ProductSchema);

export default Product;
