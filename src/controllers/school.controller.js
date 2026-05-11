const pool = require("../db/pool");
const {
	isNonEmptyString,
	isValidLatitude,
	isValidLongitude,
	toNumber,
} = require("../middleware/validate");
const { successResponse, errorResponse } = require("../utils/response");

const addSchool = async (req, res, next) => {
	try {
		const { name, address, latitude, longitude } = req.body;

		if (!isNonEmptyString(name)) {
			return errorResponse(res, 400, "Name is required", "INVALID_NAME");
		}
		if (!isNonEmptyString(address)) {
			return errorResponse(res, 400, "Address is required", "INVALID_ADDRESS");
		}
		if (!isValidLatitude(latitude)) {
			return errorResponse(res, 400, "Latitude is invalid", "INVALID_LATITUDE");
		}
		if (!isValidLongitude(longitude)) {
			return errorResponse(res, 400, "Longitude is invalid", "INVALID_LONGITUDE");
		}

		const lat = toNumber(latitude);
		const lng = toNumber(longitude);

		const insertSql =
			"INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
		const [result] = await pool.execute(insertSql, [name.trim(), address.trim(), lat, lng]);

		return successResponse(res, 201, "School added", {
			id: result.insertId,
			name: name.trim(),
			address: address.trim(),
			latitude: lat,
			longitude: lng,
		});
	} catch (err) {
		return next(err);
	}
};

const listSchools = async (req, res, next) => {
	try {
		const { latitude, longitude } = req.query;

		if (!isValidLatitude(latitude)) {
			return errorResponse(res, 400, "Latitude is invalid", "INVALID_LATITUDE");
		}
		if (!isValidLongitude(longitude)) {
			return errorResponse(res, 400, "Longitude is invalid", "INVALID_LONGITUDE");
		}

		const lat = toNumber(latitude);
		const lng = toNumber(longitude);

		const listSql = `
			SELECT
				id, name, address, latitude, longitude,
				(6371 * ACOS(
					COS(RADIANS(?)) * COS(RADIANS(latitude)) *
					COS(RADIANS(longitude) - RADIANS(?)) +
					SIN(RADIANS(?)) * SIN(RADIANS(latitude))
				)) AS distance_km
			FROM schools
			ORDER BY distance_km ASC
		`;

		const [rows] = await pool.execute(listSql, [lat, lng, lat]);
		const data = rows.map((row) => ({
			...row,
			distance_km: row.distance_km === null ? null : Number(row.distance_km),
		}));

		return successResponse(res, 200, "Schools sorted by proximity", data);
	} catch (err) {
		return next(err);
	}
};

const listAllSchools = async (req, res, next) => {
	try {
		const listSql =
			"SELECT id, name, address, latitude, longitude, created_at FROM schools ORDER BY id ASC";
		const [rows] = await pool.execute(listSql);

		return successResponse(res, 200, "All schools", rows);
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	addSchool,
	listSchools,
	listAllSchools,
};
