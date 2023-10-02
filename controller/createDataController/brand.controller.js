const { catchAsync, sendResponse } = require("../../helpers/utils");


const brandcreate = {};

brandcreate.createBrand = catchAsync(async (req, res, next) => {
    const {brand} = req.body
    sendResponse(res,200, true, brand, null, "create brand success" ) 
})

module.exports = brandcreate