// Document data in exact order as provided
const documents = [
    { name: "Surat Pelantikan Pertama Skim Perkhidmatan Pendidikan Di Gred DG41/DG44", link: "" },
    { name: "Surat Pengesahan Jawatan", link: "files/2.pdf" },
    { name: "Salinan Sijil Kelulusan Akademik", link: "files/3.pdf" },
    { name: "Sijil Kelulusan Ikhtisas", link: "files/4.pdf" },
    { name: "Kenyataan Perkhidmatan", link: "" },
    { name: "Surat Pemakluman Pengisytiharan Harta", link: "" },
    { name: "Jadual Waktu Mengajar (Bagi Tahun 2022, 2023, 2024 Dan 2025)", link: "" },
    { name: "Dronatrix 2025", link: "" },
    { name: "Dronatrix FPV Challenge 2024", link: "" },
    { name: "Dronatrix FPV Challenge 2023", link: "" },
    { name: "Temuduga Pemilihan JPPro", link: "files/11.pdf" },
    { name: "Bengkel Training Of Trainers", link: "" },
    { name: "Bengkel Peningkatan Profesionalisme", link: "" },
    { name: "Bengkel Pemeriksaan Skrip Jawapan 2023/2024", link: "files/14.pdf" },
    { name: "Kolokium Praktis STEM", link: "files/15.pdf" },
    { name: "Bengkel Pemeriksaan Skrip Fizik 2022/2023", link: "files/16.pdf" },
    { name: "Bengkel Pemurnian Bahan Amali", link: "" },
    { name: "Bengkel Pemeriksaan Borang Jawaban 2021/2022", link: "files/18.pdf" },
    { name: "Program Math & Science", link: "" },
    { name: "Matrix Excellence Programme 2024", link: "" },
    { name: "Matrix Excellence Programme 2023", link: "" },
    { name: "Program Sinergi Inkubator Stem", link: "" },
    { name: "Bengkel Pemeriksaan Tugasan Fizik", link: "" },
    { name: "Program Smartphysics", link: "" },
    { name: "Program 'How To Read A Book'", link: "" },
    { name: "Bengkel Pembinaan Buku Tutorial", link: "" },
    { name: "Bengkel Latihan Adobe Indesign", link: "" },
    { name: "Program Book Sharing", link: "" },
    { name: "Bengkel Smartphysics", link: "" },
    { name: "Bengkel Profesionalisme Pensyarah", link: "" },
    { name: "Program Celik Digital", link: "" },
    { name: "Bengkel Penulisan Kajian Tindakan", link: "" },
    { name: "Bengkel Perancangan Ilmu Sains", link: "" },
    { name: "Taklimat Pengawasan Peperiksaan", link: "" },
    { name: "Program Akademi Youtube", link: "" },
    { name: "Flipped Classrooms", link: "" },
    { name: "Wacana Ilmu Pemurnian Soalan", link: "" },
    { name: "Bengkel Modul STEM", link: "" },
    { name: "Bengkel Looker Studio", link: "" },
    { name: "Kolokium Pendidikan", link: "" },
    { name: "Glassboard Pendekatan Baharu", link: "" },
    { name: "Kertas Kerja Smartphysics", link: "" },
    { name: "Impact Of Phet Simulations", link: "" },
    { name: "Impact Of Peer Teaching", link: "" },
    { name: "Pspm2 Physics Results Report", link: "" },
    { name: "Pspm1 Physics Results Report", link: "" },
    { name: "Physics Pride Proposal", link: "" },
    { name: "Noise-Induced Cognitive Interference", link: "" },
    { name: "Pencapaian Min Tertinggi Bmkpm", link: "" },
    { name: "Pencapaian IPPA Tertinggi", link: "" },
    { name: "Pencapaian Min Tertinggi Kolej", link: "" },
    { name: "E-Penilaian Tertinggi", link: "" },
    { name: "Pensyarah Terbaik", link: "" },
    { name: "Lesson Crafter", link: "files/56.pdf" },
    { name: "Merit Matrix Match", link: "" },
    { name: "Physics II Analyzer", link: "" },
    { name: "Sp025 Test Scheduler", link: "" },
    { name: "E-Phylab", link: "" }
];

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