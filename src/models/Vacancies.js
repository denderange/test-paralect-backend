import mongoose from "mongoose";
const { Schema } = mongoose;

const vacancySchema = new Schema({
	company: { type: String, required: true },
	vacancy: { type: String, required: true },
	salary_fork: {
		from: { type: Number, required: true },
		to: { type: Number, required: true },
	},
	response_status: { type: String, default: "не просмотрено" },
	note: { type: String, required: true },
});

export const VacancyModel = mongoose.model("vacancies", vacancySchema);
