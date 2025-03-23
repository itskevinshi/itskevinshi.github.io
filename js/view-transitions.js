document.addEventListener('DOMContentLoaded', () => {
    // Skip if View Transitions API is not supported
    if (!document.startViewTransition) {
      console.log('View Transitions API not supported');
      return;
    }
  
    // Configuration for pixelated transitions
    const config = {
      type: 'outIn',
      flipped: false,
      cells: 9,
    };
  
    // Add CSS for pixelated transitions
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --speed: 0.3125s;
        --ms: calc(1vmax * var(--size));
        --mi: ${new Array(Math.pow(config.cells, 2))
          .fill('linear-gradient(#fff 0 0)')
          .join(',')};
        --size: ${Math.ceil(100 / config.cells)};
      }
      
      ::view-transition {
        /* Removing the colorful backgrounds that cause the flash */
        background: transparent;
      }
      
      ::view-transition-old(root),
      ::view-transition-new(root) {
        mask-image: var(--mi);
        mask-repeat: no-repeat;
        mask-size: calc(var(--ms) + 1px) calc(var(--ms) + 1px);
        mask-position: var(--mp, -100% -100%);
      }
      
      [data-transition='outIn']::view-transition-old(root) {
        animation: maskOut var(--speed) ease forwards reverse;
      }
      
      [data-transition='outIn']::view-transition-new(root) {
        animation: maskIn var(--speed) calc(var(--speed) * 1.25) ease forwards;
      }
      
      [data-transition='out']::view-transition-old(root) {
        animation: maskOut var(--speed) ease forwards reverse;
        z-index: 2;
      }
      
      [data-transition='out']::view-transition-new(root) {
        animation: none;
        mask: none;
        opacity: 1;
      }
      
      @keyframes maskIn {
        0% { --mp: var(--initial-positions); }
        100% { --mp: var(--final-positions); }
      }
      
      @keyframes maskOut {
        0% { --mp: var(--initial-positions); }
        100% { --mp: var(--final-positions); }
      }
    `;
    document.head.appendChild(style);
  
    // Helper functions for pixelated transitions
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
  
    const getPositions = (frame, pos) => {
      const slices = [];
      for (let i = 0; i < config.cells; i++) {
        if (i < frame) {
          slices.push(pos.slice(i * config.cells, (i + 1) * config.cells));
        } else {
          slices.push(pos.slice(frame * config.cells, (frame + 1) * config.cells));
        }
      }
      return slices.join(',');
    };
  
    const generatePositions = () => {
      const positions = [];
      const mid = Math.ceil(config.cells * 0.5);
  
      for (let p = 0; p < Math.pow(config.cells, 2); p++) {
        const x = p % config.cells;
        const y = Math.floor(p / config.cells);
        const xm = x + 1 - mid;
        const ym = y + 1 - mid;
        positions.push(
          `calc(50% + (var(--ms) * ${xm})) calc(50% + (var(--ms) * ${ym}))`
        );
      }
      return positions;
    };
  
    const getFrames = (positions) => {
      let frames = '';
      const shuffled = shuffleArray([...positions]);
      for (let f = 1; f < config.cells; f++) {
        const sineFrame = Math.floor(
          Math.sin((f / config.cells) * (Math.PI / 2)) * 100
        );
        frames += `${sineFrame}% {
          --mp: ${getPositions(f, shuffled)};
        }`;
      }
      frames += `100% { --mp: ${positions.join(',')}; }`;
      return frames;
    };
  
    // Generate keyframes for transitions
    const generateKeyframes = () => {
      const positions = generatePositions();
      const maskInFrames = getFrames(positions);
      const maskOutFrames = getFrames(positions);
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes maskIn {${maskInFrames}}
        @keyframes maskOut {${maskOutFrames}}
      `;
      document.head.appendChild(styleSheet);
      
      // Set initial and final positions as CSS variables
      document.documentElement.style.setProperty('--initial-positions', positions.join(','));
      document.documentElement.style.setProperty('--final-positions', positions.join(','));
    };
  
    // Generate keyframes on load
    generateKeyframes();
    document.documentElement.dataset.transition = config.type;
  
    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      
      // Skip if not a link or external link or has target attribute
      if (!link || link.target || link.hostname !== window.location.hostname) return;
      
      e.preventDefault();
      
      // Navigate to the new page with view transitions
      navigateTo(link.href);
    });
    
    // Track page-specific elements and scripts
    let currentPageScripts = [];
    
    async function navigateTo(url) {
      // Regenerate keyframes for each transition
      generateKeyframes();
      
      // Start the view transition
      const transition = document.startViewTransition(async () => {
        // Fetch the new page
        const response = await fetch(url);
        const html = await response.text();
        
        // Parse the HTML
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');
        
        // Update the parts of the page you want to transition
        document.title = newDocument.title;
        
        // Clean up elements from previous page
        // 1. Remove oneko cat elements
        document.querySelectorAll('#oneko').forEach(el => el.remove());
        
        // 2. Remove any scripts we previously added
        currentPageScripts.forEach(script => {
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
        currentPageScripts = [];
        
        // Reset script flags to ensure they can be reinitialized
        window.streakCounterInitialized = false;
        
        // Clean up any animation frames from progress-bar.js
        if (window.progressBarAnimationFrame) {
          cancelAnimationFrame(window.progressBarAnimationFrame);
          window.progressBarAnimationFrame = null;
        }
        
        // Update the main content
        document.querySelector('main').innerHTML = newDocument.querySelector('main').innerHTML;
        
        // Determine which page we're navigating to
        const isRandomPage = url.includes('/random/');
        
        // Execute inline scripts from the main content
        document.querySelector('main').querySelectorAll('script:not([src])').forEach(script => {
          eval(script.textContent);
        });
        
        // Process page-specific scripts
        if (isRandomPage) {
          // Extract script paths from the original document
          const originalScripts = newDocument.querySelectorAll('script[src]');
          const scriptPaths = Array.from(originalScripts)
            .map(script => script.getAttribute('src'))
            .filter(src => 
              src && (
                src.includes('progress-bar.js') || 
                src.includes('streak-counter.js') || 
                src.includes('oneko.js')
              )
            );
          
          // Load each script with its original path
          const loadedScripts = [];
          
          scriptPaths.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            
            // Track when progress-bar.js is loaded
            if (src.includes('progress-bar.js')) {
              script.onload = function() {
                // Initialize progress bar if the function exists and elements are present
                if (typeof updateProgressBar === 'function' && 
                    document.getElementById("progress-bar") && 
                    document.getElementById("percentage")) {
                  // Set year elements
                  const recapYearElement = document.getElementById("recap-year");
                  const currentYearElement = document.getElementById("current-year");
                  
                  if (recapYearElement) recapYearElement.textContent = new Date().getFullYear() - 1;
                  if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
                  
                  // Start the progress bar
                  updateProgressBar();
                }
              };
            }
            
            document.body.appendChild(script);
            currentPageScripts.push(script);
            loadedScripts.push(script);
          });
        }
        
        // Update the URL
        window.history.pushState({}, '', url);
      });
      
      // Wait for the transition to complete
      await transition.finished;
    }
  });