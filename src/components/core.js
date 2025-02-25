import { Core } from "@binance/w3w-core";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

class Client {
  constructor() {
    this.client = new Core();
    this.accounts = [];
    this.chainId = "0x0";
    this.sign = "";
  }

  async connect () {
    try {
      const rs = await this.client.connect({ lng: "zh-CN" });
      // this.client = client;
      this.chainId = rs.chainId;
      this.accounts = rs.accounts;
      this.updateUI();
    } catch (error) {
      console.log(
        "🚀 ~ file: core.js:19 ~ connect ~ error:",
        error.code,
        error.message,
        this.client.pending
      );
    }
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

  updateUI () {
    // 更新UI的逻辑，例如显示连接状态、账户信息等
    const root = document.getElementById('root');
    root.innerHTML = `
      <div>
        <p>Chain ID: ${this.chainId}</p>
        <p>Accounts: ${this.accounts.join(', ')}</p>
        <p>Sign: ${this.sign}</p>
      </div>
    `;
  }

  async ethSign () {
    if (!this.client) {
      console.log("请先连接钱包");
      return
    }

    const msg = `0x${Buffer.from("hello", "utf8").toString("hex")}`;

    console.log(msg);

    const rs = await this.client
      .request({
        method: "personal_sign",
        params: [msg, this.client.accounts[0]],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx:34 ~ personalSign ~ error:",
          error.code,
          error.message
        );
      });
    this.sign = rs;
    this.updateUI();
    console.log("🚀 ~~ file: client.tsx:45 ~~ personalSign ~~ rs:", rs);
  }
}

// 导出 Client 类
export default Client;
