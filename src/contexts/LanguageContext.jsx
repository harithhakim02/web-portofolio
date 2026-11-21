import { createContext, useContext, useMemo, useState } from "react";

const LanguageContext = createContext(null);
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      talk: "Let's talk",
    },
    hero: {
      statusOpen: "Open to new opportunities",
      statusClosed: "Not open to opportunities",
      role: "Web Developer",
      roleLabel: "PORTFOLIO",
      greeting: "Hi, I'm",
      nameSuffix: ", a",
      line: "Web Developer",
      photoLabel: "A little introduction",
      photoCaption: "Building for the web",
      description:
        "I enjoy turning ideas into clean, responsive, and user-friendly web experiences. I focus on thoughtful interfaces, reusable components, and continuous learning.",
      work: "Explore my work",
      cv: "Download CV",
      based: "Based in Indonesia",
      scroll: "Scroll to explore",
    },
    about: {
      eyebrow: "A little about me",
      title: "Curious by nature. Developer by passion.",
      p1: "I'm Harith Hakim, an aspiring Frontend Web Developer interested in creating useful digital products. I enjoy learning modern web technologies, exploring interface details, and transforming requirements into accessible user experiences.",
      p2: "This portfolio is a place to share my learning journey, selected projects, and the technologies I work with.",
      highlights: [
        {
          title: "Clean code",
          text: "Building maintainable interfaces with reusable components.",
        },
        {
          title: "Component thinking",
          text: "Breaking complex interfaces into clear, consistent pieces.",
        },
        {
          title: "Responsive first",
          text: "Creating experiences that work across screen sizes.",
        },
      ],
    },
    skills: {
      eyebrow: "What I work with",
      title: "Tools in my toolbox",
      description:
        "A selection of technologies and tools I use while learning and building web applications.",
      groups: ["Frontend", "Backend & Database", "Tools"],
    },
    projects: {
      eyebrow: "Selected work",
      title: "Projects I've explored",
      description:
        "A few concepts and applications that demonstrate my learning and approach to frontend development.",
      all: "View all projects",
      filterAll: "All",
    },
    experience: {
      eyebrow: "My journey",
      title: "Experience & education",
      description:
        "A snapshot of the professional and academic experiences that shape my development journey.",
      workTitle: "Work Experience ",
      internshipTitle: "Internship Experience",
      emptyInternship: "Internship experience will be added here.",
      internshipNote: "Practical learning and industry experience",
      entriesLabel: "ENTRIES",
      educationTitle: "Education",
      emptyWork: "Work experience will be added here.",
      emptyEducation: "Education details will be added here.",
      archive: "Carrier Archive",
      scrollHint: "Scroll horizontally to explore",
      position: "Position",
      educationLabel: "Education",
      learningLog: "Learning log",
      workNote: "A selection of roles, projects & professional chapters",
      educationNote: "The foundation behind the work",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Have something to discuss?",
      description:
        "Have a question, a project idea, or an opportunity to collaborate? Send me a message and I will get back to you by email.",
      email: "Email address",
      emailPlaceholder: "name@email.com",
      emailNote: "You can also reach me directly by email.",
      name: "Name",
      namePlaceholder: "Your full name",
      subject: "Subject",
      subjectPlaceholder: "What would you like to discuss?",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      placeholder: "Write your message here...",
      success: "Your message has been sent. Thank you for reaching out!",
      privacyNote:
        "Your contact details will only be used to reply to your message.",
    },
    projectDetail: {
      back: "Back to projects",
      overview: "Overview",
      features: "Key features",
      builtWith: "Built with",
      liveDemo: "Live demo",
      source: "Source",
      updateLinks: "Update the demo and repository links in the matching file inside src/data/projects/.",
      projectLabel: "PROJECT",
      preview: "Project preview",
      mainPreview: "Main preview",
      showcase: "Project showcase",
      openMainImage: "Open main image in a new tab",
      viewImage: "View image",
      missingImage: "Main image not added yet",
      addImageHelp: "Add the image property in the relevant file inside src/data/projects/",
      projectInformation: "Project information",
      visualDocumentation: "Visual documentation",
      exploreInterface: "Explore the interface",
      galleryDescription: "A closer look at the project's screens and details.",
      image: "images",
      galleryScreen: "Screen",
      openImage: "Open image",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      back: "Back to home",
    },
    theme: {
      appearance: "Appearance",
      description: "Adjust the display appearance to your preference.",
      mode: "MODE",
      background: "BACKGROUND",
      accent: "ACCENT COLOR",
      reset: "Reset to default",
      light: "Light",
      dark: "Dark",
      auto: "Auto",
    },
    preloader: { caption: "WEB DEVELOPER & TECH ENTHUSIAST" },
    footer: { back: "Back to top" },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
      talk: "Hubungi saya",
    },
    hero: {
      statusOpen: "Terbuka untuk peluang kerja baru",
      statusClosed: "Belum terbuka untuk peluang",
      role: "Pengembang Web",
      roleLabel: "PORTOFOLIO",
      greeting: "Halo, saya",
      nameSuffix: ", seorang",
      line: "pengembang web",
      photoLabel: "Sekilas tentang saya",
      photoCaption: "Berkarya di dunia web",
      description:
        "Saya senang mengubah ide menjadi website yang rapi, responsif, dan mudah digunakan. Saya berfokus pada tampilan yang nyaman, komponen yang tertata, serta terus mengembangkan kemampuan.",
      work: "Lihat karya saya",
      cv: "Unduh CV",
      based: "Berdomisili di Indonesia",
      scroll: "Gulir untuk melihat lebih lanjut",
    },
    about: {
      eyebrow: "Sedikit tentang saya",
      title: "Penasaran secara alami, developer sepenuh hati.",
      p1: "Saya Harith Hakim, seorang Frontend Web Developer yang senang membangun website dan aplikasi web yang bermanfaat. Saya terus mengembangkan kemampuan di bidang teknologi web, memperhatikan detail tampilan, serta mengubah ide menjadi pengalaman digital yang mudah digunakan.",
      p2: "Melalui portofolio ini, saya ingin berbagi proses belajar, proyek yang pernah saya kerjakan, dan teknologi yang saya gunakan.",
      highlights: [
        {
          title: "Kode yang rapi",
          text: "Membuat tampilan website yang rapi dan mudah dikembangkan.",
        },
        {
          title: "Berpikir berbasis komponen",
          text: "Menyusun tampilan menjadi komponen yang terstruktur dan konsisten.",
        },
        {
          title: "Mengutamakan responsivitas",
          text: "Memastikan website tetap nyaman digunakan di berbagai ukuran layar.",
        },
      ],
    },
    skills: {
      eyebrow: "Teknologi yang saya gunakan",
      title: "Teknologi yang saya gunakan",
      description:
        "Beberapa teknologi dan alat yang saya gunakan untuk belajar serta mengembangkan aplikasi web.",
      groups: ["Frontend", "Backend & Database", "Tools"],
    },
    projects: {
      eyebrow: "Karya pilihan",
      title: "Beberapa proyek pilihan saya",
      description:
        "Berikut beberapa proyek yang pernah saya kerjakan sebagai bagian dari proses belajar dan pengembangan kemampuan frontend.",
      all: "Lihat semua proyek",
      filterAll: "Semua",
    },
    experience: {
      eyebrow: "Perjalanan saya",
      title: "Pengalaman dan pendidikan",
      description:
        "Berikut pengalaman kerja dan pendidikan yang membentuk perjalanan saya di bidang pengembangan web.",
      workTitle: "Pengalaman kerja",
      internshipTitle: "Pengalaman magang",
      emptyInternship: "Informasi pengalaman magang akan ditampilkan di sini.",
      internshipNote:
        "Pengalaman belajar dan praktik di lingkungan profesional",
      entriesLabel: "DATA",
      educationTitle: "Pendidikan",
      emptyWork: "Informasi pengalaman kerja akan ditampilkan di sini.",
      emptyEducation: "Informasi pendidikan akan ditampilkan di sini.",
      archive: "Rekam Jejak Karier",
      scrollHint: "Geser ke samping untuk menjelajahi",
      position: "Posisi",
      educationLabel: "Pendidikan",
      learningLog: "Catatan pendidikan",
      workNote: "Pilihan Peran, Proyek, dan Jejak Karier",
      educationNote: "Landasan yang membentuk perjalanan profesional",
    },
    contact: {
      eyebrow: "Hubungi saya",
      title: "Ada yang ingin didiskusikan?",
      description:
        "Punya pertanyaan, ide proyek, atau ingin berkolaborasi? Silakan kirim pesan. Saya akan menghubungi Anda kembali melalui email.",
      email: "Email",
      emailPlaceholder: "nama@email.com",
      emailNote: "Anda juga bisa menghubungi saya langsung melalui email.",
      name: "Nama",
      namePlaceholder: "Nama lengkap Anda",
      subject: "Subjek",
      subjectPlaceholder: "Apa yang ingin dibahas?",
      message: "Pesan",
      send: "Kirim pesan",
      sending: "Sedang mengirim...",
      placeholder: "Tuliskan pesan Anda di sini...",
      success: "Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!",
      privacyNote:
        "Informasi kontak Anda hanya digunakan untuk membalas pesan ini.",
    },
    projectDetail: {
      back: "Kembali ke proyek",
      overview: "Ringkasan",
      features: "Fitur utama",
      builtWith: "Dibangun dengan",
      liveDemo: "Demo langsung",
      source: "Kode sumber",
      updateLinks:
        "Perbarui tautan demo dan repositori pada file proyek terkait di dalam src/data/projects/.",
      projectLabel: "PROYEK",
      preview: "Pratinjau proyek",
      mainPreview: "Tampilan utama",
      showcase: "Etalase proyek",
      openMainImage: "Buka gambar utama di tab baru",
      viewImage: "Lihat gambar",
      missingImage: "Gambar utama belum ditambahkan",
      addImageHelp: "Tambahkan properti image pada file proyek terkait di dalam src/data/projects/",
      projectInformation: "Informasi proyek",
      visualDocumentation: "Dokumentasi visual",
      exploreInterface: "Jelajahi setiap tampilan",
      galleryDescription: "Beberapa cuplikan dari proses dan hasil proyek.",
      image: "gambar",
      galleryScreen: "Tampilan",
      openImage: "Buka gambar",
    },
    notFound: {
      title: "Halaman tidak ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
      back: "Kembali ke beranda",
    },
    theme: {
      appearance: "Tampilan",
      description: "Atur suasana tampilan sesuai keinginan.",
      mode: "MODE",
      background: "LATAR BELAKANG",
      accent: "WARNA AKSEN",
      reset: "Kembalikan ke default",
      light: "Terang",
      dark: "Gelap",
      auto: "Otomatis",
    },
    preloader: { caption: "PENGEMBANG WEB DAN PEGIAT TEKNOLOGI" },
    footer: { back: "Kembali ke atas" },
  },
};

