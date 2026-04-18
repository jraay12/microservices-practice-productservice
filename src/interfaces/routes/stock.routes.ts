import { AddStockUsecase } from './../../application/usecases/add-stock.usecase';
import { StockController } from './../controllers/stock.controller';
import { Router } from "express";
import { ProductRepositoryImpl } from "../../infrastructure/database/ProductRepositoryImpl";
import { JWTServiceImpl } from "../../infrastructure/jwt/JWTImpl.service";
import { prisma } from "../../infrastructure/database/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { StockRepositoryImpl } from '../../infrastructure/database/StockRepositoryImpl';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) throw new Error("Access Token is missing");

// repository
const productRepo = new ProductRepositoryImpl(prisma);
const stockRepo = new StockRepositoryImpl(prisma)

// usecase
const addStockUsecase = new AddStockUsecase(stockRepo, productRepo);

// jwt service
const jwtService = new JWTServiceImpl(accessTokenSecret);

// controller
const stockController = new StockController(addStockUsecase);

const router = Router();

router.post("/:product_id/add", authMiddleware(jwtService), stockController.create);

export default router;
