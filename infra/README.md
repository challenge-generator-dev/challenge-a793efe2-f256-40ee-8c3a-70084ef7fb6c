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