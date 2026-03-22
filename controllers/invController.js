const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ****************************
 *  Build inventory by classification view
 * ******************************* */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ****************************
 *  Build details by inventory id view
 * ******************************* */
invCont.buildByInventoryId = async function (req, res, next) {
    const inventory_id = req.params.inventoryId
    const data = await invModel.getInventoryByInventoryId(inventory_id)
    const div = await utilities.buildDetailsDiv(data)
    let nav = await utilities.getNav()
    const classYear = data.inv_year
    const className = data.inv_make
    const classModel = data.inv_model
    res.render("./inventory/detail", {
        title: classYear + ' ' + className + ' ' + classModel,
        nav,
        div,
    })
}

/* ****************************
 *  Build error  view
 * ******************************* */
invCont.buildErrorView = async function (req, res, next) {
    const inventory_id = req.params.inventoryId
    // const div = await utilities.buildDetailsDiv(data)
    let nav = await utilities.getNav()
    // const classYear = data.inv_year
    // const className = data.inv_make
    // const classModel = data.inv_model
    res.render("./errors/error", {
        title:  'Error!!!',
        nav,
        // div,
    })
}

module.exports = invCont