// @route GET  api/v1/bootcamp
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "show all",
    });
};

// @route POST api/v1/bootcamp
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `update bootcamp ${req.params.id}`,
    });
};

// @route post api/v1/bootcamp
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "creat bootcamp",
    });
};

// @route PUT api/v1/bootcamp
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `update bootcamp ${req.params.id}`,
    });
};
// @route delete api/v1/bootcamp
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `delete bootcamp ${req.params.id}`,
    });
};