export const projectTranslations = {
  en: {
    "f1-information": {
      title: "F1 Information Website",
      category: "Frontend Website",
      description: "A responsive information hub for Formula 1 teams, drivers, race schedules, and championship standings.",
      overview: "A concept website that organizes Formula 1 information into a clean and accessible interface.",
      features: ["Driver and team profiles", "Race schedule layout", "Responsive navigation", "Reusable content cards"],
    },
    "commerce-ui": {
      title: "E-Commerce Interface",
      category: "Web Application",
      description: "A modern storefront concept with product discovery, category filters, and a shopping cart experience.",
      overview: "A frontend e-commerce concept focused on product discovery and a simple checkout journey.",
      features: ["Product listing", "Category filtering", "Cart interaction concept", "Responsive product detail"],
    },
    "admin-dashboard": {
      title: "Admin Dashboard",
      category: "Dashboard",
      description: "A clean dashboard concept for monitoring business metrics, recent activity, and tabular data.",
      overview: "A dashboard interface designed to present operational data clearly and consistently.",
      features: ["Summary metric cards", "Activity table", "Chart area", "Responsive sidebar concept"],
    },
    "expense-tracker": {
      title: "Expense Tracker",
      category: "Web Application",
      description: "A personal finance interface to review income, expenses, and monthly spending patterns.",
      overview: "A finance tracker concept that makes personal transactions easier to review.",
      features: ["Income and expense summary", "Transaction history", "Monthly spending chart concept", "Category labels"],
    },
  },
  id: {
    "f1-information": {
      title: "Website Informasi F1",
      category: "Website Frontend",
      description: "Pusat informasi responsif untuk tim, pembalap, jadwal balapan, dan klasemen Formula 1.",
      overview: "Website konsep yang menyajikan informasi Formula 1 melalui antarmuka yang rapi dan mudah diakses.",
      features: ["Profil pembalap dan tim", "Tampilan jadwal balapan", "Navigasi responsif", "Kartu konten yang dapat digunakan ulang"],
    },
    "commerce-ui": {
      title: "Antarmuka E-Commerce",
      category: "Aplikasi Web",
      description: "Konsep toko online modern dengan pencarian produk, filter kategori, dan pengalaman keranjang belanja.",
      overview: "Konsep frontend e-commerce yang berfokus pada pencarian produk dan alur checkout sederhana.",
      features: ["Daftar produk", "Filter kategori", "Konsep interaksi keranjang", "Detail produk responsif"],
    },
    "admin-dashboard": {
      title: "Dasbor Admin",
      category: "Dasbor",
      description: "Konsep dasbor untuk memantau metrik bisnis, aktivitas terbaru, dan data berbentuk tabel.",
      overview: "Antarmuka dasbor yang dirancang untuk menyajikan data operasional secara jelas dan konsisten.",
      features: ["Kartu ringkasan metrik", "Tabel aktivitas", "Area grafik", "Konsep sidebar responsif"],
    },
    "expense-tracker": {
      title: "Pencatat Pengeluaran",
      category: "Aplikasi Web",
      description: "Antarmuka keuangan pribadi untuk melihat pemasukan, pengeluaran, dan pola belanja bulanan.",
      overview: "Konsep pencatat keuangan yang memudahkan pengguna meninjau transaksi pribadi.",
      features: ["Ringkasan pemasukan dan pengeluaran", "Riwayat transaksi", "Konsep grafik pengeluaran bulanan", "Label kategori"],
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("portfolio-language") || "en",
  );
  const value = useMemo(
    () => ({
      language,
      setLanguage: (next) => {
        localStorage.setItem("portfolio-language", next);
        setLanguage(next);
      },
      t: translations[language],
    }),
    [language],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
