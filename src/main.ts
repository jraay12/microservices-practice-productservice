import express from "express";
import ProductRoute from "./interfaces/routes/product.route";
import { errorHandler } from "./shared/error/GlobalError";
import StockRoute from "./interfaces/routes/stock.routes";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/product", ProductRoute);
app.use("/stock", StockRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
