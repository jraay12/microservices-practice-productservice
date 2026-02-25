import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductRepositoryImpl } from "../../infrastructure/database/ProductRepositoryImpl";
import { JWTServiceImpl } from "../../infrastructure/jwt/JWTImpl.service";
import { CreateProductUsecase } from "../../application/usecases/create-product.usecase";
import { prisma } from "../../infrastructure/database/prisma";
import { authMiddleware } from "../middleware/auth.middleware";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) throw new Error("Access Token is missing");

// repository
const productRepo = new ProductRepositoryImpl(prisma);

// usecase
const createProductUsecase = new CreateProductUsecase(productRepo);

// jwt service
const jwtService = new JWTServiceImpl(accessTokenSecret);

// controller
const productController = new ProductController(createProductUsecase);

const router = Router();

router.post("/create", authMiddleware(jwtService), productController.create);

export default router;
