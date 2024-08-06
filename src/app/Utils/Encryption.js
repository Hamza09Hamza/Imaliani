import { AES, enc } from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;
const IV = process.env.ENCRYPTION_IV;  // Make sure to set this environment variable
export const encryptData = (data) => {

    if (!SECRET_KEY || !IV) {
        throw new Error("Encryption secret key or IV is not defined");
    }

    try {
        let iv = enc.Hex.parse(IV);
        let key = enc.Hex.parse(SECRET_KEY);
        let encrypted = AES.encrypt(data, key, { iv: iv });
        return encrypted.toString();
    } catch (error) {
        console.error("Error encrypting data: ", error);
        throw new Error("Failed to encrypt data.");
    }
};

export const decryptData = (data) => {

    if (!SECRET_KEY || !IV) {
        throw new Error("Encryption secret key or IV is not defined");
    }

    try {
        let iv = enc.Hex.parse(IV);
        let key = enc.Hex.parse(SECRET_KEY);
        let decrypted = AES.decrypt(data, key, { iv: iv });
        return decrypted.toString(enc.Utf8);
    } catch (error) {
        console.error("Error decrypting data: ", error);
        throw new Error("Failed to decrypt data.");
    }
};
