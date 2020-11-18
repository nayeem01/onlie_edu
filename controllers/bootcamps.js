const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utilis/errorResponse");
const geocoder = require("../utilis/geocoder");

// @route GET  api/v1/bootcamp
// exports.getBootcamps = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.find();

//         if (!bootcamp) {
//             return console.log(res.status(400).json({ success: false }));
//         }

//         res.status(200).json({
//             success: true,
//             count: bootcamp.length,
//             data: bootcamp,
//         });
//     } catch (error) {
//         next(new ErrorResponse(`bootcamp not found`, 404));
//     }
// };

// @route GET with query  api/v1/bootcamp
exports.getBootcamps = async (req, res, next) => {
    try {
        let query;

        //select remove
        let reqQuery = { ...req.query };
        const removeFeilds = ["select", "sort"];
        removeFeilds.forEach((param) => delete reqQuery[param]);
        // console.log(reqQuery);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)/g,
            (match) => `$${match}`
        );

        console.log(queryStr);

        query = Bootcamp.find(JSON.parse(queryStr));

        //select
        if (req.query.select) {
            const fields = req.query.select.split(",").join(" ");
            query = query.select(fields);
        }

        //sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        const bootcamp = await query;

        res.status(200).json({
            success: true,
            count: bootcamp.length,
            data: bootcamp,
        });
    } catch (error) {
        next(error);
    }
};

// @route GET api/v1/bootcamp/:id single bootcamp
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            // return console.log(res.status(400).json({ success: false }));
            new ErrorResponse(`bootcamp not found id of ${req.params.id}`, 404);
        }

        res.status(200).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        //console.log(res.status(400).json({ success: false }));
        // next(error);
        next(error);
    }
};

// @route post api/v1/bootcamp
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        // res.status(400).json({ success: false });
        next(error);
    }
};

// @route PUT api/v1/bootcamp
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bootcamp) {
            return console.log(res.status(400).json({ success: false }));
        }

        res.status(200).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        console.log(res.status(400).json({ success: false }));
    }
};
// @route delete api/v1/bootcamp
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return console.log(res.status(400).json({ success: false }));
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        console.log(res.status(400).json({ success: false }));
    }
};

// @route get bootcamp api/v1/bootcamp/radius/:zipcode/:distance
exports.getBootcampInradius = async (req, res, next) => {
    try {
        const { zipcode, distance } = req.params;

        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        const radius = distance / 3963;
        const bootcamps = await Bootcamp.find({
            location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
        });

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (error) {
        next(error);
    }
};
