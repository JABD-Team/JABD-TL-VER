function config(){
    return{
        "name": "id",
        "main": "id.js",
        "commandMap": {
            "id": {
                "more": "",
                "des": "",
                "func": "id"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function id(ctx){
    ctx.reply(JSON.stringify(ctx))
}

module.exports = {
    id,
    config
};