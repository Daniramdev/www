export const PROJECTS = {
  nova: {
    kanji: '壱', eyebrow: ['Case 01', 'E-commerce', '2025'],
    role: 'Lead fullstack — arsitektur, checkout, dashboard admin (solo + 1 designer)',
    title: 'Nova <em>Commerce</em>',
    tagline: 'Headless e-commerce dengan checkout instan dan dashboard real-time untuk 12 brand D2C di Indonesia.',
    metrics: [
      { val: '12<em>+</em>', label: 'Brand Aktif' },
      { val: '1.2<em>s</em>', label: 'Load Time' },
      { val: '+38<em>%</em>', label: 'Conversion' },
      { val: '4.9<em>/5</em>', label: 'User Rating' },
    ],
    proof: [
      { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop', caption: 'Storefront · product grid', tag: '01' },
      { src: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1400&q=80&auto=format&fit=crop', caption: 'Checkout · single page', tag: '02' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop', caption: 'Dashboard · realtime orders', tag: '03' },
    ],
    problem: 'Brand D2C di Indonesia sering terjebak antara platform marketplace yang mahal komisinya dan toko custom yang lambat. Nova Commerce dibangun untuk memberi mereka kendali penuh — performa e-commerce modern, tanpa vendor lock-in, dengan biaya operasional yang bisa diprediksi.',
    solutions: [
      { n: '01', t: '<strong>Headless architecture</strong> — Next.js App Router + ISR untuk katalog yang di-cache di edge, produk baru muncul dalam hitungan detik tanpa rebuild.' },
      { n: '02', t: '<strong>Checkout satu halaman</strong> — Stripe Payment Intent + 3DS handling, dengan fallback ke transfer bank dan e-wallet lokal (GoPay, OVO, Dana).' },
      { n: '03', t: '<strong>Dashboard real-time</strong> — Metrik penjualan per menit dengan Supabase Realtime; tidak perlu refresh untuk melihat order masuk.' },
      { n: '04', t: '<strong>Admin tanpa kode</strong> — Editor produk, harga, dan promo lewat Sanity Studio; tim marketing tidak perlu menunggu developer.' },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Stripe', 'PostgreSQL', 'Supabase', 'Sanity', 'Vercel'],
    period: 'Jan — Apr 2025',
    links: [
      { label: 'Live demo', url: '#', type: 'demo' },
      { label: 'Repo', url: '#', type: 'repo' },
    ],
    reflection: 'Kalau mengulang, saya akan menulis <strong>kontrak API dan skema database lebih dulu</strong> sebelum menyentuh UI. Di minggu ke-3 saya harus refactor besar karena checkout dan dashboard memakai model data yang berbeda — kesalahan yang tidak terjadi jika kontrak ditetapkan di awal. Saya juga akan menambahkan <strong>E2E test</strong> sejak hari pertama, bukan setelah fitur selesai.',
  },

  atlas: {
    kanji: '弐', eyebrow: ['Case 02', 'Backend', '2024'],
    role: 'Backend engineer — gateway, auth, observability (tim 3 orang)',
    title: 'Atlas <em>API</em>',
    tagline: 'Gateway microservices dengan auth terpusat, rate-limit, dan observabilitas siap production.',
    metrics: [
      { val: '48<em>+</em>', label: 'Endpoints' },
      { val: '99.96<em>%</em>', label: 'Uptime' },
      { val: '42<em>ms</em>', label: 'P95 Latency' },
      { val: '180<em>K</em>', label: 'Req / Hari' },
    ],
    proof: [
      { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop', caption: 'API gateway · request flow', tag: '01' },
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop', caption: 'Observability · traces', tag: '02' },
      { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&auto=format&fit=crop', caption: 'Rate-limit · Redis window', tag: '03' },
    ],
    problem: 'Tim engineering klien memiliki 6 layanan terpisah dengan auth yang saling bertentangan, rate-limit yang tidak konsisten, dan tidak ada observabilitas terpadu. Setiap onboarding developer baru butuh 2 minggu hanya untuk memahami alur auth.',
    solutions: [
      { n: '01', t: '<strong>Single auth gateway</strong> — JWT issuance & verification terpusat; setiap service downstream hanya perlu verify signature, tidak perlu logic auth.' },
      { n: '02', t: '<strong>Rate-limit adaptif</strong> — Redis sliding window dengan budget per-endpoint; partner premium punya limit berbeda tanpa duplikasi kode.' },
      { n: '03', t: '<strong>Observability built-in</strong> — OpenTelemetry trace otomatis, setiap request punya correlation ID yang mengalir lintas service.' },
      { n: '04', t: '<strong>SDK generator</strong> — OpenAPI spec jadi source of truth; SDK TypeScript dan Postman collection auto-generate setiap build.' },
    ],
    stack: ['Node.js', 'Express', 'Redis', 'Docker', 'OpenTelemetry', 'Kubernetes', 'Terraform'],
    period: 'Mei — Okt 2024',
    links: [
      { label: 'API docs', url: '#', type: 'docs' },
      { label: 'Repo', url: '#', type: 'repo' },
    ],
    reflection: 'Keputusan yang saya sesali: memilih <strong>Redis untuk rate-limit</strong> tanpa mempertimbangkan mode degradasi. Saat Redis restart, gateway sempat menolak semua request karena fail-closed. Seharusnya default-nya <em>fail-open</em> dengan fallback in-memory. Saya juga akan menambahkan <strong>chaos test</strong> untuk skenario Redis down sejak awal, bukan setelah insiden pertama di production.',
  },

  lumen: {
    kanji: '参', eyebrow: ['Case 03', 'Design System', '2024'],
    role: 'Design engineer — token, komponen, dokumentasi (kolaborasi dengan 1 designer)',
    title: 'Lumen <em>System</em>',
    tagline: 'Design system premium dengan 60+ komponen aksesibel dan motion guideline terdokumentasi.',
    metrics: [
      { val: '64', label: 'Komponen' },
      { val: '100<em>%</em>', label: 'A11y Score' },
      { val: '5<em>tim</em>', label: 'Tim Adopsi' },
      { val: '-42<em>%</em>', label: 'Dev Time' },
    ],
    proof: [
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80&auto=format&fit=crop', caption: 'Token · color & spacing', tag: '01' },
      { src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1400&q=80&auto=format&fit=crop', caption: 'Components · states', tag: '02' },
      { src: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=1400&q=80&auto=format&fit=crop', caption: 'Storybook · live docs', tag: '03' },
    ],
    problem: 'Klien memiliki 3 produk yang saling terkait dengan style berbeda — setiap tombol, input, dan modal ditulis ulang dari nol. Tidak ada source of truth; developer menghabiskan 40% waktu untuk membangun ulang komponen yang sudah ada.',
    solutions: [
      { n: '01', t: '<strong>Token-first approach</strong> — Warna, spacing, dan tipografi didefinisikan sebagai design token (Style Dictionary), di-export ke CSS, JS, dan Figma variables.' },
      { n: '02', t: '<strong>Accessibility sebagai default</strong> — Setiap komponen lulus WCAG AA; keyboard navigation, focus ring, dan aria-label sudah built-in.' },
      { n: '03', t: '<strong>Motion guideline</strong> — Setiap transisi punya durasi & easing standar (200ms / cubic-bezier), tidak ada animasi "improvisasi" dari developer.' },
      { n: '04', t: '<strong>Storybook live</strong> — Dokumentasi interaktif dengan contoh kode, prop table, dan dark mode toggle — designer & PM bisa review tanpa membuka Figma.' },
    ],
    stack: ['React', 'TypeScript', 'Storybook', 'Style Dictionary', 'Tailwind', 'Radix UI', 'Figma'],
    period: 'Feb — Jul 2024',
    links: [
      { label: 'Storybook', url: '#', type: 'demo' },
      { label: 'Repo', url: '#', type: 'repo' },
    ],
    reflection: 'Saya terlalu lama mengejar <strong>kelengkapan komponen</strong> sebelum validasi adopsi. Tim baru mulai memakai Lumen setelah 3 bulan, karena saya menunggu "semua siap". Seharusnya saya merilis <strong>10 komponen inti lebih dulu</strong>, memaksa adopsi, lalu menambah sisanya berdasarkan kebutuhan nyata. Pelajaran: design system yang tidak dipakai sama saja dengan tidak ada.',
  },

  orbit: {
    kanji: '四', eyebrow: ['Case 04', 'Data Viz', '2023'],
    role: 'Frontend + data engineer — query, visualisasi, dashboard (solo)',
    title: 'Orbit <em>Analytics</em>',
    tagline: 'Dashboard SaaS dengan visualisasi interaktif dan latensi di bawah 200ms untuk data 40 juta baris.',
    metrics: [
      { val: '40<em>M</em>', label: 'Data Rows' },
      { val: '<200<em>ms</em>', label: 'Query Time' },
      { val: '14', label: 'Chart Types' },
      { val: '8<em>K</em>', label: 'Active Users' },
    ],
    proof: [
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop', caption: 'Dashboard · overview', tag: '01' },
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop', caption: 'Chart · brush & hover', tag: '02' },
      { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=80&auto=format&fit=crop', caption: 'Export · CSV & PNG', tag: '03' },
    ],
    problem: 'Dashboard sebelumnya membutuhkan 8-12 detik untuk setiap filter, dan hanya bisa menampilkan data agregat harian. Tim data ingin eksplorasi per jam, tapi tim engineer khawatir dengan beban query ke database.',
    solutions: [
      { n: '01', t: '<strong>Materialized views + incremental refresh</strong> — Agregasi per jam di PostgreSQL, di-refresh tiap 5 menit; query dashboard tidak pernah menyentuh tabel mentah.' },
      { n: '02', t: '<strong>D3.js custom charts</strong> — Bukan library charting bawaan, tapi D3 untuk kontrol penuh atas hover, brush selection, dan label collision handling.' },
      { n: '03', t: '<strong>WebSocket real-time</strong> — Update incremental via Supabase Realtime; tidak perlu polling, tidak perlu refresh.' },
      { n: '04', t: '<strong>Export & share</strong> — Setiap chart bisa di-export ke PNG/CSV atau di-share sebagai link read-only dengan filter state tersimpan.' },
    ],
    stack: ['React', 'TypeScript', 'D3.js', 'Supabase', 'PostgreSQL', 'WebSocket', 'Tailwind'],
    period: 'Agu — Des 2023',
    links: [
      { label: 'Case study', url: '#', type: 'demo' },
      { label: 'Repo', url: '#', type: 'repo' },
    ],
    reflection: 'Saya membangun <strong>14 tipe chart</strong> karena itu terasa "lengkap", padahal 80% pengguna hanya memakai 4 chart. Waktu yang seharusnya dipakai untuk memperdalam interaksi di 4 chart itu malah tersebar. Kalau mengulang, saya akan <strong>meluncurkan 4 chart yang benar-benar dipakai</strong>, mengukur usage, lalu menambah berdasarkan data — bukan asumsi.',
  },
};