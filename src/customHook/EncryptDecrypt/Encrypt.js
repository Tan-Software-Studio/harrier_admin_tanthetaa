import cryptoJs from "crypto-js";

const Encrypt = (n) => {
  const data = cryptoJs.enc.Utf8.parse(n);
  const key = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_KEY);
  const iv = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_IV);
  const encrypted = cryptoJs.AES.encrypt(data, key, {
    iv,
    mode: cryptoJs.mode.CBC,
    keySize: 256,
  });
  return encrypted.toString();
};

export default Encrypt;
