var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        cb(null, path.join('./', 'uploads'))
    },
    filename: function (req, file, cb) {
        let name = file.originalname;
        let k = name.replace('.txt', '')
        cb(null, k + '' + curentTime())
    }
})
var upload = multer({
    storage: storage
});

function curentTime() {
    var date = new Date();
    let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} `;
    return str;
}
let midlle_for_multer = upload.single('test');





module.exports = {
    midlle_for_multer
}
