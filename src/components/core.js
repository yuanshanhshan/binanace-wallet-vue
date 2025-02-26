import { Core } from "@binance/w3w-core";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

class Client {


  async connect () {
    const client = new Core();
    let chainId = null;
    let accounts = null;
    try {
      const rs = await client.connect({ lng: "zh-CN" });
      // this.client = client;
      chainId = rs.chainId;
      accounts = rs.accounts;
      this.updateUI();
    } catch (error) {
      console.log(
        "🚀 ~ file: core.js:19 ~ connect ~ error:",
        error.code,
        error.message,
        client.pending
      );
    }
    return { client, chainId, accounts };
  }

  async disconnect (client) {
    if (!client) return;
    try {
      await client.disconnect();
      this.chainId = "0x0";
      this.accounts = [];
      this.updateUI();
    } catch (error) {
      console.log(
        "🚀 ~ file: core.js:34 ~ disconnect ~ error:",
        error.code,
        error.message)
    }
  }
  async ethSign (client, wallet, nonce) {
    if (!client) {
      console.log("请先连接钱包");
      return
    }
    const message =
      'Welcome to Sleepless AI Lab!\n' +
      'Click to sign-in and accept our agreements:\n' +
      'Privacy Policy (https://img.sleeplessailab.com/PRIVACY%20POLICY.html)\n' +
      'Terms & Conditions (https://img.sleeplessailab.com/TERMS%20AND%20CONDITIONS.html)\n' +
      '\n' +
      'This request will not trigger a blockchain transaction or cost any gas fees.\n' +
      '\n' +
      'Wallet address:' +
      wallet +
      '\n' +
      '\n' +
      'Nonce:' +
      nonce;
    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;

    console.log(msg);

    const rs = await client
      .request({
        method: "personal_sign",
        params: [msg, client.accounts[0]],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx:34 ~ personalSign ~ error:",
          error.code,
          error.message
        );
      });
    console.log("🚀 ~~ file: client.tsx:45 ~~ personalSign ~~ rs:", rs);
    return rs;
  }
}

// 导出 Client 类
export default Client;
