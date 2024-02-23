import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "5260d8e7bc82efd61ef07ff8f5972511",
    secretAccessKey: "cfdadfb39dffadf3aaee654088c362f18afb993b0652b74ff2e771366b5c42b0",
    endpoint: "https://3a798d814adc9fc4c7555db521ffa956.r2.cloudflarestorage.com"
})


const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();

    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);