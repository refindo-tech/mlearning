'use client'
import { useEffect } from 'react';

const Comments = ({idmapel, stasiun, idmateri }) => {
    useEffect(() => {
        // Function to load Disqus
        if (idmapel && stasiun && idmateri) {
            const loadDisqus = () => {
                window.disqus_config = function () {
                    // this.page.url = `${window.location.origin}${window.location.pathname}?stasiun=${stasiun}`;  // Tambahkan query string
                    this.page.url = window.location.href
                    // this.page.identifier = `${idmapel}/${stasiun}`;  // Gunakan kombinasi idmapel dan stasiun sebagai identifier
                    this.page.identifier = `identifier-${idmapel}-${stasiun}-${idmateri}`
                };
                // Check if Disqus is already loaded
                if (window.DISQUS) {
                    // Reset Disqus if it's already loaded
                    window.DISQUS.reset({
                        reload: true,
                        config: window.disqus_config,
                    });
                } else {
                    // If not loaded, dynamically insert Disqus script
                    const d = document, s = d.createElement('script');
                    s.src = 'https://mlearning-1.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                }
            };
            loadDisqus(); // Load Disqus when component mounts or `idmapel` / `stasiun` changes;
        }
    }, [idmapel, stasiun, idmateri]); // Only re-run the effect if `idmapel` or `stasiun` changes
    return (
        <>
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        </>
    );
};

export default Comments;
