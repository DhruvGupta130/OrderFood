# 🍽️ Welcome to **The Gupta's** Food Delivery App!

Experience seamless food delivery, bringing delicious meals right to your doorstep! Whether you're craving a quick bite or planning a feast, we've got you covered.

🔗 **Live Website**: https://theguptas.netlify.app/

## 🚀 Key Features

- **Multi-Item Carousel**: Discover top meals with our interactive carousel.
- **Dynamic Restaurant Listings**: Browse a wide variety of restaurants, filtering by cuisine and dietary preferences.
- **User-Friendly Navigation**: Enjoy smooth access to your profile, cart, and search with our intuitive navbar.
- **Real-Time Order Tracking**: Stay updated on your order status from preparation to delivery.
- **Favorites & Recommendations**: Save your favorite restaurants and receive personalized meal suggestions based on your order history.

## 🛠️ Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (for the frontend)
- **npm** (Node Package Manager)
- **React.js** (for building the user interface)
- **React Redux** (for state management)
- **Google Material UI** (for UI components)
- **Java** (for the Spring Boot backend)
- **Spring Boot** (for creating backend services)
- **MySQL** (for database storage)
- **Cloudinary** (for uploading images)

## 🛠️ Getting Started

### Installation

To set up your local environment, follow these steps:

```bash
git clone [repository link]
cd [project-directory]
npm install
npm start
```

Ensure you have **Node.js** and **npm** installed.

### 🛠️ Backend Setup

1. **Database Setup (MySQL)**:
   - Install MySQL and create a database:
     ```sql
     CREATE DATABASE food_delivery;
     ```
   - Update **backend/src/main/resources/application.properties** with:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/food_delivery
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     ```

2. **Run the Backend**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### 🛠️ Files to Configure

1. **Frontend Configuration**:
   - **`frontend/src/RestaurantOwnersComponent/Utils/UploadToCloud.jsx`** → Configure your **Cloudinary** details for image uploads.
   
2. **Backend Configuration**:
   - **`backend/src/main/resources/application.properties`** → Configure **MySQL database** and **SMTP settings** for email notifications.

## 📖 How to Use

1. **Explore Restaurants**: Navigate to the home page to browse local restaurants.
2. **Search Feature**: Use the search bar to quickly find specific dishes or restaurants.
3. **Cart Management**: Add items to your cart, choose your delivery address, and review your order before checkout.
4. **Profile Management**: Create and manage your user profile, including saving favorite addresses and payment methods.
5. **Order History**: View past orders and re-order your favorites with just a click.

## 🤝 Contributing

We welcome contributions! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m "Added feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Submit a pull request.

## 🙏 Acknowledgments

Special thanks to **Code with Zosh** for their support in building this web app!

## 💡 Inspiration

Inspired by the growing need for convenient food delivery solutions in today’s fast-paced world.

## 🔍 Additional Features

- **Search Functionality**: Easily find menu items and restaurants using keywords.
- **Add to Favorites**: Easily add the restaurants in your favorites for easy tracking.
- **Cart**: Easily add your favorite items to the cart and order collectively.
- **Order History**: Track your past orders and purchases.

## 📄 License

This project is licensed under the [MIT License](LICENSE.txt).

## 💬 Feedback & Issues

If you encounter any bugs or have suggestions, please open an issue on GitHub! Your feedback is invaluable for our continuous improvement.

## 🌱 Future Plans

- Implement a **loyalty program** to reward frequent customers.
- Enable **ratings and reviews** by customers.
- Expand to include **multiple languages and currencies**.
- Enhance user experience with **AI-driven meal recommendations**.

🙏 **Thank You for Checking Out The Gupta's Food Delivery App!** 🚀  
Enjoy your experience and delicious meals! 🍽️✨
