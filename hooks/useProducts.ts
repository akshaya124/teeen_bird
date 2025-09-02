import { useState, useEffect } from 'react';
import type { Product } from '../types';

const mockProducts: Product[] = [
  { id: 1, name: 'Oversized Graphic Hoodie', description: 'Stay comfy and stylish with this 100% cotton oversized hoodie. Features a unique back print and a soft fleece interior. Essential for any streetwear look.', imageUrl: 'https://picsum.photos/seed/hoodie/600/400', price: 69.99, category: 'Apparel' },
  { id: 2, name: 'RGB LED Strip Lights (5m)', description: 'Transform your room\'s vibe with these remote-controlled RGB LED strip lights. Easy to install and perfect for creating aesthetic backgrounds.', imageUrl: 'https://picsum.photos/seed/led/600/400', price: 24.99, category: 'Decor' },
  { id: 3, name: 'Customizable Phone Case', description: 'Protect your phone and show off your personality. Durable, shock-absorbent case that you can customize with your own text or design.', imageUrl: 'https://picsum.photos/seed/case/600/400', price: 29.50, category: 'Accessories' },
  { id: 4, name: 'DIY Boba Tea Kit', description: 'Become a boba master at home. This kit includes everything you need to make 5 servings of delicious classic milk tea with tapioca pearls.', imageUrl: 'https://picsum.photos/seed/boba/600/400', price: 34.99, category: 'Lifestyle' },
  { id: 5, name: 'Noise-Cancelling Gaming Headset', description: 'Level up your gaming experience. Crystal-clear audio, a noise-cancelling mic, and comfy earcups for long sessions. Universal compatibility.', imageUrl: 'https://picsum.photos/seed/headset/600/400', price: 89.00, category: 'Tech' },
  { id: 6, name: 'Cloud-Shaped Throw Pillow', description: 'An adorable and super-soft cloud-shaped pillow to add a touch of whimsy to your bed or couch. Perfect for cozy vibes.', imageUrl: 'https://picsum.photos/seed/pillow/600/400', price: 22.50, category: 'Decor' },
  { id: 7, name: 'Vintage-Style Oval Sunglasses', description: 'The perfect Y2K accessory. These retro-inspired sunglasses offer UV400 protection and come in multiple lens colors.', imageUrl: 'https://picsum.photos/seed/glasses/600/400', price: 18.00, category: 'Accessories' },
  { id: 8, name: 'Hydro-Boost Skincare Set', description: 'A 3-step skincare routine for glowing, hydrated skin. Includes a gentle cleanser, hyaluronic acid serum, and a gel moisturizer.', imageUrl: 'https://picsum.photos/seed/skincare/600/400', price: 45.00, category: 'Beauty' },
  { id: 9, name: 'Portable Bluetooth Speaker', description: 'Take your music anywhere. Compact, waterproof, and packs a punch with deep bass and 12-hour battery life.', imageUrl: 'https://picsum.photos/seed/speaker/600/400', price: 55.00, category: 'Tech' },
  { id: 10, name: 'Set of 4 Matte Claw Clips', description: 'Effortless hairstyles in seconds. This set includes four large claw clips in neutral matte colors to match any outfit.', imageUrl: 'https://picsum.photos/seed/clips/600/400', price: 15.99, category: 'Accessories' },
];

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;