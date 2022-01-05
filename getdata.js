const fs = require("fs");
const path = require("path");
var stripBom = require("strip-bom");
var originaldata = {}

function getDT(){
    if (fs.existsSync("./data.json")) {
        console.log('Đã Tìm Thấy File Data!');
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "data.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.log(err);
            console.log("Không thể đọc dữ liệu File Data! Tiến hành dừng bot để tránh lỗi không mong muốn...");
            process.exit(101);
        }
    } else if (!fs.existsSync("./data.json")) {
        console.log('Chưa Tìm Thấy Data!')
        console.log('Khởi tạo Data File...');
        try{
            fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(originaldata, null, 4)); 
            console.log('Tạo File Data Thành Công!')
        } catch (_) {
            console.log("Lỗi Khi Tạo Data!");
        }
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "data.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.log(err);
            console.logr("Không thể đọc dữ liệu File Data! Tiến hành dừng bot để tránh lỗi không mong muốn...");
            process.exit(101);
        }
    }
}

module.exports = getDT;