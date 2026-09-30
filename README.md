# Barber Shop Appointment System

A full-stack barber shop appointment booking web application built with **Next.js 16**, **MongoDB**, and **Tailwind CSS**. Customers can browse services, book appointments, verify via OTP, and pay online or at the shop. Admins can manage barbers, services, and appointments through a protected dashboard.

---

## Features

### Customer
- Browse available services and barbers
- Book appointments with date, time, and barber selection
- OTP-based email verification before booking confirmation
- Online payment via Stripe or pay at shop
- Protected user profile page (JWT cookie-based auth)
- Appointment confirmation receipt via email

### Admin
- Protected dashboard (JWT auth)
- Manage barbers, services, and categories
- View and update appointment statuses
- Dashboard stats with charts (Recharts)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | MongoDB + Mongoose |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | JWT (jsonwebtoken) + HTTP-only cookies |
| Email | Nodemailer |
| Payments | Stripe |
| AI | Google Gemini API |
| Icons | Lucide React |

---

## Project Structure

```
barber-shop/
├── app/
│   ├── admin/          # Admin login and dashboard
│   ├── api/            # API routes (appointment, barber, service, auth, etc.)
│   ├── book/           # Booking form page
│   ├── checkout/       # Payment page
│   ├── confirm/        # Booking confirmation receipt
│   ├── confirmUser/    # Customer auth verification page
│   ├── profile/        # Protected customer profile page
│   ├── services/       # All services listing
│   ├── gallary/        # Gallery page
│   ├── about/          # About page
│   └── contact/        # Contact page
├── components/         # Reusable UI components
├── models/             # Mongoose models (Customer, Appointment, Barber, Service, etc.)
├── lib/                # DB connection and utilities
├── contexts/           # Theme context (dark/light mode)
├── proxy.js            # Middleware for route protection
└── public/             # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/your-username/barber-shop.git
cd barber-shop
npm install
```

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
MONGODB_URL=<your_mongodb_connection_string>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_app_password>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET/POST | `/api/appointment` | Get all or create appointment |
| GET/PUT/DELETE | `/api/appointment/[id]` | Manage single appointment |
| GET/POST | `/api/barber` | Get all or create barber |
| GET/PUT/DELETE | `/api/barber/[id]` | Manage single barber |
| GET/POST | `/api/service` | Get all or create service |
| GET/PUT/DELETE | `/api/service/[id]` | Manage single service |
| GET/POST | `/api/category` | Manage categories |
| POST | `/api/create-customer` | Upsert customer on booking |
| POST | `/api/customer/login` | Set customer JWT cookie |
| GET | `/api/customer/verify` | Verify customer JWT cookie |
| POST | `/api/send-mail` | Send OTP email |
| POST | `/api/admin/create` | Create admin account |
| POST | `/api/logout` | Clear auth cookie |
| GET | `/api/stats` | Dashboard statistics |

---

## Route Protection

Routes are protected via `proxy.js` (Next.js middleware):

- `/admin/dashboard/*` — requires valid admin `loginToken` cookie → redirects to `/admin/login`
- `/profile` — requires valid customer `customerToken` cookie → redirects to `/confirmUser`

---

## Booking Flow

```
Browse Services → Book Form → Send OTP → Verify OTP
      → Set customerToken cookie → Checkout (Stripe or Cash)
      → Confirm Page (receipt sent to email)
```

---

## Admin Flow

```
/admin/login → JWT issued → /admin/dashboard
  → Manage Barbers / Services / Appointments
```

---

## Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

Make sure to add all environment variables in your Vercel project settings.
