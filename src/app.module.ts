import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './cases/products/product.module';
import { CityModule } from './cases/cities/city.module';
import { CustomerModule } from './cases/customer/customer.module';
import { OrderModule } from './cases/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
    CityModule,
    CustomerModule,
    OrderModule,
  ],
})
export class AppModule {}
