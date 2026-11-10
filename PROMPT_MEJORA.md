# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd api && npm install && npm run build` — componente `api` (practice).
4. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/domain/entities/order.entity.ts` — `OrderItem.push`: Se invoca `push` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/domain/entities/order.entity.ts` — `OrderItem.filter`: Se invoca `filter` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/domain/entities/order.entity.ts` — `OrderItem.reduce`: Se invoca `reduce` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/dtos/create-order.dto.ts` — `OrderItemResponseDto.reduce`: Se invoca `reduce` sobre `OrderItemResponseDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/dtos/create-order.dto.ts` — `OrderItemResponseDto.map`: Se invoca `map` sobre `OrderItemResponseDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz (corrida e2e 20261109193147506), Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de órdenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y lectura de órdenes — objetivo: Configurar el entorno de desarrollo y permitir la lectura de órdenes desde DynamoDB. — entregable (NO resolver): Interfaz de usuario que muestra las órdenes leídas desde DynamoDB.
- Fase 2: Creación y actualización de órdenes — objetivo: Implementar la funcionalidad para crear y actualizar órdenes en DynamoDB. — entregable (NO resolver): Interfaz de usuario que permite crear y actualizar órdenes en DynamoDB.
- Fase 3: Eliminación de órdenes — objetivo: Implementar la funcionalidad para eliminar órdenes de DynamoDB. — entregable (NO resolver): Interfaz de usuario que permite eliminar órdenes de DynamoDB.
- Fase 4: Versionado de la infraestructura — objetivo: Versionar la infraestructura de DynamoDB usando Terraform. — entregable (NO resolver): Configuración versionada de la infraestructura de DynamoDB usando Terraform.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/src/app.module.ts ===
import { Module, Logger } from '@nestjs/common';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { DynamoDbConfigModule } from './infrastructure/config/dynamodb.config';
import { getAwsConfig, toDynamoDBClientConfig } from './infrastructure/config/aws.config';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrderService } from './application/services/order.service';

@Module({
  imports: [DynamoDbConfigModule],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    OrderService,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    const awsConfig = getAwsConfig();
    const clientConfig = toDynamoDBClientConfig(awsConfig);
    const isLocal = awsConfig.endpoint !== undefined;
    
    this.logger.log(
      `AppModule initialized. Environment: ${isLocal ? 'local' : 'AWS'} | ` +
      `Region: ${awsConfig.region || 'us-east-1'} | ` +
      `Table: ${process.env.DYNAMODB_TABLE_NAME || 'orders'}`
    );
  }
}

// === ARCHIVO: api/package.json ===
{
  "name": "order-management-api",
  "version": "1.0.0",
  "description": "API para gestión de órdenes con persistencia en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.556.0",
    "@aws-sdk/lib-dynamodb": "^3.556.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.3.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "reflect-metadata": "^0.2.1",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.12.7",
    "@types/supertest": "^2.0.16",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^7.5.0",
    "@typescript-eslint/parser": "^7.5.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.4.5"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = 500;
    let message = 'Error interno del servidor';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        if (typeof responseObj.message === 'string') {
          message = responseObj.message;
        } else if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join(', ');
        }
      }
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - ${message}`,
      stack
    );

    response.status(status).json(errorResponse);
  }
}

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API para gestión de órdenes con persistencia en DynamoDB')
    .setVersion('1.0')
    .addTag('orders', 'Operaciones CRUD para gestión de órdenes')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingrese el token JWT',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Order Management API Docs',
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  
  await app.listen(port, host);
  
  logger.log(`========================================`);
  logger.log(`Application is running on: http://${host}:${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`Swagger documentation available at: http://${host}:${port}/api`);
  logger.log(`========================================`);
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap application:', error);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { v4 as uuidv4 } from 'uuid';

export class Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;

    constructor(
        customerId: string,
        items: OrderItem[],
        status: OrderStatus = OrderStatus.PENDING,
        id: string = uuidv4(),
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalAmount = this.calculateTotalAmount();
    }

    updateStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    removeItem(productId: string): void {
        this.items = this.items.filter(item => item.productId !== productId);
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    private calculateTotalAmount(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    validate(): void {
        if (!this.customerId || this.customerId.trim() === '') {
            throw new Error('Customer ID is required');
        }
        if (!this.items || this.items.length === 0) {
            throw new Error('Order must have at least one item');
        }
        if (this.totalAmount <= 0) {
            throw new Error('Total amount must be greater than zero');
        }
    }
}

export class OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;

    constructor(productId: string, productName: string, price: number, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

// === ARCHIVO: api/src/domain/repositories/order.repository.ts ===
import { Order } from '../entities/order.entity';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: Partial<Order>): Promise<Order>;
    delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/application/dtos/create-order.dto.ts ===
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../../domain/entities/order.entity';

class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty({ message: 'Customer ID is required' })
    customerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    @IsEnum(OrderStatus)
    status?: OrderStatus;

    constructor(customerId: string, items: CreateOrderItemDto[], status?: OrderStatus) {
        this.customerId = customerId;
        this.items = items;
        this.status = status || OrderStatus.PENDING;
    }

    validate(): void {
        if (!this.customerId || this.customerId.trim() === '') {
            throw new Error('Customer ID is required');
        }
        if (!this.items || this.items.length === 0) {
            throw new Error('Order must have at least one item');
        }
        const totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (totalAmount <= 0) {
            throw new Error('Total amount must be greater than zero');
        }
    }
}

export class OrderResponseDto {
    id: string;
    customerId: string;
    items: OrderItemResponseDto[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    totalAmount: number;

    constructor(order: Order) {
        this.id = order.id;
        this.customerId = order.customerId;
        this.items = order.items.map(item => new OrderItemResponseDto(item));
        this.status = order.status;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.totalAmount = order.totalAmount;
    }
}

class OrderItemResponseDto {
    productId: string;
    productName: string;
    price: number;
    quantity: number;

    constructor(item: OrderItem) {
        this.productId = item.productId;
        this.productName = item.productName;
        this.price = item.price;
        this.quantity = item.quantity;
    }
}

// Helper class to maintain consistency with domain
class OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;

    constructor(productId: string, productName: string, price: number, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }
}

// === ARCHIVO: api/src/application/dtos/update-order.dto.ts ===
import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderItemDto {
  @IsString()
  productId!: string;

  @IsString()
  productName!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  items?: UpdateOrderItemDto[];

  @IsOptional()
  @IsString()
  status?: string;

  validate(): void {
    if (!this.customerId && !this.items && !this.status) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }
    
    if (this.items && this.items.length === 0) {
      throw new Error('La orden debe tener al menos un ítem');
    }

    if (this.items) {
      for (const item of this.items) {
        if (!item.productId || !item.productName || item.price <= 0 || item.quantity <= 0) {
          throw new Error('Cada ítem debe tener productId, productName, price > 0 y quantity > 0');
        }
      }
    }
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { OrderResponseDto } from '../../application/dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(OrderService)
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden en el sistema y la persiste en DynamoDB' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al crear la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes', description: 'Recupera todas las órdenes almacenadas en DynamoDB' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida exitosamente', type: [OrderResponseDto] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrders(): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.orderService.getOrders();
      return orders.map(order => new OrderResponseDto(order));
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al obtener las órdenes',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Recupera una orden específica usando su identificador único' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getOrderById(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al obtener la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden', description: 'Actualiza los datos de una orden existente en DynamoDB' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateOrderDto>,
  ): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.updateOrder(id, updateData);
      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
      return new OrderResponseDto(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al actualizar la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina una orden existente de DynamoDB' })
  @ApiParam({ name: 'id', description: 'Identificador único de la orden', type: String })
  @ApiResponse({ status: 204, description: 'Orden eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async deleteOrder(@Param('id') id: string): Promise<void> {
    try {
      const deleted = await this.orderService.deleteOrder(id);
      if (!deleted) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al eliminar la orden',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/order.repository.impl.ts ===
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderItem } from '../../domain/entities/order.entity';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository, OnModuleInit {
  private readonly logger = new Logger(OrderRepositoryImpl.name);
  private docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(
    private readonly dynamoDBClient: DynamoDBClient,
  ) {
    this.tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
    this.logger.log(`Inicializando repositorio de órdenes con tabla: ${this.tableName}`);
  }

  onModuleInit(): void {
    this.docClient = DynamoDBDocumentClient.from(this.dynamoDBClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });
    this.logger.debug('DocumentClient de DynamoDB inicializado correctamente');
  }

  private toDbItem(order: Order): Record<string, unknown> {
    return {
      id: order.id,
      customerId: order.customerId,
      status: order.status,
      items: order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: order.totalAmount,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
      updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : order.updatedAt,
    };
  }

  private toOrder(item: Record<string, unknown>): Order | null {
    if (!item) return null;

    const items = Array.isArray(item.items) 
      ? item.items.map((i: Record<string, unknown>) => new OrderItem(
          i.productId as string,
          i.productName as string,
          Number(i.price),
          Number(i.quantity),
        ))
      : [];

    const order = new Order(
      item.id as string,
      item.customerId as string,
      items,
      item.status as OrderStatus,
    );

    if (item.createdAt) {
      order['createdAt'] = new Date(item.createdAt as string);
    }
    if (item.updatedAt) {
      order['updatedAt'] = new Date(item.updatedAt as string);
    }

    return order;
  }

  async create(order: Order): Promise<Order> {
    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: this.toDbItem(order),
        ConditionExpression: 'attribute_not_exists(id)',
      });

      await this.docClient.send(command);
      this.logger.log(`Orden ${order.id} creada exitosamente en DynamoDB`);
      return order;
    } catch (error) {
      this.logger.error(`Error al crear orden ${order.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
      });

      const result = await this.docClient.send(command);
      const items = result.Items || [];
      this.logger.debug(`Recuperadas ${items.length} órdenes de DynamoDB`);
      return items.map(item => this.toOrder(item as Record<string, unknown>)).filter((o): o is Order => o !== null);
    } catch (error) {
      this.logger.error(`Error al recuperar todas las órdenes: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { id },
      });

      const result = await this.docClient.send(command);
      const order = this.toOrder(result.Item as Record<string, unknown>);
      
      if (!order) {
        this.logger.warn(`Orden con ID ${id} no encontrada en DynamoDB`);
      } else {
        this.logger.debug(`Orden ${id} recuperada exitosamente`);
      }
      
      return order;
    } catch (error) {
      this.logger.error(`Error al recuperar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const updateExpressions: string[] = [];
      const expressionAttributeValues: Record<string, unknown> = {};

      if (orderData.customerId !== undefined) {
        updateExpressions.push('customerId = :customerId');
        expressionAttributeValues[':customerId'] = orderData.customerId;
      }

      if (orderData.status !== undefined) {
        updateExpressions.push('#status = :status');
        expressionAttributeValues[':status'] = orderData.status;
      }

      if (orderData.items !== undefined) {
        updateExpressions.push('#items = :items');
        expressionAttributeValues[':items'] = orderData.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        }));
      }

      updateExpressions.push('#updatedAt = :updatedAt');
      expressionAttributeValues[':updatedAt'] = new Date().toISOString();

      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: orderData.status !== undefined ? { '#status': 'status', '#items': 'items', '#updatedAt': 'updatedAt' } : { '#items': 'items', '#updatedAt': 'updatedAt' },
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });

      const result = await this.docClient.send(command);
      const updatedOrder = this.toOrder(result.Attributes as Record<string, unknown>);
      
      if (!updatedOrder) {
        throw new Error('No se pudo recuperar la orden actualizada');
      }

      this.logger.log(`Orden ${id} actualizada exitosamente en DynamoDB`);
      return updatedOrder;
    } catch (error) {
      this.logger.error(`Error al actualizar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      });

      await this.docClient.send(command);
      this.logger.log(`Orden ${id} eliminada exitosamente de DynamoDB`);
    } catch (error) {
      this.logger.error(`Error al eliminar orden ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.config.ts ===
import { Module, Global, Logger } from '@nestjs/common';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { OrderRepositoryImpl } from '../repositories/order.repository.impl';

export interface DynamoDBConfig {
  client: DynamoDBClient;
  tableName: string;
}

export type DynamoDbConfig = DynamoDBConfig;

@Global()
@Module({
  providers: [
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: (): DynamoDBClient => {
        const logger = new Logger('DynamoDBConfig');
        
        const config: DynamoDBClientConfig = {
          region: process.env.AWS_REGION || 'us-east-1',
        };

        const endpoint = process.env.DYNAMODB_ENDPOINT;
        if (endpoint) {
          logger.log(`Conectando a DynamoDB local en endpoint: ${endpoint}`);
          config.endpoint = endpoint;
          config.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
          };
        } else {
          logger.log(`Conectando a DynamoDB en región: ${config.region}`);
          
          if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
            config.credentials = {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            };
            
            if (process.env.AWS_SESSION_TOKEN) {
              config.credentials.sessionToken = process.env.AWS_SESSION_TOKEN;
            }
          }
        }

        const client = new DynamoDBClient(config);
        logger.debug('Cliente de DynamoDB configurado correctamente');
        
        return client;
      },
    },
    {
      provide: 'DYNAMODB_TABLE_NAME',
      useValue: process.env.DYNAMODB_TABLE_NAME || 'orders',
    },
    OrderRepositoryImpl,
  ],
  exports: [
    'DYNAMODB_CLIENT',
    'DYNAMODB_TABLE_NAME',
    OrderRepositoryImpl,
  ],
})
export class DynamoDbConfigModule {}

// === ARCHIVO: api/src/infrastructure/config/aws.config.ts ===
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export interface AwsConfig {
  region: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint?: string;
  maxAttempts?: number;
}

export type AWSConfig = AwsConfig;

export function getAwsConfig(): AwsConfig {
  const config: AwsConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
    maxAttempts: parseInt(process.env.AWS_MAX_ATTEMPTS || '3', 10),
  };

  if (process.env.AWS_ENDPOINT) {
    config.endpoint = process.env.AWS_ENDPOINT;
  }

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  return config;
}

export function toDynamoDBClientConfig(config: AwsConfig): DynamoDBClientConfig {
  const clientConfig: DynamoDBClientConfig = {
    region: config.region,
    maxAttempts: config.maxAttempts,
  };

  if (config.endpoint) {
    clientConfig.endpoint = config.endpoint;
  }

  if (config.credentials) {
    clientConfig.credentials = config.credentials;
  }

  return clientConfig;
}

export function getDynamoDBTableName(): string {
  const tableName = process.env.DYNAMODB_TABLE_NAME;
  if (!tableName) {
    throw new Error('DYNAMODB_TABLE_NAME environment variable is not set');
  }
  return tableName;
}

export function isLocalEnvironment(): boolean {
  return !!process.env.AWS_ENDPOINT || process.env.NODE_ENV === 'development';
}

// === ARCHIVO: api/test/order.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../src/application/services/order.service';
import { OrderRepository } from '../src/domain/repositories/order.repository';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderResponseDto } from '../src/application/dtos/create-order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: OrderRepository;

  const mockOrder: Order = new Order(
    'cust-123',
    [
      { productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 },
    ],
    OrderStatus.PENDING,
  );
  mockOrder.id = 'order-123';

  const mockOrderRepository = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findById: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue({ ...mockOrder, status: OrderStatus.COMPLETED }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente', async () => {
      const createOrderDto = {
        customerId: 'cust-123',
        items: [
          { productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 },
        ],
      };

      const result = await service.createOrder(createOrderDto);

      expect(repository.create).toHaveBeenCalled();
      expect(result).toBeInstanceOf(OrderResponseDto);
      expect(result.customerId).toBe('cust-123');
    });

    it('debería lanzar error si la creación falla', async () => {
      mockOrderRepository.create.mockRejectedValueOnce(new Error('Database error'));

      const createOrderDto = {
        customerId: 'cust-123',
        items: [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
      };

      await expect(service.createOrder(createOrderDto)).rejects.toThrow('Database error');
    });
  });

  describe('getOrders', () => {
    it('debería retornar todas las órdenes', async () => {
      const result = await service.getOrders();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(OrderResponseDto);
    });

    it('debería retornar array vacío si no hay órdenes', async () => {
      mockOrderRepository.findAll.mockResolvedValueOnce([]);

      const result = await service.getOrders();

      expect(result).toHaveLength(0);
    });
  });

  describe('getOrderById', () => {
    it('debería retornar una orden por ID', async () => {
      const result = await service.getOrderById('order-123');

      expect(repository.findById).toHaveBeenCalledWith('order-123');
      expect(result).toBeInstanceOf(OrderResponseDto);
      expect(result.id).toBe('order-123');
    });

    it('debería lanzar NotFoundException si la orden no existe', async () => {
      mockOrderRepository.findById.mockResolvedValueOnce(null);

      await expect(service.getOrderById('non-existent')).rejects.toThrow();
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updateOrderDto = { status: OrderStatus.COMPLETED };

      const result = await service.updateOrder('order-123', updateOrderDto);

      expect(repository.update).toHaveBeenCalledWith('order-123', updateOrderDto);
      expect(result).toBeInstanceOf(OrderResponseDto);
    });

    it('debería lanzar error si la actualización falla', async () => {
      mockOrderRepository.update.mockRejectedValueOnce(new Error('Update failed'));

      await expect(
        service.updateOrder('order-123', { status: OrderStatus.COMPLETED }),
      ).rejects.toThrow('Update failed');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      await service.deleteOrder('order-123');

      expect(repository.delete).toHaveBeenCalledWith('order-123');
    });

    it('debería lanzar error si la eliminación falla', async () => {
      mockOrderRepository.delete.mockRejectedValueOnce(new Error('Delete failed'));

      await expect(service.deleteOrder('order-123')).rejects.toThrow('Delete failed');
    });
  });
});

// === ARCHIVO: api/test/order.controller.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { OrderController } from '../src/infrastructure/controllers/order.controller';
import { OrderService } from '../src/application/services/order.service';
import { Order, OrderStatus } from '../src/domain/entities/order.entity';
import { OrderResponseDto } from '../src/application/dtos/create-order.dto';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let service: OrderService;

  const mockOrder: Order = new Order(
    'cust-123',
    [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
    OrderStatus.PENDING,
  );
  mockOrder.id = 'order-123';

  const mockOrderService = {
    createOrder: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    getOrders: jest.fn().mockResolvedValue([new OrderResponseDto(mockOrder)]),
    getOrderById: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    updateOrder: jest.fn().mockResolvedValue(new OrderResponseDto(mockOrder)),
    deleteOrder: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    service = moduleFixture.get<OrderService>(OrderService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('debería crear una nueva orden', async () => {
      const createOrderDto = {
        customerId: 'cust-123',
        items: [{ productId: 'prod-1', productName: 'Product 1', price: 100, quantity: 2 }],
      };

      const response = await request(app.getHttpServer())
        .post('/orders')
        .send(createOrderDto)
        .expect(201);

      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(response.body).toHaveProperty('id');
      expect(response.body.customerId).toBe('cust-123');
    });

    it('debería retornar 400 si el DTO es inválido', async () => {
      const invalidDto = { customerId: 'cust-123', items: [] };

      await request(app.getHttpServer()).post('/orders').send(invalidDto).expect(400);
    });
  });

  describe('GET /orders', () => {
    it('debería retornar todas las órdenes', async () => {
      const response = await request(app.getHttpServer()).get('/orders').expect(200);

      expect(mockOrderService.getOrders).toHaveBeenCalled();
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('id');
    });

    it('debería retornar array vacío si no hay órdenes', async () => {
      mockOrderService.getOrders.mockResolvedValueOnce([]);

      const response = await request(app.getHttpServer()).get('/orders').expect(200);

      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /orders/:id', () => {
    it('debería retornar una orden por ID', async () => {
      const response = await request(app.getHttpServer()).get('/orders/order-123').expect(200);

      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('order-123');
      expect(response.body).toHaveProperty('id', 'order-123');
    });

    it('debería retornar 404 si la orden no existe', async () => {
      mockOrderService.getOrderById.mockRejectedValueOnce(new Error('Order not found'));

      await request(app.getHttpServer()).get('/orders/non-existent').expect(404);
    });
  });

  describe('PUT /orders/:id', () => {
    it('debería actualizar una orden', async () => {
      const updateOrderDto = { status: OrderStatus.COMPLETED };

      const response = await request(app.getHttpServer())
        .put('/orders/order-123')
        .send(updateOrderDto)
        .expect(200);

      expect(mockOrderService.updateOrder).toHaveBeenCalledWith('order-123', updateOrderDto);
      expect(response.body).toHaveProperty('id');
    });

    it('debería retornar 400 si el DTO es inválido', async () => {
      const invalidDto = { status: 'INVALID_STATUS' };

      await request(app.getHttpServer()).put('/orders/order-123').send(invalidDto).expect(400);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('debería eliminar una orden', async () => {
      await request(app.getHttpServer()).delete('/orders/order-123').expect(204);

      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-123');
    });

    it('debería retornar 404 si la orden no existe para eliminar', async () => {
      mockOrderService.deleteOrder.mockRejectedValueOnce(new Error('Order not found'));

      await request(app.getHttpServer()).delete('/orders/non-existent').expect(404);
    });
  });
});

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: api/src/application/services/order.service.ts ===
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderResponseDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Creating order for customer: ${createOrderDto.customerId}`);
    
    createOrderDto.validate();

    const order = new Order(
      createOrderDto.customerId,
      createOrderDto.items.map(
        (item) => new OrderItem(item.productId, item.productName, item.price, item.quantity)
      ),
      createOrderDto.status
    );

    const createdOrder = await this.orderRepository.create(order);
    this.logger.log(`Order created with id: ${createdOrder.id}`);
    
    return new OrderResponseDto(createdOrder);
  }

  async getOrders(): Promise<OrderResponseDto[]> {
    this.logger.log('Fetching all orders');
    
    const orders = await this.orderRepository.findAll();
    this.logger.log(`Found ${orders.length} orders`);
    
    return orders.map((order) => new OrderResponseDto(order));
  }

  async getOrderById(id: string): Promise<OrderResponseDto> {
    this.logger.log(`Fetching order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    const order = await this.orderRepository.findById(id);
    
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return new OrderResponseDto(order);
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto> {
    this.logger.log(`Updating order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    updateOrderDto.validate();

    const existingOrder = await this.orderRepository.findById(id);
    
    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const updateData: Partial<Order> = {};
    
    if (updateOrderDto.customerId) {
      updateData.customerId = updateOrderDto.customerId;
    }
    
    if (updateOrderDto.items) {
      updateData.items = updateOrderDto.items.map(
        (item) => new OrderItem(item.productId, item.productName, item.price, item.quantity)
      );
    }
    
    if (updateOrderDto.status) {
      updateData.status = updateOrderDto.status as any;
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    this.logger.log(`Order ${id} updated successfully`);
    
    return new OrderResponseDto(updatedOrder);
  }

  async deleteOrder(id: string): Promise<void> {
    this.logger.log(`Deleting order with id: ${id}`);
    
    if (!id) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    const existingOrder = await this.orderRepository.findById(id);
    
    if (!existingOrder) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.orderRepository.delete(id);
    this.logger.log(`Order ${id} deleted successfully`);
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.59.0",
    "axios": "1.6.7",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-router-dom": "6.22.3",
    "zustand": "4.4.7",
    "@tanstack/react-query-devtools": "5.17.19",
    "react-error-boundary": "^4.1.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.4.2",
    "@testing-library/react": "14.2.1",
    "@types/react": "18.2.66",
    "@types/react-dom": "18.2.22",
    "@vitejs/plugin-react": "4.2.1",
    "eslint": "8.57.0",
    "eslint-plugin-react": "7.34.1",
    "eslint-plugin-react-hooks": "4.6.0",
    "eslint-plugin-react-refresh": "0.4.6",
    "jest": "29.7.0",
    "prettier": "3.2.5",
    "typescript": "5.7.2",
    "vite": "5.2.0",
    "vitest": "1.2.2"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  "prettier": {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 80
  },
  "overrides": {
    "react": "19.0.0",
    "react-dom": "19.0.0"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_variables.scss";'
      }
    }
  }
})

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "types": [
      "vite/client",
      "@testing-library/jest-dom"
    ]
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

