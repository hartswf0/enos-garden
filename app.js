// Eno's Garden - JavaScript

class EnosGarden {
    constructor() {
        this.audioContext = null;
        this.audioEnabled = false;
        this.oscillators = [];
        this.gainNodes = [];
        this.seeds = [];
        this.connections = [];
        this.selectedSeed = null;
        this.particleCanvas = null;
        this.particleCtx = null;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupElements();
        this.setupAudio();
        this.setupParticles();
        this.setupEventListeners();
        this.startAnimation();
    }

    loadData() {
        // Seed data from the provided JSON
        this.seedData = [
            {
                "id": "ambient-form",
                "title": "Ambient Form",
                "type": "form",
                "definition": "Non-teleological music as environment",
                "quote": "there's no narrative quality to the music. It just sort of starts, stays pretty much in one place and then ends.",
                "position": {"x": 15, "y": 25}
            },
            {
                "id": "generative-music",
                "title": "Generative Music", 
                "type": "process",
                "definition": "Systems/conditions that create evolving outcomes",
                "quote": "A lot of his work on creating generative systems that make music…",
                "position": {"x": 75, "y": 30}
            },
            {
                "id": "studio-as-instrument",
                "title": "Studio-as-Instrument",
                "type": "method", 
                "definition": "Treat recording/conditions as composition",
                "quote": "It shifts the artistic act into the creation of the conditions.",
                "position": {"x": 45, "y": 15}
            },
            {
                "id": "windchime-logic",
                "title": "Windchime Logic",
                "type": "exemplar",
                "definition": "Simple generative machine: fixed pitches, stochastic timing",
                "quote": "a windchime is basically a simple piece of generative music.",
                "position": {"x": 80, "y": 60}
            },
            {
                "id": "listener-co-composer", 
                "title": "Listener Co-Composer",
                "type": "role",
                "definition": "Perception completes the piece",
                "quote": "the composer isn't just Steve Reich. It's Steve Reich and my brain…",
                "position": {"x": 20, "y": 70}
            },
            {
                "id": "attention-ecology",
                "title": "Attention Ecology",
                "type": "concept", 
                "definition": "Art tunes/redirects attention and feeling",
                "quote": "music is maybe something you… use to change the way you pay attention to everything else.",
                "position": {"x": 55, "y": 45}
            },
            {
                "id": "music-for-airports",
                "title": "Music for Airports (Continuum)",
                "type": "artifact",
                "definition": "Ambient as boundary-less continuum for public space",
                "quote": "it mustn't keep stopping and starting… it should be a sort of continuum…",
                "position": {"x": 25, "y": 50}
            },
            {
                "id": "infrastructure-endlessness",
                "title": "Infrastructure of Endlessness", 
                "type": "condition",
                "definition": "Works/feeds that continue without natural endings",
                "quote": "You start the piece, but it finishes itself. It carries on finishing itself for the rest of time.",
                "position": {"x": 65, "y": 75}
            },
            {
                "id": "tyranny-plausibility",
                "title": "Tyranny of Plausibility (Preset Gravity)",
                "type": "failure",
                "definition": "Polished sameness; plausible but dead",
                "quote": "the premature sheen… everything looked amazing at first… but it didn't help us make good buildings.",
                "position": {"x": 40, "y": 80}
            },
            {
                "id": "munge",
                "title": "Munge",
                "type": "failure texture",
                "definition": "Over-digested average, frequency-weighted dullness", 
                "quote": "the color of munchge covers all of it… the first thing you make… 'that's pretty amazing'… and then… 'I'm so bored.'",
                "position": {"x": 10, "y": 40}
            },
            {
                "id": "senius",
                "title": "Senius",
                "type": "ecology",
                "definition": "Scene-level intelligence/support systems",
                "quote": "I came up with this word senius… it's an ecosystem.", 
                "position": {"x": 85, "y": 20}
            },
            {
                "id": "control-problem",
                "title": "Control Problem",
                "type": "governance",
                "definition": "Who steers generative infrastructures",
                "quote": "mine are not owned by mad billionaires… the single most important question is who should be in control of it?",
                "position": {"x": 70, "y": 10}
            },
            {
                "id": "engagement-objective",
                "title": "Engagement Objective",
                "type": "objective function", 
                "definition": "Profit-maximizing recommender logic",
                "quote": "the big mistake was when the the algorithm became maximize engagement…",
                "position": {"x": 90, "y": 45}
            },
            {
                "id": "brakes-friction",
                "title": "Brakes/Friction",
                "type": "damper",
                "definition": "Intentional slowdowns to permit correction",
                "quote": "we haven't put any brakes in it… brakes slow down the profits.",
                "position": {"x": 30, "y": 90}
            },
            {
                "id": "commons-dividend", 
                "title": "Commons Dividend",
                "type": "redistribution",
                "definition": "Share returns from models trained on the social corpus",
                "quote": "it wouldn't be a bad idea if… 50% of… the profits… immediately go back to society…",
                "position": {"x": 60, "y": 85}
            },
            {
                "id": "error-as-intention",
                "title": "Error as Intention",
                "type": "tactic",
                "definition": "Use faults/limits to surface surprise", 
                "quote": "the machine… isn't quite working… It's defective in some way.",
                "position": {"x": 50, "y": 65}
            }
        ];

        this.connectionData = [
            {"from": "studio-as-instrument", "to": "generative-music", "label": "enables"},
            {"from": "windchime-logic", "to": "generative-music", "label": "models"},
            {"from": "ambient-form", "to": "attention-ecology", "label": "reconfigures"},
            {"from": "listener-co-composer", "to": "music-for-airports", "label": "completes"},
            {"from": "infrastructure-endlessness", "to": "brakes-friction", "label": "requires"},
            {"from": "tyranny-plausibility", "to": "error-as-intention", "label": "counteracted by"},
            {"from": "engagement-objective", "to": "commons-dividend", "label": "rebalanced by"},
            {"from": "munge", "to": "tyranny-plausibility", "label": "produced by"},
            {"from": "senius", "to": "commons-dividend", "label": "supported by"},
            {"from": "control-problem", "to": "engagement-objective", "label": "exemplified by"}
        ];
    }

