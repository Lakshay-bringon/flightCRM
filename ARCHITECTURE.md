# Flight CRM - Project Structure Documentation

## 🏗️ Architecture Overview

This Flight CRM application follows a **feature-based architecture** with clear separation of concerns. The codebase has been reorganized to improve maintainability, scalability, and developer experience.

## 📁 Project Structure

```
src/
├── 📁 api/              # API layer (axios configuration & endpoints)
├── 📁 assets/           # Static assets (images, icons)
├── 📁 auth/             # Authentication logic & context
├── 📁 components/       # Reusable UI components
│   ├── 📁 common/       # Generic reusable components
│   ├── 📁 feedback/     # User feedback components
│   ├── 📁 layout/       # Layout-specific components
│   ├── 📁 templates/    # Email and other templates
│   └── 📁 ui/           # Base UI primitives
├── 📁 constants/        # Application constants
├── 📁 context/          # React contexts
├── 📁 features/         # 🌟 Feature-based modules
│   ├── 📁 booking/      # Booking management
│   ├── 📁 data/         # Data management
│   ├── 📁 ip/           # IP address management
│   ├── 📁 revenue/      # Revenue tracking & analytics
│   └── 📁 user/         # User management
├── 📁 lib/              # External library configurations
├── 📁 pages/            # Route-level page components
├── 📁 routes/           # Routing configuration
├── 📁 styles/           # Global styles & design system
│   ├── 📁 components/   # Component-specific styles
│   ├── global.css       # Global CSS with Tailwind
│   └── variables.css    # CSS custom properties
└── 📁 utils/            # Utility functions
```

## 🌟 Feature-Based Architecture

Each feature follows a consistent structure:

```
features/[feature-name]/
├── index.js             # Feature exports barrel file
├── [FeatureComponent].jsx  # Main feature components
├── 📁 components/       # Feature-specific components
├── 📁 hooks/           # Feature-specific custom hooks
│   └── use[Feature].js  # Main feature hook
└── 📁 services/        # Feature business logic & API calls
    └── [feature]Service.js
```

### Available Features

#### 🎫 Booking (`features/booking/`)

- **Components**: BookingCard, BookingDetails, FindBookings, ManageBookings
- **Hook**: `useBooking()` - Complete booking management
- **Service**: `bookingService` - CRUD operations, validation, search

#### 📊 Data (`features/data/`)

- **Components**: ManageData, RecordsList
- **Hook**: `useData()` - Currency, card, provider management
- **Service**: `dataService` - Data entity management

#### 🌐 IP Management (`features/ip/`)

- **Components**: IPSetting
- **Hook**: `useIP()` - IP address management & security
- **Service**: `ipService` - Access control, monitoring

#### 💰 Revenue (`features/revenue/`)

- **Components**: AgentRevenue, CompanyRevenue, RevenueDetails
- **Hook**: `useRevenue()` - Revenue tracking & analytics
- **Service**: `revenueService` - Financial calculations, reports

#### 👥 User (`features/user/`)

- **Components**: ManageUsers, UserProfile, ProfilePage
- **Hook**: `useUser()` - User management operations
- **Service**: User CRUD through existing APIs

## 🎨 Styling Architecture

### Design System

- **CSS Variables**: Consistent design tokens in `styles/variables.css`
- **Global Styles**: Base styles and utilities in `styles/global.css`
- **Tailwind CSS**: Utility-first framework integration
- **Component Styles**: Specific styles in `styles/components/`

### Key Features

- 🌙 Dark theme optimized
- 📱 Responsive design
- ♿ Accessibility-focused
- 🎨 Consistent color palette
- 📏 Standardized spacing scale

## 🔧 Custom Hooks

Each feature includes a comprehensive custom hook:

```javascript
// Example: useBooking hook
const {
	// State
	bookings,
	loading,
	error,
	// CRUD Operations
	createBooking,
	updateBooking,
	deleteBooking,
	// Search & Filter
	searchBookings,
	filterBookings,
	// Pagination
	currentPage,
	totalPages,
	setPage,
	// Utilities
	resetBookings,
	refreshBookings,
} = useBooking();
```

## 🏛️ Service Layer

Services handle business logic and API communication:

```javascript
// Example: bookingService
const bookingService = {
  // CRUD
  create, update, delete, getById, getAll,
  // Search & Filter
  search, filter,
  // Validation
  validate, validateCreate, validateUpdate,
  // Utilities
  export, import, generateReport
};
```

## 🚀 Getting Started

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Using Features

```javascript
// Import entire feature
import { useBooking, BookingCard, bookingService } from "@/features/booking";

// Import specific components
import { ManageUsers } from "@/features/user";
import { Revenue } from "@/features/revenue";
```

## 🔐 Authentication & Authorization

- **AuthProvider**: Main authentication context
- **LoginContext**: Enhanced login functionality with roles
- **ProtectedRoute**: Route-level protection
- **RoleProtectedRoute**: Role-based access control

## 📡 API Layer

Organized by feature with consistent patterns:

- `api/auth/` - Authentication endpoints
- `api/booking/` - Booking-related APIs
- `api/user/` - User management APIs
- `api/revenue/` - Revenue tracking APIs

## 🧪 Best Practices

### Component Organization

- ✅ Use feature-based structure
- ✅ Export through index.js barrel files
- ✅ Keep components focused and single-responsibility
- ✅ Use custom hooks for stateful logic

### State Management

- ✅ Local state with useState for component-specific data
- ✅ Custom hooks for feature-specific state
- ✅ Context for global application state
- ✅ React Query for server state (future enhancement)

### Styling

- ✅ Use CSS custom properties for consistency
- ✅ Leverage Tailwind for utility styling
- ✅ Component-specific styles when needed
- ✅ Mobile-first responsive approach

## 🔄 Migration Notes

### What Changed

1. **Business components moved** to respective feature directories
2. **New service layer** with comprehensive CRUD operations
3. **Feature-specific hooks** with full functionality
4. **Consolidated styling** system with design tokens
5. **Enhanced authentication** with LoginContext

### Breaking Changes

- Import paths updated for moved components
- Business components no longer exported from `components/business`
- New hook APIs with different method signatures

## 🚀 Future Enhancements

- [ ] React Query integration for server state
- [ ] Component library documentation (Storybook)
- [ ] Unit tests for hooks and services
- [ ] E2E tests for critical user flows
- [ ] Performance monitoring and optimization
- [ ] Advanced search and filtering capabilities

---

**Note**: This structure promotes scalability, maintainability, and team collaboration while following React and modern frontend best practices.