// === ARCHIVO: client/src/App.tsx ===
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMessage from '@/shared/components/ErrorMessage'

const OrderList = lazy(() => import('@/features/orders/OrderList'))

const LoadingSpinner = () => (
  <div className="loading-spinner" role="status" aria-label="Cargando">
    <div className="spinner" />
    <span className="sr-only">Cargando...</span>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorMessage}
      onError={(error) => {
        console.error('Error boundary caught:', error)
      }}
    >
      <div className='app-container'>
        <header className='app-header'>
          <h1>Gestión de Órdenes</h1>
        </header>
        <main className='app-main'>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<OrderList />} />
              <Route path='/orders' element={<OrderList />} />
              <Route path='*' element={<ErrorMessage message='Ruta no encontrada' />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de órdenes con persistencia en DynamoDB" />
    <meta name="theme-color" content="#2563eb" />
    <meta name="color-scheme" content="light dark" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Gestión de Órdenes</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f9fafb;
        color: #111827;
        line-height: 1.5;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #111827;
          color: #f9fafb;
        }
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .loading-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        flex-direction: column;
        gap: 1rem;
      }
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #e5e7eb;
        border-top-color: #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .loading-text {
        color: #6b7280;
        font-size: 0.875rem;
      }
      @media (prefers-color-scheme: dark) {
        .loading-text {
          color: #9ca3af;
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-screen">
        <div class="loading-spinner" role="status" aria-label="Cargando aplicación"></div>
        <span class="loading-text">Cargando aplicación...</span>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
    <noscript>
      <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
        <h1>JavaScript requerido</h1>
        <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
      </div>
    </noscript>
  </body>
</html>

// === ARCHIVO: client/src/features/orders/OrderList.tsx ===
import { useEffect, useState } from 'react';
import { useOrders } from './hooks/useOrders';
import { OrderItem } from './components/OrderItem';
import { OrderForm } from './components/OrderForm';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { Order } from './types/order.types';
import './styles/OrderList.scss';

export function OrderList() {
  const { orders, loading, error, fetchOrders, createOrder, updateOrder, deleteOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (orderData: Partial<Order>) => {
    try {
      await createOrder(orderData);
      setShowForm(false);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const handleUpdateOrder = async (id: string, orderData: Partial<Order>) => {
    try {
      await updateOrder(id, orderData);
      setEditingOrder(null);
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const filteredOrders = orders
    .filter(order => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id?.toLowerCase().includes(searchLower) ||
        order.customerName?.toLowerCase().includes(searchLower) ||
        order.status?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: keyof Order) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  if (loading && orders.length === 0) {
    return (
      <div className="order-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            + Nueva Orden
          </button>
        </div>
      </header>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Buscar por ID, cliente o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchOrders} />}

      {showForm && (
        <OrderForm
          order={editingOrder}
          onSubmit={editingOrder 
            ? (data) => handleUpdateOrder(editingOrder.id!, data)
            : handleCreateOrder
          }
          onCancel={handleCancelForm}
        />
      )}

      <div className="orders-table">
        <div className="table-header">
          <div className="th sortable" onClick={() => handleSort('id')}>
            ID{getSortIndicator('id')}
          </div>
          <div className="th sortable" onClick={() => handleSort('customerName')}>
            Cliente{getSortIndicator('customerName')}
          </div>
          <div className="th sortable" onClick={() => handleSort('totalAmount')}>
            Total{getSortIndicator('totalAmount')}
          </div>
          <div className="th sortable" onClick={() => handleSort('status')}>
            Estado{getSortIndicator('status')}
          </div>
          <div className="th sortable" onClick={() => handleSort('createdAt')}>
            Fecha{getSortIndicator('createdAt')}
          </div>
          <div className="th">Acciones</div>
        </div>

        <div className="table-body">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron órdenes</p>
              {searchTerm && (
                <button className="btn-secondary" onClick={() => setSearchTerm('')}>
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            filteredOrders.map(order => (
              <OrderItem
                key={order.id}
                order={order}
                onEdit={handleEdit}
                onDelete={handleDeleteOrder}
              />
            ))
          )}
        </div>
      </div>

      <div className="order-list-footer">
        <span className="order-count">
          {filteredOrders.length} de {orders.length} órdenes
        </span>
        {loading && <span className="loading-indicator">Actualizando...</span>}
      </div>
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/components/OrderItem.tsx ===
import { Order } from '../types/order.types';
import { useState } from 'react';
import ConfirmationModal from '@/shared/components/ConfirmationModal';
import '../styles/OrderItem.scss';

interface OrderItemProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export function OrderItem({ order, onEdit, onDelete }: OrderItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status?: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'status-pending',
      'processing': 'status-processing',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status?.toLowerCase() || ''] || 'status-default';
  };

  const getStatusLabel = (status?: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'processing': 'Procesando',
      'completed': 'Completado',
      'cancelled': 'Cancelado'
    };
    return labels[status?.toLowerCase() || ''] || status || 'Desconocido';
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(order.id!);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const canEdit = order.status !== 'completed' && order.status !== 'cancelled';
  const canDelete = order.status !== 'processing';

  return (
    <>
      <div className={`order-item ${getStatusClass(order.status)}`}>
        <div className="order-cell order-id">
          <span className="cell-label">ID</span>
          <span className="cell-value order-id-value">{order.id}</span>
        </div>

        <div className="order-cell order-customer">
          <span className="cell-label">Cliente</span>
          <span className="cell-value">{order.customerName}</span>
          {order.customerEmail && (
            <span className="cell-secondary">{order.customerEmail}</span>
          )}
        </div>

        <div className="order-cell order-total">
          <span className="cell-label">Total</span>
          <span className="cell-value cell-amount">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>

        <div className="order-cell order-status">
          <span className="cell-label">Estado</span>
          <span className={`status-badge ${getStatusClass(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="order-cell order-date">
          <span className="cell-label">Fecha</span>
          <span className="cell-value">{formatDate(order.createdAt)}</span>
        </div>

        <div className="order-cell order-actions">
          <span className="cell-label">Acciones</span>
          <div className="action-buttons">
            <button
              className="btn-icon btn-edit"
              onClick={() => onEdit(order)}
              disabled={!canEdit}
              title={canEdit ? 'Editar orden' : 'No editable'}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={handleDeleteClick}
              disabled={!canDelete || isDeleting}
              title={canDelete ? 'Eliminar orden' : 'No eliminable'}
            >
              {isDeleting ? (
                <span className="spinner-small"></span>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmationModal
          title="Confirmar eliminación"
          message={`¿Estás seguro de que deseas eliminar la orden #${order.id}? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          variant="danger"
        />
      )}
    </>
  );
}

// === ARCHIVO: client/src/features/orders/components/OrderForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order.types';
import ErrorMessage from '@/shared/components/ErrorMessage';
import '../styles/OrderForm.scss';

interface OrderFormProps {
  order?: Order | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  onCancel: () => void;
}

export function OrderForm({ order, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrderDto>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || '',
        customerEmail: order.customerEmail || '',
        customerPhone: order.customerPhone || '',
        items: order.items || [],
        notes: order.notes || '',
        status: order.status
      });
    }
  }, [order]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName?.trim()) {
      errors.customerName = 'El nombre del cliente es obligatorio';
    } else if (formData.customerName.length < 2) {
      errors.customerName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.customerEmail = 'El correo electrónico no es válido';
    }

    if (formData.customerPhone && !/^[+]?[0-9\s-]{9,15}$/.test(formData.customerPhone)) {
      errors.customerPhone = 'El teléfono no es válido';
    }

    if (!formData.items || formData.items.length === 0) {
      errors.items = 'Debe añadir al menos un artículo';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof CreateOrderDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    if (newItemQuantity <= 0) {
      setValidationErrors(prev => ({ ...prev, itemQuantity: 'La cantidad debe ser mayor a 0' }));
      return;
    }
    if (newItemPrice < 0) {
      setValidationErrors(prev => ({ ...prev, itemPrice: 'El precio no puede ser negativo' }));
      return;
    }

    const newItem = {
      name: newItemName.trim(),
      quantity: newItemQuantity,
      price: newItemPrice
    };

    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));

    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemPrice(0);

    if (validationErrors.items) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.items;
        return newErrors;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index) || []
    }));
  };

  const calculateTotal = (): number => {
    if (!formData.items) return 0;
    return formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
      setValidationErrors(prev => ({ 
        ...prev, 
        submit: 'Error al guardar la orden. Inténtalo de nuevo.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <div className="form-header">
          <h2>{order ? 'Editar Orden' : 'Nueva Orden'}</h2>
          <button className="btn-close" onClick={onCancel} aria-label="Cerrar formulario">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Información del Cliente</h3>
            
            <div className="form-group">
              <label htmlFor="customerName">Nombre del cliente *</label>
              <input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className={validationErrors.customerName ? 'input-error' : ''}
                placeholder="Nombre completo"
                disabled={isSubmitting}
              />
              {validationErrors.customerName && (
                <span className="error-text">{validationErrors.customerName}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Correo electrónico</label>
                <input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  className={validationErrors.customerEmail ? 'input-error' : ''}
                  placeholder="correo@ejemplo.com"
                  disabled={isSubmitting}
                />
                {validationErrors.customerEmail && (
                  <span className="error-text">{validationErrors.customerEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Teléfono</label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  className={validationErrors.customerPhone ? 'input-error' : ''}
                  placeholder="+34 600 000 000"
                  disabled={isSubmitting}
                />
                {validationErrors.customerPhone && (
                  <span className="error-text">{validationErrors.customerPhone}</span>
                )}
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Artículos</h3>
            
            <div className="add-item-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="itemName">Artículo</label>
                  <input
                    id="itemName"
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Nombre del artículo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemQuantity">Cantidad</label>
                  <input
                    id="itemQuantity"
                    type="number"
                    min="1"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                    className={validationErrors.itemQuantity ? 'input-error' : ''}
                  />
                  {validationErrors.itemQuantity && (
                    <span className="error-text">{validationErrors.itemQuantity}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="itemPrice">Precio (€)</label>
                  <input
                    id="itemPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
                    className={validationErrors.itemPrice ? 'input-error' : ''}
                  />
                  {validationErrors.itemPrice && (
                    <span className="error-text">{validationErrors.itemPrice}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-add-item"
                  onClick={handleAddItem}
                >
                  +
                </button>
              </div>
            </div>

            {formData.items && formData.items.length > 0 && (
              <div className="items-list">
                <div className="items-table-header">
                  <span>Artículo</span>
                  <span>Cantidad</span>
                  <span>Precio</span>
                  <span>Subtotal</span>
                  <span></span>
                </div>
                {formData.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>{item.price.toFixed(2)} €</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => handleRemoveItem(index)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="items-total">
                  <span>Total:</span>
                  <span className="total-amount">{calculateTotal().toFixed(2)} €</span>
                </div>
              </div>
            )}

            {validationErrors.items && (
              <ErrorMessage message={validationErrors.items} />
            )}
          </section>

          <section className="form-section">
            <h3>Notas</h3>
            <div className="form-group">
              <label htmlFor="notes">Notas adicionales</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Instrucciones especiales, observaciones..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </section>

          {validationErrors.submit && (
            <ErrorMessage message={validationErrors.submit} />
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-small"></span>
                  Guardando...
                </>
              ) : (
                order ? 'Actualizar Orden' : 'Crear Orden'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/types/order.types.ts ===
export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export interface UpdateOrderDto {
  customerName?: string;
  customerEmail?: string;
  items?: OrderItem[];
  totalAmount?: number;
  status?: OrderStatus;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderApiResponse<T> {
  data: T;
  message?: string;
}

export interface OrderErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string>;
}

// === ARCHIVO: client/src/features/orders/services/orderApi.ts ===
import axios, { AxiosInstance, AxiosError } from 'axios';
import type { Order, CreateOrderDto, UpdateOrderDto, OrderApiResponse, OrderErrorResponse } from '../types/order.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class OrderApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<OrderErrorResponse>) => {
        if (error.response) {
          const errorData = error.response.data;
          const message = errorData?.message || 'Error en la solicitud';
          console.error(`[OrderApi] Error ${error.response.status}: ${message}`);
          return Promise.reject(new Error(message));
        } else if (error.request) {
          console.error('[OrderApi] Sin respuesta del servidor');
          return Promise.reject(new Error('No se pudo conectar al servidor'));
        } else {
          console.error('[OrderApi] Error de configuración:', error.message);
          return Promise.reject(error);
        }
      }
    );
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await this.client.post<OrderApiResponse<Order>>('/orders', orderData);
    return response.data.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.client.get<OrderApiResponse<Order[]>>('/orders');
    return response.data.data;
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await this.client.get<OrderApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  }

  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order> {
    const response = await this.client.put<OrderApiResponse<Order>>(`/orders/${id}`, orderData);
    return response.data.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.client.delete(`/orders/${id}`);
  }
}

export const orderApi = new OrderApiService();
export default orderApi;

// === ARCHIVO: client/src/features/orders/hooks/useOrders.ts ===
import { useState, useCallback, useEffect } from 'react';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/order.types';
import { orderApi } from '../services/orderApi';

export interface UseOrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseOrdersActions {
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  createOrder: (orderData: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, orderData: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  selectOrder: (order: Order | null) => void;
  clearError: () => void;
  clearSelectedOrder: () => void;
}

export type UseOrdersReturn = UseOrdersState & UseOrdersActions;

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSelectedOrder = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const selectOrder = useCallback((order: Order | null) => {
    setSelectedOrder(order);
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedOrders = await orderApi.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar las órdenes';
      setError(message);
      console.error('[useOrders] Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await orderApi.getOrderById(id);
      setSelectedOrder(order);
      return order;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar la orden';
      setError(message);
      console.error('[useOrders] Error fetching order by id:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData: CreateOrderDto): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newOrder = await orderApi.createOrder(orderData);
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(message);
      console.error('[useOrders] Error creating order:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (id: string, orderData: UpdateOrderDto): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderApi.updateOrder(id, orderData);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      if (selectedOrder?.id === id) {
        setSelectedOrder(updatedOrder);
      }
      return updatedOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la orden';
      setError(message);
      console.error('[useOrders] Error updating order:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrder]);

  const deleteOrder = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await orderApi.deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(message);
      console.error('[useOrders] Error deleting order:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrder]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    selectedOrder,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    selectOrder,
    clearError,
    clearSelectedOrder,
  };
}

export default useOrders;

// === ARCHIVO: client/src/shared/components/ErrorMessage.tsx ===
import React, { useEffect, useState } from 'react';

type ErrorType = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  message: string;
  type?: ErrorType;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const typeStyles: Record<ErrorType, { bg: string; border: string; icon: string }> = {
  error: {
    bg: '#fee2e2',
    border: '#ef4444',
    icon: '✕'
  },
  warning: {
    bg: '#fef3c7',
    border: '#f59e0b',
    icon: '⚠'
  },
  info: {
    bg: '#dbeafe',
    border: '#3b82f6',
    icon: 'ℹ'
  }
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const style = typeStyles[type];

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
    if (e.key === 'Escape' && onClose) {
      handleClose();
    }
  };

  if (!isVisible && !isLeaving) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: isLeaving ? 'translateX(120%)' : 'translateX(0)',
        opacity: isLeaving ? 0 : 1,
        transition: 'all 0.3s ease-in-out',
        maxWidth: '480px',
        margin: '8px 0'
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: style.border,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold',
          flexShrink: 0
        }}
        aria-hidden="true"
      >
        {style.icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            color: '#1f2937',
            fontSize: '14px',
            lineHeight: '1.5',
            wordBreak: 'break-word'
          }}
        >
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          aria-label="Cerrar mensaje"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            padding: 0,
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
export type { ErrorMessageProps, ErrorType };

// === ARCHIVO: client/src/shared/components/ConfirmationModal.tsx ===
import React, { useEffect, useRef, useCallback } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonVariant?: 'primary' | 'danger' | 'success';
  showCancel?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  confirmButtonVariant = 'primary',
  showCancel = true,
  isLoading = false,
  ariaLabel
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const buttonVariants = {
    primary: {
      backgroundColor: '#3b82f6',
      hoverBackgroundColor: '#2563eb',
      text: '#ffffff'
    },
    danger: {
      backgroundColor: '#ef4444',
      hoverBackgroundColor: '#dc2626',
      text: '#ffffff'
    },
    success: {
      backgroundColor: '#22c55e',
      hoverBackgroundColor: '#16a34a',
      text: '#ffffff'
    }
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen && !isLoading) {
      onCancel();
    }
  }, [isOpen, isLoading, onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onCancel();
    }
  };

  const handleConfirmClick = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleCancelClick = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  const variant = buttonVariants[confirmButtonVariant];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-label={ariaLabel || title}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          maxWidth: '420px',
          width: '90%',
          padding: '24px',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h2
            id="modal-title"
            style={{
              margin: '0 0 8px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827'
            }}
          >
            {title}
          </h2>
          <p
            id="modal-description"
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6'
            }}
          >
            {message}
          </p>
        </div>
        
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}
        >
          {showCancel && (
            <button
              onClick={handleCancelClick}
              onKeyDown={(e) => handleButtonKeyDown(e, handleCancelClick)}
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            ref={confirmButtonRef}
            onClick={handleConfirmClick}
            onKeyDown={(e) => handleButtonKeyDown(e, handleConfirmClick)}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: variant.backgroundColor,
              color: variant.text,
              fontSize: '14px',
              fontWeight: 500,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isLoading && (
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
            )}
            {confirmText}
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
export type { ConfirmationModalProps };

// === ARCHIVO: client/src/shared/hooks/useNotification.ts ===
import { useState, useCallback, useRef, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
  createdAt: number;
}

interface UseNotificationReturn {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

const generateId = (): string => {
  return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const defaultDurations: Record<NotificationType, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000
};

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const existing = prev.find((n) => n.id === id);
      if (existing) {
        const timer = timersRef.current.get(id);
        if (timer) {
          clearTimeout(timer);
          timersRef.current.delete(id);
        }
      }
      return prev.filter((n) => n.id !== id);
    });
  }, []);

  const addNotification = useCallback((
    message: string,
    type: NotificationType = 'info',
    duration?: number
  ): string => {
    const id = generateId();
    const finalDuration = duration ?? defaultDurations[type];
    
    const notification: Notification = {
      id,
      message,
      type,
      duration: finalDuration,
      createdAt: Date.now()
    };

    setNotifications((prev) => [...prev, notification]);

    if (finalDuration > 0) {
      const timer = setTimeout(() => {
        removeNotification(id);
      }, finalDuration);
      timersRef.current.set(id, timer);
    }

    return id;
  }, [removeNotification]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setNotifications([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'error', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};

export default useNotification;

// === ARCHIVO: client/src/styles/global.scss ===
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-secondary: #64748b;
  --color-secondary-hover: #475569;
  --color-success: #16a34a;
  --color-success-light: #dcfce7;
  --color-warning: #ca8a04;
  --color-warning-light: #fef9c3;
  --color-danger: #dc2626;
  --color-danger-light: #fee2e2;
  --color-info: #0891b2;
  --color-info-light: #cffafe;
  
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;
  
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  --color-text-inverse: #ffffff;
  
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;
  --border-radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  --z-dropdown: 100;
  --z-modal: 200;
  --z-tooltip: 300;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
  min-height: 100vh;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

h1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}

h2 {
  font-size: var(--font-size-2xl);
}

h3 {
  font-size: var(--font-size-xl);
}

h4 {
  font-size: var(--font-size-lg);
}

p {
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-primary-hover);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }
}

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

ul,
ol {
  list-style: none;
}

table {
  border-collapse: collapse;
  width: 100%;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.card {
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  
  &-primary {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    
    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
  }
  
  &-secondary {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    
    &:hover:not(:disabled) {
      background: var(--color-border);
    }
  }
  
  &-danger {
    background: var(--color-danger);
    color: var(--color-text-inverse);
    
    &:hover:not(:disabled) {
      background: #b91c1c;
    }
  }
  
  &-success {
    background: var(--color-success);
    color: var(--color-text-inverse);
    
    &:hover:not(:disabled) {
      background: #15803d;
    }
  }
  
  &-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
  
  &-lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
  }
}

.form-group {
  margin-bottom: var(--spacing-md);
  
  label {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-secondary);
  }
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  &:hover {
    border-color: var(--color-border-hover);
  }
  
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
  
  &::placeholder {
    color: var(--color-text-muted);
  }
  
  &:disabled {
    background: var(--color-bg-tertiary);
    cursor: not-allowed;
  }
}

.text-error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

.text-success {
  color: var(--color-success);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

.text-muted {
  color: var(--color-text-muted);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-full);
  
  &-success {
    background: var(--color-success-light);
    color: var(--color-success);
  }
  
  &-warning {
    background: var(--color-warning-light);
    color: var(--color-warning);
  }
  
  &-danger {
    background: var(--color-danger-light);
    color: var(--color-danger);
  }
  
  &-info {
    background: var(--color-info-light);
    color: var(--color-info);
  }
}

.flex {
  display: flex;
  
  &-col {
    flex-direction: column;
  }
  
  &-wrap {
    flex-wrap: wrap;
  }
  
  &-center {
    align-items: center;
    justify-content: center;
  }
  
  &-between {
    justify-content: space-between;
  }
  
  &-start {
    align-items: flex-start;
  }
  
  &-end {
    align-items: flex-end;
  }
}

.gap-sm {
  gap: var(--spacing-sm);
}

.gap-md {
  gap: var(--spacing-md);
}

.gap-lg {
  gap: var(--spacing-lg);
}

.mt-sm {
  margin-top: var(--spacing-sm);
}

.mt-md {
  margin-top: var(--spacing-md);
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.mb-sm {
  margin-bottom: var(--spacing-sm);
}

.mb-md {
  margin-bottom: var(--spacing-md);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}

.p-sm {
  padding: var(--spacing-sm);
}

.p-md {
  padding: var(--spacing-md);
}

.p-lg {
  padding: var(--spacing-lg);
}

@media (max-width: 768px) {
  :root {
    font-size: 14px;
  }
  
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  h1 {
    font-size: var(--font-size-2xl);
  }
  
  h2 {
    font-size: var(--font-size-xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn var(--transition-normal) ease-out;
}

.animate-slide-in {
  animation: slideIn var(--transition-normal) ease-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

// === ARCHIVO: client/src/features/orders/styles/OrderList.scss ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/features/orders/styles/OrderItem.scss ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/features/orders/styles/OrderForm.scss ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: infra/providers.tf ===
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.46.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Configuración adicional para manejar perfiles de AWS si se proporcionan
variable "aws_profile" {
  description = "Perfil de AWS CLI a utilizar para la autenticación"
  type        = string
  default     = "default"
}

provider "aws" {
  alias   = "secondary"
  region  = var.secondary_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Validación de variables críticas para evitar errores de despliegue
locals {
  required_vars = {
    aws_region    = var.aws_region != "" ? true : false
    environment   = var.environment != "" ? true : false
    project_name  = var.project_name != "" ? true : false
  }

  validation_errors = [
    for var_name, is_set in local.required_vars : "La variable '${var_name}' es obligatoria y no puede estar vacía."
    if !is_set
  ]

  # Lanzar error si alguna variable crítica no está definida
  error_message = length(local.validation_errors) > 0 ? join("\n", local.validation_errors) : null
}

# Este bloque asegura que las validaciones se ejecuten al planificar/aplicar
resource "null_resource" "validate_variables" {
  triggers = {
    error_message = local.error_message
  }

  provisioner "local-exec" {
    command = "echo '${local.error_message}' && exit 1"
    when    = create
    on_failure = continue
  }
}

// === ARCHIVO: infra/variables.tf ===
variable "aws_region" {
  description = "Región principal de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "secondary_region" {
  description = "Región secundaria de AWS para recursos de respaldo o multi-región"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de: dev, staging, prod."
  }
}

variable "project_name" {
  description = "Nombre del proyecto, utilizado para etiquetar recursos"
  type        = string
  default     = "order-management"
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"

  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla DynamoDB (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla DynamoDB (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB"
  type        = string
  default     = "created_at"
}

variable "dynamodb_gsi" {
  description = "Lista de índices globales secundarios para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    read_capacity   = optional(number)
    write_capacity  = optional(number)
    projection_type = string
    non_key_attributes = optional(list(string))
  }))
  default = [
    {
      name            = "customer_id_index"
      hash_key        = "customer_id"
      range_key       = "order_date"
      projection_type = "INCLUDE"
      non_key_attributes = ["order_status", "total_amount"]
    }
  ]
}

variable "tags" {
  description = "Etiquetas adicionales para los recursos AWS"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla"
  type        = string
  default     = null
}

variable "gsi" {
  description = "Lista de índices globales secundarios"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    read_capacity   = optional(number)
    write_capacity  = optional(number)
    projection_type = string
    non_key_attributes = optional(list(string))
  }))
  default = []
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetado"
  type        = string
}

variable "enable_stream" {
  description = "Habilitar stream en la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null

  validation {
    condition     = var.stream_view_type == null ? true : contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "ttl_attribute" {
  description = "Nombre del atributo para TTL"
  type        = string
  default     = null
}

variable "tags" {
  description = "Etiquetas adicionales para la tabla"
  type        = map(string)
  default     = {}
}

# Validaciones adicionales para asegurar consistencia
locals {
  required_vars = {
    table_name   = var.table_name != "" ? true : false
    billing_mode = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    hash_key     = var.hash_key != "" ? true : false
  }

  validation_errors = [
    for var_name, is_valid in local.required_vars : "La variable '${var_name}' es inválida o no está definida."
    if !is_valid
  ]

  error_message = length(local.validation_errors) > 0 ? join("\n", local.validation_errors) : null
}

// === ARCHIVO: infra/environments/dev/variables.tf ===
variable "aws_region" {
  description = "Región de AWS para el entorno de desarrollo"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "order-management-dev"
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "dev-orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_gsi" {
  description = "Índices globales secundarios para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    non_key_attributes = optional(list(string))
  }))
  default = [
    {
      name            = "customer_id_index"
      hash_key        = "customer_id"
      range_key       = "order_date"
      projection_type = "INCLUDE"
      non_key_attributes = ["order_status", "total_amount"]
    },
    {
      name            = "order_status_index"
      hash_key        = "order_status"
      range_key       = "updated_at"
      projection_type = "KEYS_ONLY"
    }
  ]
}

variable "tags" {
  description = "Etiquetas para recursos en desarrollo"
  type        = map(string)
  default = {
    Environment = "dev"
    ManagedBy   = "Terraform"
    Owner       = "frontend-team"
  }
}

# Configuración específica para desarrollo
locals {
  dev_specific_vars = {
    enable_dynamodb_stream = true
    stream_view_type       = "NEW_AND_OLD_IMAGES"
    ttl_attribute          = "expiration_time"
  }

  # Validación de configuración específica de desarrollo
  is_pay_per_request = var.dynamodb_billing_mode == "PAY_PER_REQUEST"

  # Si el modo es PROVISIONED, asegurar capacidades mínimas
  read_capacity  = local.is_pay_per_request ? 0 : 5
  write_capacity = local.is_pay_per_request ? 0 : 5
}

# Outputs para ser usados en otros módulos o entornos
output "dynamodb_config" {
  description = "Configuración de DynamoDB para el entorno de desarrollo"
  value = {
    table_name      = var.dynamodb_table_name
    billing_mode    = var.dynamodb_billing_mode
    gsi             = var.dynamodb_gsi
    enable_stream   = local.dev_specific_vars.enable_dynamodb_stream
    stream_view_type = local.dev_specific_vars.stream_view_type
    ttl_attribute   = local.dev_specific_vars.ttl_attribute
    tags            = merge(var.tags, { Environment = var.environment })
  }
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.46"
    }
  }

  backend "s3" {
    bucket = "terraform-state-bucket-${var.environment}"
    key    = "infra/terraform.tfstate"
    region = var.aws_region
  }
}

// Configuración del provider AWS con alias para múltiples regiones si es necesario
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.project_name
      CostCenter  = var.cost_center
    }
  }

  skip_credentials_validation = var.skip_credentials_validation
  skip_requesting_account_id  = var.skip_requesting_account_id
  skip_metadata_api_check     = var.skip_metadata_api_check
}

