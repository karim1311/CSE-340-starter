const invModel = require("../models/inventory-model")
const Util = {}


/* ***
   * Constructs the nav HTML unordered list
*********************************** */

Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    // console.log(data)
    list += '<li><a href="/" title="Home Page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/'+
            row.classification_id +
            '"title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list 
}

 /* *****************************
 *  Build the classification view HTML
 *  ****************************** */
Util.buildClassificationGrid = async function (data){
    let grid
    // console.log(data)
    if(data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
            + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
            + 'details"><img src="' + vehicle.inv_thumbnail
            + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
            +' on CSE Motors"  /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
            + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
            + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
            + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>' 
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice"> Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

 /* *****************************
 *  Build the details view HTML
 *  ****************************** */
Util.buildDetailsDiv = async function (data){
    let div
    console.log(data.inv_description)
    if(data) {
        div = '<div id="inv-details">'
            div += '<a href="../../inv/detail/' + data.inv_id
            + '" title="View ' + data.inv_make + ' ' + data.inv_model
            + 'details"><img src="'+data.inv_image
            + '" alt="Image of ' + data.inv_make + ' ' + data.inv_model
            +' on CSE Motors"  /></a>'
            div += '<div class="details">'
            div += '<h2>'
            div += data.inv_make + ' ' + data.inv_model + ' Details' 
            div += '</h2>'
            div += '<p><b>Price: $'
            + new Intl.NumberFormat('en-US').format(data.inv_price) + '</b></p>'
            div += `<p><b>Description: </b>${data.inv_description}</p>`
            div += `<p><b>Color: </b>${data.inv_color}</p>`
            div += `<p><b>Miles: </b>${new Intl.NumberFormat('en-US').format(data.inv_miles)}</p>`
            div += '</div>'
        div += '</div>'
    } else {
        div += '<p class="notice"> Sorry, no matching vehicles could be found.</p>'
    }
    return div
}

/* *************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 ************************ */

Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util