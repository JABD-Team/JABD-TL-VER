function config(){
    return{
        "name": "spotgen",
        "main": "spotgen.js",
        "commandMap": {
            "spotgen": {
                "more": "",
                "des": "Gen spotify account",
                "func": "spotgen"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function spotgen(ctx){
    var axios = require("axios");
    try {
    var {data} = await axios.get('http://justgon-dev.site/spot')
    if(data.resultout[0].status == 'success') {
      ctx.reply(`Success\nEmail : ${data.resultout[0].email}\nPassword : ${data.resultout[0].password}`)
    } else {
      ctx.reply(`Failed\nEmail : ${data.resultout[0].email}\nPassword : ${data.resultout[0].password}`)
    } catch(err) {
        ctx.reply(err);
    }
    }

module.exports = {
    spotgen,
    config
};