    setupElements() {
        const seedsContainer = document.querySelector('.seeds-container');
        const connectionsSvg = document.querySelector('.connections-svg');
        
        // Create seeds
        this.seedData.forEach(seedData => {
            const seedElement = this.createSeedElement(seedData);
            seedsContainer.appendChild(seedElement);
            this.seeds.push({
                element: seedElement,
                data: seedData,
                originalX: seedData.position.x,
                originalY: seedData.position.y,
                offsetX: 0,
                offsetY: 0
            });
        });

        // Position seeds
        this.positionSeeds();

        // Create connections
        this.createConnections();
    }

    createSeedElement(seedData) {
        const seed = document.createElement('div');
        seed.className = `seed seed--${seedData.type.replace(/\s+/g, '-')}`;
        seed.setAttribute('data-seed-id', seedData.id);
        seed.setAttribute('tabindex', '0');
        seed.setAttribute('role', 'button');
        seed.setAttribute('aria-label', `${seedData.title}: ${seedData.definition}`);
        
        // Create abbreviated title for display
        const displayText = this.abbreviateTitle(seedData.title);
        seed.textContent = displayText;
        
        return seed;
    }

    abbreviateTitle(title) {
        // Create shortened version for display in seed
        const words = title.split(' ');
        if (words.length === 1) return words[0].substring(0, 8);
        return words.map(word => word[0]).join('').substring(0, 4);
    }

    positionSeeds() {
        const container = document.querySelector('.seeds-container');
        const containerRect = container.getBoundingClientRect();
        
        this.seeds.forEach(seed => {
            const x = (seed.originalX / 100) * containerRect.width;
            const y = (seed.originalY / 100) * containerRect.height;
            
            seed.element.style.left = `${x}px`;
            seed.element.style.top = `${y}px`;
        });
    }