// Provider secundario para region alternativa (replicación)
provider "aws" {
  alias  = "secondary"
  region = var.secondary_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.project_name
      CostCenter  = var.cost_center
    }
  }
}

// === ARCHIVO: infra/main.tf ===
// Configuración principal de infraestructura AWS para el sistema de órdenes
// Este archivo define los recursos core necesarios para la aplicación

// Módulo de DynamoDB para almacenamiento de órdenes
module "orders_dynamodb" {
  source = "../modules/dynamodb"

  environment     = var.environment
  project_name    = var.project_name
  cost_center     = var.cost_center

  table_name      = "${var.project_name}-orders-${var.environment}"
  billing_mode    = var.dynamodb_billing_mode
  read_capacity   = var.dynamodb_read_capacity
  write_capacity  = var.dynamodb_write_capacity
  enable_stream   = var.dynamodb_enable_stream
  stream_view_type = "NEW_AND_OLD_IMAGES"

  // Configuración de atributos de la tabla
  hash_key  = "orderId"
  range_key = "customerId"

  // Índices secundarios globales para diferentes patrones de acceso
  global_secondary_indexes = var.dynamodb_gsi

  // Tags específicos para el recurso
  tags = merge(
    var.common_tags,
    {
      Description = "Tabla de órdenes del sistema de gestión"
      Tier        = "Production"
    }
  )
}

