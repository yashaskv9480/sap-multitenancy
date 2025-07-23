# SAP Multi-Tenant Application

A multi-tenant SaaS application built for SAP Business Technology Platform (BTP) using Node.js and Express. This application demonstrates how to implement multi-tenancy with proper tenant isolation, subscription management, and routing.

## 🏗️ Architecture

This repository contains three main components:

### 📦 Components

| Component                | Description                                                     | Port |
| ------------------------ | --------------------------------------------------------------- | ---- |
| **App Router**           | Routes requests and handles authentication using SAP App Router | 5000 |
| **Multitenant Backend**  | Main application backend with tenant-aware functionality        | 4000 |
| **Subscription Manager** | Handles tenant onboarding and offboarding operations            | 3000 |

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SAP BTP account with appropriate entitlements
- SAP XSUAA service instance
- SAP SaaS Provisioning service

## 🔗 API Endpoints

### Subscription Manager

- `GET /` - Health check
- `GET /callback/application/v1/dependencies` - Get application dependencies
- `PUT /callback/application/v1/tenants/:tenantID` - Onboard new tenant
- `DELETE /callback/application/v1/tenants/:tenantID` - Offboard tenant

### Multitenant Backend

- `GET /show-tenant` - Display current tenant information
- `GET /` - Application home page

## 🏢 Tenant Management

The application supports automatic tenant provisioning through SAP SaaS Provisioning service:

- **Onboarding**: New tenants are automatically configured with their subdomain
- **Isolation**: Each tenant operates in an isolated environment
- **Routing**: Subdomain-based routing ensures proper tenant separation

## 📁 Project Structure

```
Sap Multitenancy/
├── approuter/              # SAP App Router component
│   ├── index.js            # Router entry point
│   ├── xs-app.json         # Routing configuration
│   └── package.json        # Dependencies
├── multitenant-backend/    # Main application backend
│   ├── server.js           # Express server with XSUAA
│   └── package.json        # Dependencies
└── subscription-manager/   # Tenant lifecycle management
    ├── server.js           # Subscription callbacks
    ├── saas-registry-config.json  # SaaS registry configuration
    └── package.json        # Dependencies
```
