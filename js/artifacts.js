document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

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
                
                <div class="artifact-image-container aspect-[4/3] w-full border-b border-oxford/10 bg-oxford/5 overflow-hidden">
                    <img src="${artifact.image}" alt="${artifact.title}" class="artifact-image object-cover w-full h-full" onerror="this.src='https://via.placeholder.com/800x600.png?text=Image+Not+Found'">
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
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            galleryContainer.innerHTML = '';
            
            // Simplified: No longer checking for _comment, just parsing the raw, clean JSON array
            data.forEach((artifact, index) => {
                galleryContainer.innerHTML += createArtifactCard(artifact, index);
            });

        } catch (error) {
            console.error("JSON load failed:", error);
            galleryContainer.innerHTML = '';
            
            fallbackData.forEach((artifact, index) => {
                galleryContainer.innerHTML += createArtifactCard(artifact, index);
            });
        }
    }

    loadArtifacts();
});