// Bucket de S3 para almacenamiento de artifacts y logs
resource "aws_s3_bucket" "app_storage" {
  bucket = "${var.project_name}-storage-${var.environment}-${data.aws_caller_identity.current.account_id}"

  tags = merge(
    var.common_tags,
    {
      Description = "Bucket de almacenamiento para la aplicación"
      Purpose     = "ApplicationStorage"
    }
  )
}

resource "aws_s3_bucket_versioning" "app_storage_versioning" {
  bucket = aws_s3_bucket.app_storage.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_storage_encryption" {
  bucket = aws_s3_bucket.app_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

// Bucket para logs de la aplicación
resource "aws_s3_bucket" "logs" {
  bucket = "${var.project_name}-logs-${var.environment}-${data.aws_caller_identity.current.account_id}"

  lifecycle_rule {
    enabled = true

    expiration {
      days = var.log_retention_days
    }
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Bucket para logs de la aplicación"
      Purpose     = "Logging"
    }
  )
}

// Grupo de seguridad para la aplicación
resource "aws_security_group" "app_sg" {
  name        = "${var.project_name}-sg-${var.environment}"
  description = "Grupo de seguridad para la aplicación de órdenes"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "SSH from bastion"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.bastion_cidr]
  }

  egress {
    description = "Outbound to internet"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Grupo de seguridad para la aplicación"
    }
  )
}

