document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    // Function to generate HTML for a single artifact card
    function createArtifactCard(artifact, index) {
        // Formats numbers as 01, 02, etc.
        const artifactNum = String(index + 1).padStart(2, '0');
        
        return `
            <article class="artifact-card border border-oxford/10 bg-bone flex flex-col relative group">
                <!-- Top Bar -->
                <div class="flex justify-between items-center p-4 md:p-6 border-b border-oxford/10">
                    <span class="font-display font-bold text-xl md:text-2xl">${artifactNum}.</span>
                    <span class="text-xs uppercase tracking-[0.2em] font-semibold text-oxford/60">Artifact</span>
                </div>
                
                <!-- Image Container -->
                <div class="artifact-image-container aspect-[4/3] w-full border-b border-oxford/10 bg-oxford/5 flex items-center justify-center p-4">
                    <img src="${artifact.image}" alt="${artifact.title}" class="artifact-image object-contain shadow-sm" onerror="this.src='https://via.placeholder.com/800x600.png?text=Image+Not+Found'">
                </div>

                <!-- Content Details -->
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

    // Fetch the JSON file
    async function loadArtifacts() {
        try {
            // Looks in the artifacts folder at the root of the site
            const response = await fetch('../artifacts/artifacts.json');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            // Remove the loading skeleton
            galleryContainer.innerHTML = '';
            
            // Create a card for every item in the JSON file
            data.forEach((artifact, index) => {
                galleryContainer.innerHTML += createArtifactCard(artifact, index);
            });

        } catch (error) {
            console.error("Error loading JSON:", error);
            galleryContainer.innerHTML = `
                <div class="border border-red-500/20 p-8 w-full bg-red-50 text-red-800 col-span-1 md:col-span-2">
                    <h3 class="font-bold text-lg mb-2">Error Loading Artifacts</h3>
                    <p>Could not load the artifacts.json file. Please ensure it is uploaded to the correct folder.</p>
                </div>
            `;
        }
    }

    loadArtifacts();
});
