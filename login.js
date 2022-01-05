const { Telegraf } = require('telegraf')

const bot = new Telegraf(global.config.token)
var date = new Date();
//check update
var axios = require("axios")
async function checkupdate() {
	try {
		const { data } = await axios.get("https://raw.githubusercontent.com/JABD-Team/JABD-TL-VER/main/package.json");
		if (data.version != global.package.version) {
			console.log("Đã có bản cập nhật mới OwO");
		} else {
		console.log("Bạn đang sử dụng phiên bản mới nhất UwU");
		}
	} catch(e) {
		console.log("Đã có lỗi xảy ra.");
		console.log(e)
	}
}
checkupdate()
bot.on('message', function (ctx) {
    if(ctx.message.text != undefined && ctx.message.text.slice(0,global.config.prefix.length) == global.config.prefix){
                args = ctx.message.text.slice(global.config.prefix.length).trim().split(/ +/);
                runCM(ctx);
        }
        if(ctx.message.photo){
            console.log(JSON.stringify(ctx.message, null, 4));
        } else if(ctx.message.sticker) {
            console.log("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + `[${ctx.message.from.id} đến ${ctx.message.chat.id}] : ${ctx.message.sticker.emoji}`);
        } else {
    console.log("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + `[${ctx.message.from.id} đến ${ctx.message.chat.id}] : ${ctx.message.text}`);
        }})
function runCM(ctx){
    var cm = ctx.message.text.slice(global.config.prefix.length, ctx.message.text.length);
    var ms = cm.split(" ");
    var ccm = false;
    if(global.plugins.command[ms[0]] != undefined){
        try{
            var requireCM = require(global.plugins.command[ms[0]].dir);
            var func = global.plugins.command[ms[0]].func
            requireCM[func](ctx);
        }
        catch(err){
            console.log("["+global.plugins.command[ms[0]].namePlugin+"] "+err)
            ctx.reply(err);
        }
        ccm = true
    }
    if (!ccm) ctx.reply(`Sai lệnh. Sử dụng "${global.config.prefix}help" để xem danh sách lệnh`);
}

const fs = require('fs');
const path = require("path");
const childProcess = require('child_process');
const scanDir = scanDirs

function scanDirs(type, link){
    //readDir
    var dirfile = fs.readdirSync(link);
    var arr = [];
    for (var i=0; i<dirfile.length; i++ ){
            if(dirfile[i].lastIndexOf(type) == dirfile[i].length-type.length){
                if(fs.lstatSync(path.join(link, dirfile[i])).isFile()){
                    arr.push(dirfile[i]);
                }
            }
    }
    return arr;
}
function loadPlugin(){
    !global.plugins ? global.plugins = {}:"";
    !global.plugins.command ? global.plugins.command = {}:"";
    !global.noPrefix ? global.noPrefix = {}:"";
    var list = scanDir(".js", path.join(__dirname, "func"));
    var listFile = [];
    for(var i=0; i<list.length; i++){
        var check = path.join(__dirname, "func", list[i]);
        if (!fs.lstatSync(check).isDirectory()) {
            listFile.push(list[i]);
        }
    }
    var check = false;
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname,"func", listFile[i])).config();
            var t = installmd(listFile[i], pluginInfo);
            if(t != undefined){
                check = true;
            }
        }
        catch(err){
            //console.error(err);
        }
    }
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname, "func", listFile[i])).config();
            var t = installmd(listFile[i], pluginInfo);
            if(t != undefined){
                check = true;
            }
        }
        catch(err){
            //console.error(err);
        }
    }
    
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname,  "func", listFile[i])).config();
            load(listFile[i], pluginInfo);
        }
        catch(err){
            console.error("Không thể load \""+listFile[i]+"\" với lỗi: "+err)
        }
    }
}
function load(file, pluginInfo){
    //try{
        var funcmain = require(path.join(__dirname, "func", file));
        for(var i in pluginInfo.commandMap){
            !global.plugins.command[i] ? global.plugins.command[i] = {}:"";
            !global.plugins.command[i].help ? global.plugins.command[i].name = pluginInfo.name:"";
            !global.plugins.command[i].help ? global.plugins.command[i].more = pluginInfo.commandMap[i].more:"";
            !global.plugins.command[i].tag ? global.plugins.command[i].des = pluginInfo.commandMap[i].des:"";
            !global.plugins.command[i].author ? global.plugins.command[i].author = pluginInfo.author:"";
            !global.plugins.command[i].main ? global.plugins.command[i].dir = path.join(__dirname, "func", file):"";
            !global.plugins.command[i].mainFunc ? global.plugins.command[i].func = pluginInfo.commandMap[i].func:"";
        }
            if(typeof pluginInfo.noPrefix == "string"){
                !global.noPrefix[pluginInfo.name] ? global.noPrefix[pluginInfo.name] = {
                    dir: path.join(__dirname,"func", file),
                    func: pluginInfo.noPrefix
                }:"";
            }
        console.log("Đã Load Thành Công Func : "+pluginInfo.name+" "+pluginInfo.version+" bởi "+pluginInfo.author)
    //}
    /*catch(err){
        console.error("Không thể load command \""+file+"\" với lỗi: "+err)
    }*/
}
function installmd(file, pluginInfo){
    if(typeof pluginInfo.nodeDepends == "object"){
        for (var i in pluginInfo.nodeDepends){
            if (!fs.existsSync(path.join(__dirname, "node_modules", i, "package.json"))) {
                
                console.log("Tiến hành cài đặt Module \""+i+"\" cho Func \""+pluginInfo.name+"\":\n");
                if(pluginInfo.nodeDepends[i] != ""){
                    childProcess.execSync(`npm install ${i}@${pluginInfo.nodeDepends[i]}`,{
                        stdio: "inherit"
                    })
                }
                else{
                    childProcess.execSync(`npm install ${i}`,{
                        stdio: "inherit"
                    })
                }
                return true;
            }
        }
    }
}
loadPlugin();
if(!global.config.token){
    console.log("Không tìm thấy token, vui lòng tạo token và thêm vào file config.json")
    process.exit(0);
} else {
    console.log("Bot đã được khởi động thành công!")
    console.log("Bot bắt đầu nhận tin nhắn\n");
	console.log("     /$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$\n    |__  $$ /$$__  $$| $$__  $$| $$__  $$\n       | $$| $$  \\ $$| $$  \\ $$| $$  \\ $$\n       | $$| $$$$$$$$| $$$$$$$ | $$  | $$\n  /$$  | $$| $$__  $$| $$__  $$| $$  | $$\n | $$  | $$| $$  | $$| $$  \\ $$| $$  | $$\n |  $$$$$$/| $$  | $$| $$$$$$$/| $$$$$$$/\n  \\______/ |__/  |__/|_______/ |_______/\n");
    console.log("\n")
    bot.launch()
}
