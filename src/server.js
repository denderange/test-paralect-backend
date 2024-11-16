import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { vacanciesRouter } from "./routes/vacancies.js";
dotenv.config();

const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/vacancies", vacanciesRouter);

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("DB connected");

		app.listen(PORT, () => {
			console.log(`Server port: ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
