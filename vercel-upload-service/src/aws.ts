import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "5260d8e7bc82efd61ef07ff8f5972511",
    secretAccessKey: "cfdadfb39dffadf3aaee654088c362f18afb993b0652b74ff2e771366b5c42b0",
    endpoint: "https://3a798d814adc9fc4c7555db521ffa956.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}
