function config(){
    return{
        "name": "Nude",
        "main": "Nude.js",
        "commandMap": {
            "mong": {
                "more": "",
                "des": "Request ảnh nude",
                "func": "nude"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function nude(ctx){
    var axios = require("axios");
    try {
    ctx.replyWithPhoto({
        url: (await axios('https://api-milo.herokuapp.com/nude')).data.url,
    })
    } catch(err) {
        ctx.reply(err);
    }
    }

module.exports = {
    nude,
    config
};
