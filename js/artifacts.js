document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    // Fallback data in case local viewing blocks the fetch request
    const fallbackData = [
        {
            "id": "1",
            "title": "House with Lines",
            "tools": "Adobe Illustrator",
            "skills": "Vector paths, Line weight hierarchy",
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
            "message": "This artifact demonstrates the fundamental use of the line tool to convey structure and perspective."
        }
    ];

    function createArtifactCard(artifact, index) {
        const artifactNum = String(index + 1).padStart(2, '0');
        
        return `
            <article class="artifact-card border border-oxford/10 bg-bone flex flex-col relative group">
                <div class="flex justify-between items-center p-4 md:p-6 border-b border-oxford/10">
                    <span class="font-display font-bold text-xl md:text-2xl">${artifactNum}.</span>
                    <span class="text-xs uppercase tracking-[0.2em] font-semibold text-oxford/60">Artifact</span>
                </div>
                
                <div class="artifact-image-container aspect-[4/3] w-full border-b border-oxford/10 bg-oxford/5 flex items-center justify-center p-4">
                    <img src="${artifact.image}" alt="${artifact.title}" class="artifact-image object-contain shadow-sm" onerror="this.src='https://via.placeholder.com/800x600.png?text=Image+Not+Found'">
                </div>

                <div class="p-6 md:p-8 flex-grow flex flex-col">
                    <h2 class="text-2xl md:text-3xl font-display font-bold mb-4">${artifact.title}</h2>
                    
                    <div class="space-y-2 mb-6 text-sm md:text-base text-oxford/80 font-light flex-grow">
                        <p class="leading-relaxed">${artifact.message}</p>
                    </div>

                    <div class="pt-6 border-t border-oxford/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h4 class="text-[10px] uppercase tracking-widest font-bold text-oxford/50 mb-1">Tools Utilized</h4>
                            <p class="text-sm font-medium">${artifact.tools}</p>
                        </div>
                        <div>
                            <h4 class="text-[10px] uppercase tracking-widest font-bold text-oxford/50 mb-1">Skills Demonstrated</h4>
                            <p class="text-sm font-medium leading-tight">${artifact.skills}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    async function loadArtifacts() {
        try {
            const response = await fetch('../artifacts/artifacts.json');
            
            // Check if response is ok and actually has content
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Wait for the text first to check if it's empty
            const text = await response.text();
            
            if (!text || text.trim() === '') {
                throw new Error('JSON file is empty');
            }
            
            // Safely parse the text into JSON
            const data = JSON.parse(text);
            
            galleryContainer.innerHTML = '';
            
            let displayIndex = 0;
            data.forEach((artifact) => {
                if (artifact._comment) return;
                galleryContainer.innerHTML += createArtifactCard(artifact, displayIndex);
                displayIndex++;
            });

        } catch (error) {
            console.warn("JSON fetch failed (likely running locally). Loading fallback data.", error);
            galleryContainer.innerHTML = '';
            
            fallbackData.forEach((artifact, index) => {
                galleryContainer.innerHTML += createArtifactCard(artifact, index);
            });
        }
    }

    loadArtifacts();
});
