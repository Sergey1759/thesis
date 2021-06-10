var multer = require('multer');
var path = require('path');

console.log(1111111111111111);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(222222222222);
        console.log(__dirname);
        cb(null, path.join('./', 'uploads'))
    },
    filename: function (req, file, cb) {
        let name = file.originalname;
        let k = name.replace('.jpg', '')
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
let _multer = upload.single('avatar');





module.exports = {
    _multer
}
