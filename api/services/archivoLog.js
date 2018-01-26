module.exports ={

    escribirLog: function(operacion){
        var fs = require('fs');
            var moment = require("moment");
            fs.appendFileSync("log.txt", ">>Start "+operacion+" at "+ moment().format() + "\n", "UTF-8",{'flags':'a+'} );

            
            const{ exec }  = require('child_process');
            exec('free', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
  
                fs.appendFileSync("log.txt",`${stdout}`,"UTF-8",{'flags':'a+'});
                //fs.appendFileSync("log.txt",">>end CREATE at " + moment().format()+"\n","UTF-8",{'flags':'a+'});
            });
            
            exec('uptime', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
  
                fs.appendFileSync("log.txt",`${stdout}`,"UTF-8",{'flags':'a+'});
               // fs.appendFileSync("log.txt",">>end CREATE at " + moment().format()+"\n","UTF-8",{'flags':'a+'});
            });
            exec('df-h', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
  
                fs.appendFileSync("log.txt",`${stdout}`,"UTF-8",{'flags':'a+'});
               // fs.appendFileSync("log.txt",">>end CREATE at " + moment().format()+"\n","UTF-8",{'flags':'a+'});
            });
            exec('iostat', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
  
                fs.appendFileSync("log.txt",`${stdout}`,"UTF-8",{'flags':'a+'});
               // fs.appendFileSync("log.txt",">>end CREATE at " + moment().format()+"\n","UTF-8",{'flags':'a+'});
            });
            var hrTime = process.hrtime();
            var t_final =(hrTime[0] * 1000000 + hrTime[1] / 1000);
            fs.appendFileSync("log.txt","tiempo total "+t_final+ " microsegundos \n","UTF-8",{'flags':'a+'});

    }
}
