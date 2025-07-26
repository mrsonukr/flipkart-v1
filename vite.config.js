import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@lottiefiles/lottie-player']
  },
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 1000,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        manualChunks: {
          // Core vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          swiper: ['swiper'],
          icons: ['react-icons', 'lucide-react'],
          
          // Page chunks
          home: ['./src/pages/Home.jsx'],
          product: ['./src/pages/Product.jsx'],
          cart: ['./src/pages/Cart.jsx'],
          address: ['./src/pages/Address.jsx'],
          summary: ['./src/pages/Summary.jsx'],
          payment: ['./src/pages/Payment.jsx'],
          
          // Component chunks
          components: [
            './src/components/Header.jsx',
            './src/components/Header2.jsx',
            './src/components/Header3.jsx'
          ],
          productComponents: [
            './src/components/product-ui/ProductSlider.jsx',
            './src/components/product-ui/ProductDetails.jsx',
            './src/components/product-ui/BottomButtons.jsx'
          ],
          cartComponents: [
            './src/components/cart-ui/CartProduct.jsx',
            './src/components/cart-ui/PriceDetails.jsx',
            './src/components/cart-ui/AddressBar.jsx'
          ],
          paymentComponents: [
            './src/components/payment/PayHeader.jsx',
            './src/components/payment/UPIPaymentOptions.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: {
    host: true,        // 👈 enables access via IP like 192.168.x.x
    port: 5173,        // 👈 optional (default is 5173)
    https: false,      // Set to true when you have SSL certificate
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Cache-Control': 'no-cache',
    }
  }
})
