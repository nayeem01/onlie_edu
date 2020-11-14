const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utilis/errorResponse");

// @route GET  api/v1/bootcamp
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find();

        if (!bootcamp) {
            return console.log(res.status(400).json({ success: false }));
        }

        res.status(200).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        next(new ErrorResponse(`bootcamp not found`, 404));
    }
};

// @route GET api/v1/bootcamp
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
        next(
            new ErrorResponse(`bootcamp not found id of ${req.params.id}`, 404)
        );
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
        //res.status(400).json({ success: false });
        next(new ErrorResponse(`bootcamp not found`, 404));
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