// Obtención de información de la cuenta actual
data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

// Política IAM para acceso a DynamoDB
resource "aws_iam_policy" "dynamodb_access" {
  name        = "${var.project_name}-dynamodb-access-${var.environment}"
  description = "Política de acceso a DynamoDB para el servicio de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          module.orders_dynamodb.table_arn,
          "${module.orders_dynamodb.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:ListTables"
        ]
        Resource = "*"
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Política de acceso a DynamoDB"
    }
  )
}

// Rol IAM para funciones lambda (si se usa)
resource "aws_iam_role" "app_role" {
  name = "${var.project_name}-app-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Rol IAM para la aplicación"
    }
  )
}

resource "aws_iam_role_policy_attachment" "app_role_dynamodb" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

resource "aws_iam_role_policy_attachment" "app_role_s3" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.s3_access.arn
}

// Política IAM para acceso a S3
resource "aws_iam_policy" "s3_access" {
  name        = "${var.project_name}-s3-access-${var.environment}"
  description = "Política de acceso a S3 para el servicio de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.app_storage.arn,
          "${aws_s3_bucket.app_storage.arn}/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Description = "Política de acceso a S3"
    }
  )
}

// === ARCHIVO: infra/outputs.tf ===
// Definición de salidas de la configuración de infraestructura
// Expose los valores y ARNs necesarios para otros componentes

