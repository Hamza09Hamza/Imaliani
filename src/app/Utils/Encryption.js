import  { AES,enc } from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY;

export const encryptData = (data) => {
    if (!SECRET_KEY) {
        throw new Error("Encryption secret key is not defined");
    }
    return AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (data) => {
    if (!SECRET_KEY) {
        throw new Error("Encryption secret key is not defined");
    }
    const bytes = AES.decrypt(data, SECRET_KEY);
    return bytes.toString(enc.Utf8);;
};
