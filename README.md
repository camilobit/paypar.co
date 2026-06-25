# PAYPAR — Proyecto Completo (Backend + Frontend)

Plataforma de gestión de parqueaderos y zonas azules en Colombia.

## Estructura

```
paypar/
├── README.md
├── paypar-backend/      → API REST (Node.js + Express + Prisma + PostgreSQL)
└── paypar-frontend/     → App web (React + Vite + Tailwind)
```

## Qué incluye esta versión

- Backend completo: 8 módulos (auth, users, vehicles, parkings, tickets, payments, zones, audit) con arquitectura Controller-Service, JWT, RBAC por roles, Swagger.
- **Login con Google OAuth** funcionando de extremo a extremo (backend ya lo tenía; ahora el frontend también).
- **Integración real con Wompi**: el backend genera la firma de integridad y los datos de checkout; el frontend abre el widget oficial de Wompi y procesa el pago; hay un endpoint de webhook para que Wompi confirme el resultado de forma asíncrona.
- **Dashboard completo**: Resumen, Tickets, Pagos, Zonas Azules, Usuarios y Auditoría — todas las páginas que el Sidebar enlaza ya existen y están conectadas a la API.

---

## 1. Backend — Instalación local

```bash
cd paypar-backend
npm install
cp .env.example .env
```

