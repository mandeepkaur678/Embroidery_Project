import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],
    colors: [
      {
        type: String,
        trim: true,
      },
    ],
    material: {
      type: String,
      required: [true, 'Product material is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
