import express from "express";
import { VacancyModel } from "../models/Vacancies.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const responce = await VacancyModel.find();
		res.json(responce);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/", async (req, res) => {
	const vacancy = new VacancyModel(req.body);

	try {
		const response = await vacancy.save();
		res.json({ response, message: "success" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { company, vacancy, salary_fork, response_status, note } = req.body;

	try {
		const updatedVacancy = await VacancyModel.findByIdAndUpdate(
			id,
			{ company, vacancy, salary_fork, response_status, note },
			{ new: true, runValidators: true }
		);

		if (!updatedVacancy) {
			return res.status(404).json({ message: "Вакансия не найдена" });
		}

		res.json(updatedVacancy);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedVacancy = await VacancyModel.findByIdAndDelete(id);

		if (!deletedVacancy) {
			return res.status(404).json({ message: "Вакансия не найдена" });
		}
		res.json({ message: "Вакансия удалена из БД" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export { router as vacanciesRouter };
