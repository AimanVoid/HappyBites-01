import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("paw_plate_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("happy_bites_theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("happy_bites_theme", darkMode ? "dark" : "light");

    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("paw_plate_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <Navbar
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode((prev) => !prev)}
      />

      <main className="pt-16">
        {orderComplete ? (
          <OrderSuccess onContinueShopping={() => setOrderComplete(false)} />
        ) : checkoutOpen ? (
          <Checkout
            cart={cart}
            onClose={() => setCheckoutOpen(false)}
            onOrderComplete={() => {
              setCart([]);
              setCheckoutOpen(false);
              setOrderComplete(true);
            }}
          />
        ) : (
          <>
            <Hero darkMode={darkMode} />

            <About />

            <Categories
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              darkMode={darkMode}
            />

            <Products
              onAdd={addToCart}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            <Contact />
            <Footer />
          </>
        )}
      </main>

      <CartSidebar
        isOpen={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        increase={increaseQuantity}
        decrease={decreaseQuantity}
        remove={removeFromCart}
        clear={clearCart}
        checkout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
    </div>
  );
}

export default App;
