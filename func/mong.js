function config(){
    return{
        "name": "Mong",
        "main": "Mong.js",
        "commandMap": {
            "mong": {
                "more": "",
                "des": "Request ảnh zu to dit bu",
                "func": "mong"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function mong(ctx){
    var axios = require("axios");
    try {
    ctx.replyWithPhoto({
        url: (await axios('https://api.ditlolichapfbi.tk/image?type=mong&apikey=phongdeptraiprovip')).data.data,
    })
    } catch(err) {
        ctx.reply(err);
    }
    }

module.exports = {
    mong,
    config
};