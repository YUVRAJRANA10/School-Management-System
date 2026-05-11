const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const pool = require("./db/pool");
const schoolRoutes = require("./routes/school.routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", async (req, res, next) => {
	try {
		await pool.query("SELECT 1");
		return res.status(200).json({
			success: true,
			message: "OK",
			data: { db: true },
			error: null,
		});
	} catch (err) {
		return next(err);
	}
});

app.use("/", schoolRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
