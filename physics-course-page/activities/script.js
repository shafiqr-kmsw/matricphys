// Document data in exact order as provided
const documents = [
  { name: "Circular Motion Simulation 1", link: "files/circular1.html" },
  { name: "Circular Motion Simulation 2", link: "files/circular2.html" },
  { name: "Circular Motion Quiz", link: "files/circular-quiz.html" },
  { name: "Circular Motion Progression", link: "files/circular-levels.html" },
  { name: "Rotational Kinematics Explorer", link: "files/rot-kine.html" },
  { name: "Torque Tic-Tac-Toe", link: "files/torque-tictactoe.html" },
  { name: "SHM cases", link: "files/shm.html" },
  { name: "Oscillimon: Gotta Catch em All !", link: "files/oscillimon.html" },
  { name: "Short Notes on Resonant Frequency", link: "files/resonant-notes.html" },
  { name: "Standing Waves cases", link: "files/standing-waves.html" },
  { name: "Standing Waves Practice (Quick & Easy)", link: "files/tube-practice.html" },
  { name: "Sound Waves explorer", link: "files/sound-waves.html" },
  { name: "Sound Waves Practice", link: "files/wave-prac.html" },
  { name: "Match Closed Tube", link: "files/match-closed-tube.html" },
  { name: "Thermodynamic Process Calculator", link: "files/pv-calc.html" },
  { name: "Thermal Expansion Duel", link: "files/therm-expand-duel.html" },
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