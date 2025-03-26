import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // Vite'nin proje kök dizini olarak 'src' klasörünü kullanmasını sağlar
  server: {
    // Tarayıcı Başlat
    open: true,
    // Port Ayarla
    port: 9000,
    // Dış Bağlantıları Kabul Et
    cors: true,
  },
  build: {
    // Çıktıyı proje kökünde 'dist' klasörüne alır
    outDir: "../dist",
    emptyOutDir: true,
  },
});
