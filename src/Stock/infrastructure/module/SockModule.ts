import { Module } from '@nestjs/common';
import { ProductMapperProfile } from '../autoMapper/ProductMapperProfile';
import ProductController from '../controller/ProductController';
import FieldController from '../controller/FieldController';
import WarehouseController from '../controller/WarehouseController';
import StockMovementController from '../controller/StockMovementController';
import BatchController from '../controller/BatchController';
import BatchService from 'Stock/application/service/BatchService';
import ProductService from 'Stock/application/service/ProductService';
import FieldService from 'Stock/application/service/FieldService';
import WarehouseDetailService from 'Stock/application/service/WarehouseDetailService';
import StockMovementDetailService from 'Stock/application/service/StockMovementDetailService';
import WarehouseService from 'Stock/application/service/WarehouseService';
import StockMovementService from 'Stock/application/service/StockMovementService';
import StockMovementDataProvider from '../dataProvider/StockMovementDataProvider';
import WarehouseDataProvider from '../dataProvider/WarehouseDataProvider';
import BatchDataProvider from '../dataProvider/BatchDataProvider';
import FieldDataProvider from '../dataProvider/FieldDataProvider';
import WarehouseDetailDataProvider from '../dataProvider/WarehouseDetailDataProvider';
import StockMovementDetailDataProvider from '../dataProvider/StockMovementDetailDataProvider';
import ProductDataProvider from '../dataProvider/ProductDataProvider';
import ProductRepository from 'Stock/application/repository/ProductRepository';
import StockMovementDetailRepository from 'Stock/application/repository/StockMovementDetailRepository';
import WarehouseDetailRepository from 'Stock/application/repository/WarehouseDetailRepository';
import WarehouseRepository from 'Stock/application/repository/WarehouseRepository';
import StockMovementRepository from 'Stock/application/repository/StockMovementRepository';
import BatchRepository from 'Stock/application/repository/BatchRepository';
import FieldRepository from 'Stock/application/repository/FieldRepository';
import ProductValidations from 'Stock/application/validations/ProductValidations';
import WarehouseValidations from 'Stock/application/validations/WarehouseValidations';
import FieldValidations from 'Stock/application/validations/FieldValidations';
import BatchValidations from 'Stock/application/validations/BatchValidations';
import { WarehouseMapperProfile } from '../autoMapper/WarehouseMapperProfile';
import { StockMovementDetailProfile } from '../autoMapper/StockMovementDetailProfile';
import { StockMovementProfile } from '../autoMapper/StockMovementMapperProfile';
import { WarehouseDetailMapperProfile } from '../autoMapper/WarehouseDetailMapperProfile';
import { BatchMapperProfile } from '../autoMapper/BatchMapperProfile';
import { FieldMapperProfile } from '../autoMapper/FieldMapperProfile';
import { StockMovementGenerator } from 'Stock/application/factories/StockMovementGenerator';
import AplicatorService from 'Stock/application/service/AplicatorService';
import AplicatorRepository from 'Stock/application/repository/AplicatorRepository';
import AplicatorValidations from 'Stock/application/validations/AplicatorValidations';
import AplicatorDataProvider from '../dataProvider/AplicatorDataProvider';
import AplicatorController from '../controller/AplicatorController';
import { AplicatorMapperProfile } from '../autoMapper/AplicatorMapperProfile';
import CategoryController from '../controller/CategoryController';
import CategoryService from 'Stock/application/service/CategoryService';
import CategoryRepository from 'Stock/application/repository/CategoryRepository';
import CategoryDataProvider from '../dataProvider/CategoryDataProvider';
import CategoryValidations from 'Stock/application/validations/CategoryValidations';
import { CategoryMapperProfile } from '../autoMapper/CategoryMapperProfile';
import { HttpModule } from '@nestjs/axios';
import AfipService from 'Stock/application/service/AfipService';
import DocumentGeneratorService from 'Stock/application/service/DocumentGeneratorService';
import StockParametersController from '../controller/StockParametersController';
import StockParametersService from 'Stock/application/service/StockParametersService';
import StockParametersRepository from 'Stock/application/repository/StockParametersRepository';
import StockParametersDataProvider from '../dataProvider/StockParametersDataProvider';
import { StockParametersMapperProfile } from '../autoMapper/StockParametersMapperProfile';
import StockParametersValidations from 'Stock/application/validations/StockParametersValidations';

@Module({
  controllers: [
    ProductController,
    WarehouseController,
    StockMovementController,
    BatchController,
    StockParametersController,
    FieldController,
    CategoryController,
    AplicatorController,
  ],
  imports: [HttpModule],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductDataProvider,
    },
    ProductMapperProfile,
    ProductValidations,
    WarehouseService,
    {
      provide: WarehouseRepository,
      useClass: WarehouseDataProvider,
    },
    WarehouseMapperProfile,
    WarehouseValidations,
    WarehouseDetailService,
    {
      provide: WarehouseDetailRepository,
      useClass: WarehouseDetailDataProvider,
    },
    StockMovementService,
    {
      provide: StockMovementRepository,
      useClass: StockMovementDataProvider,
    },
    StockMovementProfile,
    StockMovementDetailService,
    {
      provide: StockMovementDetailRepository,
      useClass: StockMovementDetailDataProvider,
    },
    StockMovementDetailProfile,
    WarehouseDetailMapperProfile,
    StockMovementGenerator,
    BatchService,
    StockParametersService,
    {
      provide: BatchRepository,
      useClass: BatchDataProvider,
    },
    {
      provide: StockParametersRepository,
      useClass: StockParametersDataProvider,
    },
    BatchMapperProfile,
    StockParametersMapperProfile,
    StockParametersValidations,
    BatchValidations,
    FieldService,
    CategoryService,
    FieldValidations,
    CategoryValidations,
    {
      provide: FieldRepository,
      useClass: FieldDataProvider,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryDataProvider,
    },
    CategoryMapperProfile,
    FieldMapperProfile,
    AplicatorService,
    AplicatorValidations,
    {
      provide: AplicatorRepository,
      useClass: AplicatorDataProvider,
    },
    AplicatorMapperProfile,
    AfipService,
    DocumentGeneratorService,
  ],
})
export default class StockModule {}
