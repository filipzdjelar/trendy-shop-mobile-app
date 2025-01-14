## Trendy Shop Mobile App

### Overview
Trendy Shop is a mobile application built with React Native and Expo. It showcases a list of products retrieved from the Fake Store API. The app allows users to browse products, view additional details in a collapsible panel, and enjoy features like infinite scroll and optional sorting and lazy loading.

### Features
#### Initial Product Display
- Displays the first 5 items fetched from the Fake Store API (/products endpoint).
- Each item displays an image and name, and is clickable for further details.

#### Collapsible Product Details
- Clicking on a product reveals additional information in a collapsible panel.
- A "minus" icon is displayed to hide the additional details.

#### Infinite Scroll Pagination
- Fetches the next set of 5 products as the user scrolls to the bottom of the screen.

#### Bonus Features
- **Sorting**: Sort products by category or price in ascending/descending order.
- **Lazy Loading**: Efficiently load product images to improve performance.

### Installation
#### Clone the Repository
```bash
git clone https://github.com/filipzdjelar/trendy-shop-mobile-app.git
cd trendy-shop-mobile-app
```

#### Install Dependencies

```bash
npm install
```

#### Start the Application

```bash
npm run start
```

# Project Setup and Scripts

## Run on Specific Platforms

- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Launches the app on an Android emulator/device.
- `npm run ios`: Launches the app on an iOS simulator/device.
- `npm run web`: Starts the app in a web browser.
- `npm run reset-project`: Resets the project using a custom script.
- `npm test`: Runs tests with Jest.
- `npm run lint`: Lints the project files.

## Dependencies

### Main Dependencies

- **React Native**: Mobile app development framework.
- **Expo**: Development platform for React Native.
- **TanStack React Query**: Data-fetching and state management.
- **React Native WebView**: Allows rendering web content inside the app.
### Dev Dependencies

- **TypeScript**: Type-safe JavaScript.
- **Jest**: Testing framework.
- **Expo Jest Preset**: Jest configuration for Expo projects.

## API Usage

The app uses the **Fake Store API** to fetch product data.

- **Endpoint**: `https://fakestoreapi.com/products`

### Sample Response:
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "price": 10.99,
    "description": "Product description here.",
    "category": "Category name",
    "image": "https://example.com/product-image.jpg",
    "rating": { "rate": 4.5, "count": 120 }
  }
]
```

The app uses the **Fake Store API** to fetch categories data.

- **Endpoint**: `https://fakestoreapi.com/categories`

### Sample Response:
```json
[
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
]
```



