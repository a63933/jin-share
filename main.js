const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')
const { exec } = require('child_process')

let pathObj = {
    source: path.resolve(process.cwd(), 'source.html'),
    target: path.resolve(process.cwd(), 'index.html')
}

fs.writeFileSync(pathObj.source, `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`)

fs.watch(pathObj.source, () => {
    let rs = fs.createReadStream(pathObj.source)

    // rs.on('data', (chunk) => {
    //     console.log(chunk.toString())
    // })
    
    let ws = fs.createWriteStream(pathObj.target)
    
    let oT = new Transform({
        transform(chunk, encoding, callback){
            let input = chunk.toString()
            let output = input.toUpperCase()
            callback(null, output)
        }
    })
    
    rs.pipe(oT).pipe(ws);
})

exec(`browser-sync ` + process.cwd() + ' --watch')
console.log(`browser-sync ` + process.cwd() + ' --watch')