output "aws_region" {
  description = "Región de AWS configurada"
  value       = data.aws_region.current.name
}

output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla de DynamoDB de órdenes"
  value       = module.orders_dynamodb.table_id
}

output "dynamodb_stream_arn" {
  description = "ARN del stream de DynamoDB (si está habilitado)"
  value       = module.orders_dynamodb.stream_arn
  sensitive   = false
}

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para la tabla de órdenes"
  value       = "https://dynamodb.${data.aws_region.current.name}.amazonaws.com"
}

output "app_storage_bucket_name" {
  description = "Nombre del bucket de S3 para almacenamiento de la app"
  value       = aws_s3_bucket.app_storage.id
}

output "app_storage_bucket_arn" {
  description = "ARN del bucket de S3 para almacenamiento de la app"
  value       = aws_s3_bucket.app_storage.arn
}

output "logs_bucket_name" {
  description = "Nombre del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.id
}

output "logs_bucket_arn" {
  description = "ARN del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.arn
}

output "app_security_group_id" {
  description = "ID del grupo de seguridad de la aplicación"
  value       = aws_security_group.app_sg.id
}

output "app_security_group_arn" {
  description = "ARN del grupo de seguridad de la aplicación"
  value       = aws_security_group.app_sg.arn
}

output "app_role_arn" {
  description = "ARN del rol IAM de la aplicación"
  value       = aws_iam_role.app_role.arn
}

