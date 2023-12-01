const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// 指定ポート番号3524　by mocha
const port = 3524;

const cors = require("cors");
app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "user_3524", // PostgreSQLのユーザー名に置き換えてください
  host: "db", // Docker環境内で動作させる場合、PostgreSQLデータベースへの接続ホストは データベースサービスの名前のため、localhostからdbの変更。by mocha
  database: "crm_3524", // PostgreSQLのデータベース名に置き換えてください
  password: "pass_3524", // PostgreSQLのパスワードに置き換えてください
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GETエンドポイント: 顧客一覧を取得
app.get("/customer/list", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POSTエンドポイント: 顧客を追加
app.post("/add-customer", async (req, res) => {
  try {
    // Expressアプリケーションのログを確認できるよう,ChatGPTにいわれた一行を追加 by mocha    
    console.log("Received POST request to /add-customer"); // Uncommented this line
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message }); // Changed the error message to include the actual error
  }
});

// GETエンドポイント: 顧客詳細を取得
app.get("/customer/detail.html", async (req, res) => {
  try {
    const customerId = req.query.customer_id;
    const customerDetail = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [customerId]);

    if (customerDetail.rows.length === 0) {
      res.status(404).json({ success: false, message: "Customer not found" });
    } else {
      // 顧客詳細をJSON形式でクライアントに返す
      res.json({ success: true, customer: customerDetail.rows[0] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 顧客削除のエンドポイント
app.delete("/customer/delete", async (req, res) => {
  try {
    const customerId = req.query.customer_id;
    // 顧客を削除するクエリを実行
    const deleteResult = await pool.query("DELETE FROM customers WHERE customer_id = $1", [customerId]);

    if (deleteResult.rowCount === 0) {
      res.status(404).json({ success: false, message: "Customer not found" });
    } else {
      res.json({ success: true, message: "Customer deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 静的ファイルの提供
app.use(express.static("public"));
