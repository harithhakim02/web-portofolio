/**
 * Daftar kategori untuk halaman View All Projects.
 *
 * Cara mengubah:
 * 1. Ubah `value` agar sama persis dengan `category` pada file proyek.
 * 2. Ubah `label.en` dan `label.id` sesuai teks yang ingin ditampilkan.
 * 3. Tambahkan objek baru untuk kategori tambahan atau hapus objek yang tidak dipakai.
 *
 * Urutan kategori di sini juga menjadi urutan tombol filter di website.
 */
export const projectCategories = [
  {
    value: "Frontend Website",
    label: {
      en: "Frontend Website",
      id: "Website Frontend",
    },
  },
  {
    value: "Web Application",
    label: {
      en: "Web Application",
      id: "Aplikasi Web",
    },
  },
  {
    value: "Dashboard",
    label: {
      en: "Dashboard",
      id: "Dasbor",
    },
  },
];
