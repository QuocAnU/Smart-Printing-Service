const ftp = require("basic-ftp") 
// ESM: import * as ftp from "basic-ftp"

sendFile()

async function sendFile(filename) {
    const client = new ftp.Client(60000);
    //connect to fpt server
    client.ftp.verbose = true;
    try {
        let ftpResp = await client.access({
            host: "conganhluan.com",
            user: "btl-cnpm@conganhluan.com",
            password: "btl-cnpm123",
            secureOptions: {},
        });
        console.log("connect succeess");
        await client.ensureDir("btl_cnpm_store_fileP");
        let pwd = await client.pwd();
        await client.uploadFrom(
            this.configService.get("UPLOAD_DIR") + "/" + filename,
            pwd + "/" + filename,
        );
        let file_list = await client.list();
        for (const file of file_list) {
            console.log(file);
        }

        await client.remove(pwd + "/" + filename);
    } catch (err) {
        //TODO: throw a HTTP response instead
        throw err;
    }

    client.close();
}