// 1. Analytics Tracking Script
function recordPageVisit(pageID) {
    const lockKey = `tracked_visit_${pageID}`;
    
    if (!sessionStorage.getItem(lockKey)) {
        fetch(`https://abacus.jasoncameron.dev/hit/cleon-williams-portfolio/${pageID}`)
            .then(response => response.json())
            .then(data => {
                if (data.value !== undefined) {
                    sessionStorage.setItem(lockKey, 'true');
                    console.log(`[Analytics] Success! Hit logged for: ${pageID}.`);
                }
            })
            .catch(error => console.warn("[Analytics] Tracking request failed.", error));
    } else {
        console.log(`[Analytics] Ignored duplicate visit for: ${pageID}`);
    }
}

// Fire the tracker immediately for this page
recordPageVisit('copyright_page');

// 2. Visual Editor JSON Fetch and Render Logic
document.addEventListener('DOMContentLoaded', async () => {
    const mountPoint = document.getElementById('dynamic-content-mount');
    
    try {
        // Fetch the JSON file you generated with the Visual Editor!
        const response = await fetch('../content/copyright-layout.json');
        
        if (!response.ok) throw new Error('Layout file not found');
        
        const blocks = await response.json();
        
        // Clear the skeleton loader
        mountPoint.innerHTML = '';
        
        // Render the blocks perfectly
        blocks.forEach(block => {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'mb-10 clearfix w-full';
            
            if (block.type === 'text') {
                blockDiv.innerHTML = `<div class="rich-text">${block.html}</div>`;
            } 
            else if (block.type === 'media-wrap') {
                // Apply the premium alignment logic exactly like the editor
                const alignmentClass = block.align === 'right' ? 'float-right ml-8 mb-4' : 'float-left mr-8 mb-4';
                
                const defaultImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600';
                const imgSrc = block.imageUrl && block.imageUrl !== '' ? block.imageUrl : defaultImg;

                blockDiv.innerHTML = `
                    <!-- AABB Aesthetic Wrapper -->
                    <div class="${alignmentClass} relative p-2.5 border border-oxford/15 rounded-2xl bg-oxford/5 group w-full max-w-[300px] sm:max-w-[350px]">
                        <div class="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-oxford/40 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
                        <div class="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-oxford/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div>
                        <div class="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-oxford/40 transition-transform group-hover:-translate-x-1 group-hover:translate-y-1"></div>
                        <div class="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-oxford/40 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                        
                        <img src="${imgSrc}" class="w-full h-auto object-cover rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.02]">
                    </div>
                    
                    <!-- The Text Wrapping Content -->
                    <div class="rich-text">${block.html}</div>
                `;
            }
            
            mountPoint.appendChild(blockDiv);
        });
        
    } catch (error) {
        console.warn("[Content] Visual layout fetch failed. Hiding section.", error);
        mountPoint.style.display = 'none';
    }
});