    createConnections() {
        const svg = document.querySelector('.connections-svg');
        
        this.connectionData.forEach(conn => {
            const fromSeed = this.seeds.find(s => s.data.id === conn.from);
            const toSeed = this.seeds.find(s => s.data.id === conn.to);
            
            if (fromSeed && toSeed) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.classList.add('connection-line');
                line.setAttribute('data-from', conn.from);
                line.setAttribute('data-to', conn.to);
                line.setAttribute('data-label', conn.label);
                svg.appendChild(line);
                
                this.connections.push({
                    element: line,
                    from: fromSeed,
                    to: toSeed,
                    label: conn.label
                });
            }
        });
        
        this.updateConnectionPositions();
    }

    updateConnectionPositions() {
        this.connections.forEach(conn => {
            const fromRect = conn.from.element.getBoundingClientRect();
            const toRect = conn.to.element.getBoundingClientRect();
            const containerRect = document.querySelector('.seeds-container').getBoundingClientRect();
            
            const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
            const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
            const toX = toRect.left + toRect.width / 2 - containerRect.left;
            const toY = toRect.top + toRect.height / 2 - containerRect.top;
            
            conn.element.setAttribute('x1', fromX);
            conn.element.setAttribute('y1', fromY);
            conn.element.setAttribute('x2', toX);
            conn.element.setAttribute('y2', toY);
        });
    }

    setupAudio() {
        // Initialize Audio Context on user gesture
        const audioToggle = document.getElementById('audioToggle');
        const audioIcon = document.getElementById('audioIcon');
        
        audioToggle.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.createAmbientSounds();
            }
            
            if (this.audioEnabled) {
                this.stopAmbientSounds();
                audioIcon.textContent = '🔇';
                this.audioEnabled = false;
            } else {
                this.startAmbientSounds();
                audioIcon.textContent = '🔊';
                this.audioEnabled = true;
            }
        });
    }

    createAmbientSounds() {
        // Create multiple oscillators for ambient texture
        const frequencies = [220, 330, 440, 660, 880]; // Eno-inspired frequencies
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            
            this.oscillators.push(oscillator);
            this.gainNodes.push(gainNode);
        });
        
        // Create subtle frequency modulation
        this.modulateFrequencies();
    }

    startAmbientSounds() {
        this.gainNodes.forEach((gainNode, index) => {
            const volume = 0.05 + (index * 0.01); // Very quiet, layered volumes
            gainNode.gain.setTargetAtTime(volume, this.audioContext.currentTime, 2);
        });
    }

    stopAmbientSounds() {
        this.gainNodes.forEach(gainNode => {
            gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime, 1);
        });
    }

    modulateFrequencies() {
        if (!this.audioEnabled) return;
        
        // Subtle frequency modulation every few seconds
        setTimeout(() => {
            this.oscillators.forEach((osc, index) => {
                const baseFreq = [220, 330, 440, 660, 880][index];
                const modulation = Math.sin(Date.now() / 10000) * 5; // Very subtle modulation
                osc.frequency.setTargetAtTime(baseFreq + modulation, this.audioContext.currentTime, 3);
            });
            
            if (this.audioEnabled) {
                this.modulateFrequencies();
            }
        }, 3000 + Math.random() * 4000); // Random interval 3-7 seconds
    }

    setupParticles() {
        this.particleCanvas = document.querySelector('.particles-canvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
        
        this.resizeCanvas();
        this.createParticles();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.particleCanvas.width,
                y: Math.random() * this.particleCanvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    setupEventListeners() {
        // Seed interactions
        this.seeds.forEach(seed => {
            seed.element.addEventListener('click', () => this.showSeedDetail(seed.data));
            seed.element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showSeedDetail(seed.data);
                }
            });
            
            // Show connections on hover
            seed.element.addEventListener('mouseenter', () => this.showConnections(seed.data.id));
            seed.element.addEventListener('mouseleave', () => this.hideConnections());
        });

        // Detail overlay close
        document.getElementById('overlay').addEventListener('click', () => this.closeSeedDetail());
        document.querySelector('.seed-detail__close').addEventListener('click', () => this.closeSeedDetail());
        
        // Window resize
        window.addEventListener('resize', () => {
            this.positionSeeds();
            this.updateConnectionPositions();
        });
        
        // Escape key to close detail
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSeedDetail();
            }
        });
    }

    showConnections(seedId) {
        this.connections.forEach(conn => {
            if (conn.from.data.id === seedId || conn.to.data.id === seedId) {
                conn.element.classList.add('visible');
            }
        });
    }

    hideConnections() {
        this.connections.forEach(conn => {
            conn.element.classList.remove('visible');
        });
    }

    showSeedDetail(seedData) {
        const detail = document.getElementById('seedDetail');
        const overlay = document.getElementById('overlay');
        
        // Populate detail content
        detail.querySelector('.seed-detail__title').textContent = seedData.title;
        detail.querySelector('.seed-detail__type').textContent = seedData.type;
        detail.querySelector('.seed-detail__definition').textContent = seedData.definition;
        detail.querySelector('.seed-detail__quote-text').textContent = seedData.quote;
        
        // Find connections
        const connections = this.connectionData.filter(conn => 
            conn.from === seedData.id || conn.to === seedData.id
        );
        
        const connectionsList = detail.querySelector('.connection-list');
        connectionsList.innerHTML = '';
        
        connections.forEach(conn => {
            const li = document.createElement('li');
            const otherSeedId = conn.from === seedData.id ? conn.to : conn.from;
            const otherSeed = this.seedData.find(s => s.id === otherSeedId);
            const relationship = conn.from === seedData.id ? conn.label : `is ${conn.label} by`;
            
            // Make connection clickable
            li.innerHTML = `${relationship} <button class="connection-link" data-seed-id="${otherSeedId}">${otherSeed.title}</button>`;
            li.style.cursor = 'pointer';
            
            // Add click event to connection button
            const connectionButton = li.querySelector('.connection-link');
            connectionButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetSeedData = this.seedData.find(s => s.id === otherSeedId);
                this.showSeedDetail(targetSeedData);
            });
            
            connectionsList.appendChild(li);
        });
        
        // Show detail
        overlay.classList.remove('hidden');
        detail.classList.remove('hidden');
        
        // Focus management
        detail.querySelector('.seed-detail__close').focus();
        
        // Play interaction sound
        if (this.audioEnabled && this.audioContext) {
            this.playInteractionSound();
        }
    }

    closeSeedDetail() {
        const detail = document.getElementById('seedDetail');
        const overlay = document.getElementById('overlay');
        
        overlay.classList.add('hidden');
        detail.classList.add('hidden');
    }

    playInteractionSound() {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(880, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
    }

    startAnimation() {
        const animate = () => {
            this.updateParticles();
            this.updateSeedPositions();
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    updateParticles() {
        const ctx = this.particleCtx;
        ctx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.particleCanvas.width;
            if (particle.x > this.particleCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.particleCanvas.height;
            if (particle.y > this.particleCanvas.height) particle.y = 0;
            
            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#32b8cd';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    updateSeedPositions() {
        const time = Date.now() * 0.001;
        
        this.seeds.forEach((seed, index) => {
            // Very subtle floating movement
            const floatX = Math.sin(time * 0.3 + index) * 2;
            const floatY = Math.cos(time * 0.2 + index) * 1.5;
            
            seed.offsetX = floatX;
            seed.offsetY = floatY;
            
            const container = document.querySelector('.seeds-container');
            const containerRect = container.getBoundingClientRect();
            const x = (seed.originalX / 100) * containerRect.width + floatX;
            const y = (seed.originalY / 100) * containerRect.height + floatY;
            
            seed.element.style.transform = `translate(${floatX}px, ${floatY}px)`;
        });
        
        // Update connection positions occasionally
        if (Math.floor(time * 10) % 30 === 0) {
            this.updateConnectionPositions();
        }
    }
}

// Initialize the garden when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enosGarden = new EnosGarden();
});