output "app_role_name" {
  description = "Nombre del rol IAM de la aplicación"
  value       = aws_iam_role.app_role.name
}

output "dynamodb_policy_arn" {
  description = "ARN de la política de acceso a DynamoDB"
  value       = aws_iam_policy.dynamodb_access.arn
}

output "s3_policy_arn" {
  description = "ARN de la política de acceso a S3"
  value       = aws_iam_policy.s3_access.arn
}

output "vpc_id" {
  description = "ID de la VPC configurada"
  value       = var.vpc_id
}

output "environment" {
  description = "Entorno de despliegue"
  value       = var.environment
}

output "project_name" {
  description = "Nombre del proyecto"
  value       = var.project_name
}

// === ARCHIVO: infra/README.md ===
# Infraestructura como Código - Sistema de Órdenes

## Descripción General

Este directorio contiene la configuración de infraestructura como código utilizando Terraform para el sistema de gestión de órdenes. La infraestructura se divide en módulos reutilizables y entornos segregados para facilitar el despliegue y mantenimiento.

## Estructura de Directorios

```
infra/
├── environments/
│   └── dev/
│       ├── main.tf
│       ├── terraform.tfvars
│       └── variables.tf
├── modules/
│   └── dynamodb/
│       ├── main.tf
│       ├── outputs.tf
│       └── variables.tf
├── providers.tf
├── variables.tf
├── versions.tf
├── outputs.tf
└── README.md
```

## Módulos Reutilizables

### Módulo DynamoDB

El módulo `dynamodb` proporciona una tabla de DynamoDB configurada para almacenar órdenes con los siguientes atributos:

- **Partición principal**: `orderId` (String) - Identificador único de la orden
- **Atributos adicionales**: `customerId`, `orderDate`, `status`, `totalAmount`, `items`
- **Índices secundarios**: GSI para consultas por cliente y por estado
- **Configuración de capacidad**: On-Demand para desarrollo, Provisioned para producción
- **TTL**: Configurable para limpieza automática de datos antiguos

## Entornos

### Desarrollo (dev)

El entorno de desarrollo utiliza:
- Tabla de DynamoDB en modo On-Demand
- Regiones AWS de desarrollo
- Recursos con etiquetado para identificación
- Variables configurables vía terraform.tfvars

## Proceso de Despliegue

### Prerrequisitos

- AWS CLI configurado con credenciales
- Terraform >= 1.5.x instalado
- Acceso a la cuenta de AWS

### Inicialización

```bash
cd infra/environments/dev
terraform init
```

### Plan de Cambios

```bash
terraform plan -var-file=terraform.tfvars
```

### Aplicar Cambios

```bash
terraform apply -var-file=terraform.tfvars
```

### Destruir Recursos

```bash
terraform destroy -var-file=terraform.tfvars
```

## Variables Principales

| Variable | Descripción | Tipo | Valor por Defecto |
|----------|-------------|------|-------------------|
| aws_region | Región de AWS | string | us-east-1 |
| environment | Nombre del entorno | string | dev |
| table_name | Nombre de la tabla DynamoDB | string | orders |
| billing_mode | Modo de facturación | string | PAY_PER_REQUEST |
| enable_deletion_protection | Habilitar protección contra eliminación | bool | false |

## Outputs

Los outputs disponibles después del despliegue incluyen:

- `table_name`: Nombre de la tabla DynamoDB creada
- `table_arn`: ARN de la tabla para referencias
- `table_id`: ID único de la tabla
- `table_endpoint`: Endpoint de acceso a la tabla

## Convenciones de Versionado

### Control de Versiones

La infraestructura sigue principios de GitOps:
- Cada cambio se versiona en Git
- Los archivos de estado se almacenan en S3
- Los planes de Terraform se revisan antes de aplicar
- Historial de cambios auditable

### Ramas y Entornos

- `main`: Producción
- `develop`: Desarrollo
- Feature branches: Pruebas temporales

## Seguridad

### Mejores Prácticas

- No exponer credenciales en archivos versionados
- Usar AWS Secrets Manager para información sensible
- Habilitar encryption at rest
- Configurar políticas de acceso mínimas necesarias
- Habilitar logging de operaciones

### Variables de Entorno

Las variables sensibles se configuran mediante:
- AWS CLI configuration
- Variables de entorno del sistema
- AWS Systems Manager Parameter Store
- AWS Secrets Manager

## Troubleshotting Common Issues

### Error: Provider Not Configured

Asegurar que el archivo `providers.tf` esté correctamente configurado y que las credenciales de AWS estén disponibles en el entorno.

### Error: State Lock

