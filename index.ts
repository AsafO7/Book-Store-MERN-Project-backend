import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import {router as bookRouter} from './src/books/book.route'
const cors = require('cors')

const mongoose = require('mongoose');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'https://book-store-mern-project-chi.vercel.app', 'https://book-store-mern-project-backend-94fm.vercel.app/'],
  credentials: true,
}))

const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')

app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/admin', adminRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.get("/", (req: Request, res: Response) => {
    res.send("Book Server");
  });
}

main().then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});