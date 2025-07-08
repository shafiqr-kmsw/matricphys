// Document data in exact order as provided
const documents = [
  { name: "1) Surat Pelantikan Pertama Skim Perkhidmatan Pendidikan di Gred DG41/DG9", link: "files/1.pdf" },
  { name: "2) Surat Pengesahan Jawatan", link: "files/2.pdf" },
  { name: "3) Salinan Sijil kelulusan akademik", link: "files/3.pdf" },
  { name: "4) Sijil kelulusan ikhtisas", link: "files/4.pdf" },
  { name: "5) Kenyataan Perkhidmatan", link: "" },
  { name: "6) Surat Pemakluman Pengisytiharan Harta", link: "files/6.pdf" },
  { name: "7) Jadual Waktu Mengajar (bagi tahun 2022, 2023, 2024 dan 2025", link: "files/7.pdf" },
  { name: "8) DRONATRIX 2025", link: "files/8.pdf" },
  { name: "9) DRONATRIX FPV Challenge 2024", link: "files/9.pdf" },
  { name: "10) DRONATRIX FPV Challenge 2023", link: "files/10.pdf" },
  { name: "11) Temuduga Pemilihan JPPRO", link: "files/11.pdf" },
  { name: "12) Bengkel Training of Trainers", link: "files/12.pdf" },
  { name: "13) Bengkel Peningkatan Profesionalisme", link: "files/13.pdf" },
  { name: "14) Bengkel Pemeriksaan Skrip Jawaban", link: "files/14.pdf" },
  { name: "15) Kolokium Praktis STEM", link: "files/15.pdf" },
  { name: "16) Bengkel Pemeriksaan Skrip Fizik 22/23", link: "files/16.pdf" },
  { name: "17) Bengkel Pemurnian Bahan Amali", link: "files/17.pdf" },
  { name: "18) Bengkel Pemeriksaan Borang Jawapan 21/22", link: "files/18.pdf" },
  { name: "19) PROGRAM MATH & SCIENCE", link: "files/19.pdf" },
  { name: "20) MATRIX EXCELLENCE PROGRAMME 2024", link: "files/20.pdf" },
  { name: "21) MATRIX EXCELLENCE PROGRAMME 2023", link: "files/21.pdf" },
  { name: "22) PROGRAM SINERGI INKUBATOR STEM", link: "files/22.pdf" },
  { name: "23) Bengkel Pemeriksaan Tugasan Fizik", link: "files/23.pdf" },
  { name: "24) PROGRAM SMARTPHYSICS", link: "files/24.pdf" },
  { name: "25) PROGRAM 'HOW TO READ A BOOK'", link: "files/25.pdf" },
  { name: "26) Bengkel Pembinaan Buku Tutorial SP025", link: "files/26.pdf" },
  { name: "27) Bengkel Pembinaan Buku Tutorial SP015", link: "files/27.pdf" },
  { name: "28) Bengkel Latihan Adobe InDesign", link: "files/28.pdf" },
  { name: "29) PROGRAM BOOK SHARING", link: "files/29.pdf" },
  { name: "30) BENGKEL SMARTPHYSICS", link: "files/24.pdf" },
  { name: "31) Bengkel Profesionalisme Pensyarah", link: "files/31.pdf" },
  { name: "32) PROGRAM CELIK DIGITAL", link: "files/32.pdf" },
  { name: "33) Bengkel Penulisan Kajian Tindakan", link: "files/33.pdf" },
  { name: "34) Bengkel Perancangan Ilmu Sains", link: "files/34.pdf" },
  { name: "35) Taklimat Pengawasan Peperiksaan", link: "files/35.pdf" },
  { name: "36) PROGRAM AKADEMI YOUTUBE", link: "files/36.pdf" },
  { name: "37) FLIPPED CLASSROOMS", link: "files/37.pdf" },
  { name: "38) Wacana Ilmu Pemurnian Soalan Ujian Amali", link: "files/38.pdf" },
  { name: "39) Bengkel Modul STEM", link: "files/39.pdf" },
  { name: "40) Bengkel Looker Studio", link: "files/40.pdf" },
  { name: "41) KOLOKIUM PENDIDIKAN", link: "files/15.pdf" },
  { name: "42) Bengkel Pemurnian Bahan Amali", link: "files/42.pdf" },
  { name: "43) GLASSBOARD Pendekatan Baharu", link: "files/43.pdf" },
  { name: "44) Kertas Kerja SmartPhysics", link: "files/44.pdf" },
  { name: "45) IMPACT OF PHET SIMULATIONS", link: "files/45.pdf" },
  { name: "46) IMPACT OF PEER TEACHING", link: "files/46.pdf" },
  { name: "47) 2023/2024 PSPM2 Physics Results Report", link: "files/47.pdf" },
  { name: "48) 2023/2024 PSPM1 Physics Results Report", link: "files/48.pdf" },
  { name: "49) PHYSICS PRIDE Proposal", link: "files/49.pdf" },
  { name: "50) NOISE-INDUCED COGNITIVE INTERFERENCE", link: "files/50.pdf" },
  { name: "51) Pencapaian Mengatasi MIN BMKPM", link: "files/51.pdf" },
  { name: "52) Pencapaian IPPA Tertinggi", link: "files/52.pdf" },
  { name: "53) Pencapaian MIN Tertinggi Kolej", link: "files/53.pdf" },
  { name: "54) e-Penilaian PelajarTertinggi", link: "files/54.pdf" },
  { name: "55) Pensyarah Terbaik", link: "files/55.pdf" },
  { name: "56) LESSON CRAFTER", link: "files/56.pdf" },
  { name: "57) MERIT MATRIX MATCH", link: "files/57.pdf" },
  { name: "58) PHYSICS II COURSEWORK ANALYZER", link: "files/58.pdf" },
  { name: "59) SP025 TEST SCHEDULER", link: "files/59.pdf" },
  { name: "60) E-PHYLAB", link: "files/60.pdf" }
]
;

// Function to render documents in original order
function renderDocuments(docs = documents) {
    const container = document.getElementById('documentList');
    container.innerHTML = '';

    if (docs.length === 0) {
        container.innerHTML = '<p class="no-results">No documents found matching your search.</p>';
        return;
    }

    // Render all documents in the original order
    docs.forEach(doc => {
        const btn = document.createElement('button');
        btn.className = `document-btn ${doc.link ? 'has-link' : 'no-link'}`;
        btn.textContent = doc.name;
        
        if (doc.link) {
            btn.onclick = () => window.open(doc.link, '_blank');
        } else {
            btn.onclick = () => alert(`No link available for ${doc.name}`);
        }
        
        container.appendChild(btn);
    });
}

// Function to filter documents based on search input
function filterDocuments() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredDocs = documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm)
    );
    renderDocuments(filteredDocs);
}

// Set up event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderDocuments();
    document.getElementById('search').addEventListener('keyup', filterDocuments);
});
// Update document count when page loads
function updateDocumentCount() {
    // Only count buttons with links (has-link class)
    const availableDocs = document.querySelectorAll('.document-btn.has-link').length;
    document.getElementById('docCount').textContent = availableDocs;
}

// Initialize counter when page loads
document.addEventListener('DOMContentLoaded', updateDocumentCount);

// If you dynamically load documents, call this after rendering:
// updateDocumentCount();