Si el estado está bloqueado, verificar que no haya otra ejecución de Terraform en progreso. Si persiste, revisar el bucket de estado en S3.

### Error: Variable Not Defined

Verificar que el archivo `terraform.tfvars` contenga todas las variables requeridas definidas en `variables.tf`.

## Referencias

- [Documentación oficial de Terraform](https://www.terraform.io/docs)
- [AWS Provider para Terraform](https://registry.terraform.io/providers/hashicorp/aws)
- [Mejores prácticas de DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables de configuración para el entorno de desarrollo
# Estas variables personalizan la infraestructura para el entorno dev

# Configuración regional y de entorno
aws_region     = "us-east-1"
environment    = "dev"

# Configuración de la tabla DynamoDB
table_name               = "orders-dev"
billing_mode             = "PAY_PER_REQUEST"
read_capacity            = 5
write_capacity           = 5
enable_deletion_protection = false

# Configuración de redundancia y disponibilidad
enable_point_in_time_recovery = false

# Configuración de índices secundarios
gsi_partition_key = "customerId"
gsi_sort_key      = "orderDate"

# Configuración de TTL para limpieza automática
enable_ttl         = true
ttl_attribute_name = "expirationTime"
ttl_days           = 90

# Etiquetado de recursos
tags = {
  Environment = "dev"
  ManagedBy   = "terraform"
  Project     = "orders-management"
  CostCenter  = "engineering"
  Owner       = "platform-team"
}

// === ARCHIVO: infra/environments/dev/main.tf ===
# Configuración específica para el entorno de desarrollo
# Este archivo define los recursos de infraestructura para el entorno dev

# Configuración del provider de AWS
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = "orders-management"
    }
  }

  # Configuración de retries para operaciones que pueden fallar temporalmente
  max_retries = 3
}

# Módulo de DynamoDB para el entorno de desarrollo
# Se reutiliza el módulo definido en modules/dynamodb
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  # Nombre y configuración de la tabla
  table_name        = var.table_name
  billing_mode      = var.billing_mode
  read_capacity     = var.read_capacity
  write_capacity    = var.write_capacity

  # Configuración de protección	enable_deletion_protection = var.enable_deletion_protection
  enable_point_in_time_recovery = var.enable_point_in_time_recovery

  # Configuración de índices
gsi_partition_key = var.gsi_partition_key
  gsi_sort_key      = var.gsi_sort_key

  # Configuración de TTL
  enable_ttl         = var.enable_ttl
  ttl_attribute_name = var.ttl_attribute_name
  ttl_days           = var.ttl_days

  # Etiquetado
  tags = var.tags

  # Dependencias externas (opcional)
  depends_on = []
}

# Recurso adicional: Bucket de S3 para logs de la aplicación
resource "aws_s3_bucket" "app_logs" {
  bucket = "orders-${var.environment}-logs-${data.aws_caller_identity.current.account_id}"

  tags = merge(var.tags, {
    Purpose = "application-logs"
  })
}

# Configuración de lifecycle para el bucket de logs
resource "aws_s3_bucket_lifecycle_configuration" "app_logs_lifecycle" {
  bucket = aws_s3_bucket.app_logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

# Obtener información de la cuenta actual
data "aws_caller_identity" "current" {}

# Output: Nombre de la tabla DynamoDB
output "dynamodb_table_name" {
  description = "Nombre de la tabla de órdenes en DynamoDB"
  value       = module.dynamodb_orders.table_name
}

# Output: ARN de la tabla DynamoDB
output "dynamodb_table_arn" {
  description = "ARN de la tabla de órdenes"
  value       = module.dynamodb_orders.table_arn
}

# Output: Endpoint de la tabla DynamoDB
output "dynamodb_table_endpoint" {
  description = "Endpoint de la tabla para conexión"
  value       = module.dynamodb_orders.table_endpoint
}

# Output: Bucket de logs
output "logs_bucket_name" {
  description = "Nombre del bucket de logs"
  value       = aws_s3_bucket.app_logs.id
}

# Output: Información de la cuenta
output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "account_region" {
  description = "Región de AWS configurada"
  value       = var.aws_region
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.partition_key
  range_key      = var.sort_key
  stream_enabled = var.enable_streams
  stream_view_type = var.enable_streams ? "NEW_AND_OLD_IMAGES" : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = try(global_secondary_index.value.range_key, null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = try(global_secondary_index.value.read_capacity, null)
      write_capacity  = try(global_secondary_index.value.write_capacity, null)
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.local_secondary_indexes
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = "ALL"
    }
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  ttl {
    enabled        = var.enable_ttl
    attribute_name = var.ttl_attribute
  }

  tags = merge(
    var.common_tags,
    map(
      "Name",
      var.table_name,
      "Environment",
      var.environment,
      "ManagedBy",
      "terraform",
      "Project",
      var.project_name
    )
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_replica" "replicas" {
  for_each = var.replica_regions

  provider           = aws.region
  table_name         = aws_dynamodb_table.orders.name
  kms_key_arn        = each.value.kms_key_arn
  region             = each.value.region
  point_in_time_recovery = each.value.point_in_time_recovery
}

resource "aws_iam_policy" "dynamodb_read_policy" {
  count = var.create_read_policy ? 1 : 0

  name        = "${var.table_name}-read-policy"
  description = "Política de lectura para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:BatchGetItem"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-read-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_iam_policy" "dynamodb_write_policy" {
  count = var.create_write_policy ? 1 : 0

  name        = "${var.table_name}-write-policy"
  description = "Política de escritura para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = aws_dynamodb_table.orders.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-write-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_iam_policy" "dynamodb_full_access_policy" {
  count = var.create_full_access_policy ? 1 : 0

  name        = "${var.table_name}-full-access-policy"
  description = "Política de acceso completo para la tabla DynamoDB ${var.table_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:*"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-full-access-policy",
      "Environment",
      var.environment
    )
  )
}

resource "aws_cloudwatch_metric_alarm" "read_capacity_alarm" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-read-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.read_capacity_alarm_threshold
  alarm_description   = "Alarma de capacidad de lectura para ${var.table_name}"
  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }
  alarm_actions = var.alarm_actions
  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-read-capacity-alarm",
      "Environment",
      var.environment
    )
  )
}

resource "aws_cloudwatch_metric_alarm" "write_capacity_alarm" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-write-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Average"
  threshold           = var.write_capacity_alarm_threshold
  alarm_description   = "Alarma de capacidad de escritura para ${var.table_name}"
  dimensions = {
    TableName = aws_dynamodb_table.orders.name
  }
  alarm_actions = var.alarm_actions
  tags = merge(
    var.common_tags,
    map(
      "Name",
      "${var.table_name}-write-capacity-alarm",
      "Environment",
      var.environment
    )
  )
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.id
}

output "table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = try(aws_dynamodb_table.orders.stream_arn, null)
}

output "table_stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB"
  value       = try(aws_dynamodb_table.orders.stream_label, null)
}

output "table_size_bytes" {
  description = "Tamaño de la tabla en bytes"
  value       = aws_dynamodb_table.orders.size_bytes
}

output "table_item_count" {
  description = "Número de elementos en la tabla"
  value       = aws_dynamodb_table.orders.item_count
}

output "table_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, UPDATING)"
  value       = aws_dynamodb_table.orders.status
}

output "read_policy_arn" {
  description = "ARN de la política de lectura (si se creó)"
  value       = try(aws_iam_policy.dynamodb_read_policy[0].arn, null)
}

output "write_policy_arn" {
  description = "ARN de la política de escritura (si se creó)"
  value       = try(aws_iam_policy.dynamodb_write_policy[0].arn, null)
}

output "full_access_policy_arn" {
  description = "ARN de la política de acceso completo (si se creó)"
  value       = try(aws_iam_policy.dynamodb_full_access_policy[0].arn, null)
}

output "replica_tables" {
  description = "Mapa de tablas réplica y sus ARNs"
  value       = { for k, v in aws_dynamodb_table_replica.replicas : k => v.arn }
}

output "read_capacity_alarm_arn" {
  description = "ARN de la alarma de capacidad de lectura"
  value       = try(aws_cloudwatch_metric_alarm.read_capacity_alarm[0].arn, null)
}

output "write_capacity_alarm_arn" {
  description = "ARN de la alarma de capacidad de escritura"
  value       = try(aws_cloudwatch_metric_alarm.write_capacity_alarm[0].arn, null)
}

output "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  value = [
    for gsi in aws_dynamodb_table.orders.global_secondary_index : {
      name = gsi.name
      status = gsi.status
      arn = "${aws_dynamodb_table.orders.arn}/index/${gsi.name}"
    }
  ]
}

output "local_secondary_indexes" {
  description = "Lista de índices secundarios locales"
  value = [
    for lsi in aws_dynamodb_table.orders.local_secondary_index : {
      name = lsi.name
      arn = "${aws_dynamodb_table.orders.arn}/index/${lsi.name}"
    }
  ]
}

output "kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado del lado del servidor"
  value       = var.kms_key_arn
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
