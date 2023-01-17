import cryptoJs from "crypto-js";

const Decrypt = (n) => {
  const key = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_KEY);
  const iv = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_IV);

  const decrypt = cryptoJs.AES.decrypt(n, key, {
    iv,
    mode: cryptoJs.mode.CBC,
    keySize: 256,
  });
  return decrypt.toString(cryptoJs.enc.Utf8);
};
export default Decrypt;