Edita `.env`:
- `DATABASE_URL`: tu conexión de Supabase (o PostgreSQL local).
- `JWT_SECRET`: cualquier string aleatorio largo.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: los obtienes gratis en [console.cloud.google.com](https://console.cloud.google.com) → APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth (tipo "Aplicación web"). Agrega `http://localhost:5173` como origen autorizado.
- `WOMPI_PUBLIC_KEY` / `WOMPI_PRIVATE_KEY` / `WOMPI_EVENTS_SECRET`: los obtienes gratis creando una cuenta sandbox en [comercios.wompi.co](https://comercios.wompi.co).

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

- API: `http://localhost:4000`
- Swagger: `http://localhost:4000/api/docs`
- Health check: `http://localhost:4000/health`

**Admin inicial (creado por el seed):**
```
Email:    admin@paypar.co
Password: Admin2026**
```

---

## 2. Frontend — Instalación local

```bash
cd paypar-frontend
npm install
cp .env.example .env
```

Edita `.env`:
```
VITE_API_URL=http://localhost:4000/api/v1
VITE_GOOGLE_CLIENT_ID=el_mismo_client_id_que_pusiste_en_el_backend
```

```bash
npm run dev
```

Frontend en `http://localhost:5173`.

---

## 3. Cómo funciona el pago con Wompi (flujo real)

1. El conductor busca su placa en `/parking` y ve el monto a pagar.
2. Al elegir "Pagar con tarjeta", el frontend llama a `POST /payments` con `method: CARD`.
3. El backend cierra el ticket, crea el registro de pago en estado `PENDING`, y calcula la firma de integridad que Wompi exige — todo esto queda en la respuesta dentro de `data.checkout`.
4. El frontend toma `data.checkout` y abre el widget oficial de Wompi (`https://checkout.wompi.co/widget.js`) con esos datos.
5. El usuario paga dentro del widget de Wompi (sandbox: usa tarjetas de prueba de la [documentación de Wompi](https://docs.wompi.co/docs/colombia/probando-wompi/)).
6. Wompi notifica el resultado a `POST /payments/webhook/wompi` (debes registrar esta URL en tu panel de Wompi → Eventos → en producción sería `https://api.paypar.co/api/v1/payments/webhook/wompi`).
7. El frontend, en `/payment-result`, consulta `GET /payments/:id/sync` como respaldo si el webhook tarda en llegar.

**Importante para producción:** el webhook necesita una URL pública (no funciona con `localhost`). Para probarlo en desarrollo puedes usar [ngrok](https://ngrok.com) y registrar esa URL temporal en el panel de Wompi.

---

## 4. Cómo funciona el login con Google

1. En Google Cloud Console creas un "ID de cliente de OAuth" tipo aplicación web.
2. Agregas `http://localhost:5173` (desarrollo) y `https://paypar.co` (producción) como orígenes autorizados.
3. Copias el Client ID a `GOOGLE_CLIENT_ID` en el backend y `VITE_GOOGLE_CLIENT_ID` en el frontend (es el mismo valor en ambos).
4. El botón "Continuar con Google" aparece automáticamente en `/auth` — usa Google Identity Services, sin librerías adicionales.
5. El backend verifica el token con `google-auth-library` y crea o vincula el usuario automáticamente.

Si no configuras estas variables, el botón muestra un aviso indicando que falta configuración, pero el resto de la app sigue funcionando con login por correo/contraseña.

---

## 5. Páginas del Dashboard

| Ruta | Rol requerido | Contenido |
|---|---|---|
| `/dashboard` | OPERATOR, ADMIN | Resumen del día: ocupación, recaudo, vehículos activos |
| `/dashboard/tickets` | OPERATOR, ADMIN | Listado de tickets con filtro por estado, cerrar ticket manualmente |
| `/dashboard/payments` | OPERATOR, ADMIN | Historial de pagos completados y total recaudado |
| `/dashboard/zones` | ADMIN | Listado de zonas azules registradas |
| `/dashboard/users` | ADMIN | Listado de usuarios, crear operadores, activar/desactivar |
| `/dashboard/audit` | ADMIN | Log de auditoría de acciones críticas |

---

## 6. Probar el flujo completo end-to-end

1. Levanta backend y frontend en local.
2. Inicia sesión con el admin del seed en `http://localhost:5173/auth`.
3. Crea una ciudad y un parqueadero desde Swagger (`POST /parkings`, requiere el token del admin — cópialo del login y pégalo en el botón "Authorize" de Swagger).
4. Crea un ticket de prueba: `POST /tickets` con una placa válida (formato `ABC123`) y el `parkingId` recién creado.
5. En el frontend, en Home o `/parking`, busca esa placa.
6. Paga con "efectivo" para probar el flujo simple, o con "tarjeta" para probar el widget real de Wompi (usa las tarjetas de prueba del sandbox).
7. Ve a `/dashboard/payments` y confirma que el pago aparece registrado.

---

## 7. Despliegue en producción

### Base de datos — Supabase
1. Crea cuenta en [supabase.com](https://supabase.com)
2. Nuevo proyecto → `paypar-prod`
3. Settings → Database → copia el "Connection String" → úsalo como `DATABASE_URL`

### Backend — Render
1. Sube `paypar-backend` a GitHub
2. [render.com](https://render.com) → New → Web Service → conecta el repo
3. Build Command: `npm install && npm run db:generate && npm run db:migrate`
4. Start Command: `npm start`
5. Agrega todas las variables de tu `.env`, incluyendo las de Google y Wompi
6. Una vez desplegado, copia la URL final y regístrala como webhook en tu panel de Wompi: `https://tu-api.onrender.com/api/v1/payments/webhook/wompi`

### Frontend — Vercel
1. Sube `paypar-frontend` a GitHub
2. [vercel.com](https://vercel.com) → New Project → conecta el repo
3. Framework Preset: Vite
4. Variables de entorno:
   ```
   VITE_API_URL=https://tu-api.onrender.com/api/v1
   VITE_GOOGLE_CLIENT_ID=tu_client_id
   ```
5. Deploy

### Conectar el dominio paypar.co (Cloudflare → Vercel)
En Cloudflare DNS (proxy en gris, no naranja):
```
CNAME   @     cname.vercel-dns.com
CNAME   www   cname.vercel-dns.com
```
En Vercel → Settings → Domains → agrega `paypar.co` y `www.paypar.co`.

### Actualizar orígenes autorizados de Google
No olvides agregar `https://paypar.co` como origen autorizado en Google Cloud Console una vez tengas el dominio en producción — si no, el botón de Google fallará en producción aunque funcione en local.

---

## 8. Variables de entorno — referencia completa

### Backend (`paypar-backend/.env`)
| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión PostgreSQL (Supabase) |
| `JWT_SECRET` | String aleatorio largo (mínimo 64 caracteres) |
| `JWT_EXPIRES_IN` | Duración del token, ej: `7d` |
| `FRONTEND_URL` | URL del frontend, para CORS |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | De console.cloud.google.com |
| `WOMPI_PUBLIC_KEY` | Llave pública de Wompi (la usa también el frontend indirectamente, vía el backend) |
| `WOMPI_PRIVATE_KEY` | Llave privada de Wompi (solo backend) |
| `WOMPI_EVENTS_SECRET` | Secreto de integridad/eventos — firma y valida el webhook |

### Frontend (`paypar-frontend/.env`)
| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend + `/api/v1` |
| `VITE_GOOGLE_CLIENT_ID` | Mismo Client ID que el backend |

---

## 9. Próximos pasos sugeridos

- Formulario de creación de parqueaderos y zonas azules directamente desde el dashboard (hoy se hacen vía Swagger).
- Tests automatizados (Jest + Supertest).
- Selector de parqueadero cuando un operador administre más de uno (`useActiveParking.js` ya está preparado para extenderse).
- Notificaciones por email cuando se confirma un pago.

Cualquier duda sobre cómo continuar, retoma la conversación con tu CTO técnico (Claude) indicando en qué fase del roadmap estás.
