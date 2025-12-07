// DOM Elements
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const musicToggle = document.getElementById('musicToggle');
        const petalsToggle = document.getElementById('petalsToggle');
        const newQuoteBtn = document.getElementById('newQuoteBtn');
        const mainPoetry = document.getElementById('mainPoetry');
        const mainTranslation = document.getElementById('mainTranslation');
        const bgMusic = document.getElementById('bgMusic');
        const petalsContainer = document.getElementById('petals');
        
        // State variables
        let isDarkMode = false;
        let isMusicPlaying = false;
        let petalsActive = true;
        let petalInterval;
        
        // Poetry database
        const urduQuotes = [
  "ہمیں اس کے دیدار کی خیرات کافی ہے فانیؔ<br>اس نے دیکھا، نہ دیکھا، جو مناسب سمجھا",
  "آج کی رات ہوا چلتا میں تمہارا ہوں<br>تم میرا دین بنو، دنیا بنو کل قائنات بنو",
  "ایک عُمر جو دل کے میرے مکین تھے جاناں<br>اب میری آنکھ بنو، کان بنو، ہاتھ بنو",
  "ہو کس طرح بیاں، تیری ستائش رعنائی<br>تیری محبت میں گرفتار شخص، تجھے لکھے بھی تو کیا لکھے",
  "حضور یہ جو مودتوں نوازشیں نھیں ہوئیں<br>حضور کچھ خطا جو ہے تو معاف کیجیے",
  "یوں تو ہے ہر رنگ میں تو قابل تعریف<br>سیاہ جوڑے میں مگر تو کمال لگتی ہے",
  "ہر شام کا انجام تیرا نام ہے جاناں<br>یاد کہاں آؤ جو کبھی بھولے ہی نھیں ہو",
  "لمحہ فِراق تک تھیں رخسار پہ نظریں مرکوز<br>دیدار یار سے آخر جی نھیں بھرتا کیا کیجئے",
  "کوئی دن ایسا نھیں کہ دید کی خواہش نہ ہو<br>کوئی دن ایسا نھیں کہ دید عطا کی جاۓ"
];

        
        const englishQuotes = [
  "The charity of seeing them is enough for us, Fani<br>Whether they saw or didn’t see, as they deemed appropriate",
  "Tonight, as the wind blows, I am yours<br>You become my faith, the world, the entire universe",
  "A lifetime spent as the inhabitants of my heart, beloved<br>Now become my eyes, ears, and hands",
  "How can I express, the praise of your radiance<br>The one captivated by your love, what could I even write to you?",
  "O presence, these acts of affection were not granted<br>O presence, if there is any fault, please forgive me",
  "Though you are admirable in every color<br>Even in black attire, you look exquisite",
  "Every evening ends with your name, beloved<br>Where do the memories come from that are never forgotten?",
  "Until the moment of separation, eyes were fixed on the face<br>The longing to see the beloved never seems to end",
  "There isn’t a single day without the desire to see<br>There isn’t a single day when the sight is not granted"
];

        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initFlowerAnimations();
            startPetalAnimation();
            initEventListeners();
            initSmoothScrolling();
            initPoetryHoverEffects();
        });
        
        // Initialize flower animations
        function initFlowerAnimations() {
            const flowers = document.querySelectorAll('.flower i');
            
            flowers.forEach((flower, index) => {
                // Random rotation speed between 10s and 30s
                const rotationSpeed = 10 + Math.random() * 20;
                flower.style.animation = `rotate ${rotationSpeed}s linear infinite`;
                
                // Add floating animation to some flowers
                if (index % 2 === 0) {
                    const floatSpeed = 3 + Math.random() * 4;
                    flower.parentElement.style.animation = `float ${floatSpeed}s ease-in-out infinite`;
                }
                
                // Randomize flower icons
                const flowerIcons = ['fa-spa', 'fa-leaf', 'fa-seedling', 'fa-feather-alt', 'fa-star', 'fa-heart'];
                const randomIcon = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
                flower.className = `fas ${randomIcon}`;
            });
        }
        
        // Create a falling petal
        function createPetal() {
            if (!petalsActive) return;
            
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Random position and properties
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.top = '-20px';
            
            // Random color (pink, white, or light pink)
            const colors = ['#f48fb1', '#fff', '#ffccd5', '#ffb6c1'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            petal.style.background = randomColor;
            
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;
            petal.style.opacity = 0.5 + Math.random() * 0.5;
            petal.style.width = `${10 + Math.random() * 20}px`;
            petal.style.height = petal.style.width;
            
            petalsContainer.appendChild(petal);
            
            // Animate falling
            const animation = petal.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: petal.style.opacity },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 5000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => petal.remove();
        }
        
        // Start petal animation
        function startPetalAnimation() {
            petalInterval = setInterval(createPetal, 300);
        }
        
        // Stop petal animation
        function stopPetalAnimation() {
            clearInterval(petalInterval);
            // Remove existing petals
            document.querySelectorAll('.petal').forEach(petal => petal.remove());
        }
        
        // Initialize event listeners
        function initEventListeners() {
            // Theme toggle
            themeToggle.addEventListener('click', function() {
                isDarkMode = !isDarkMode;
                body.classList.toggle('dark-mode', isDarkMode);
                
                // Update icon
                themeToggle.innerHTML = isDarkMode ? 
                    '<i class="fas fa-sun"></i>' : 
                    '<i class="fas fa-moon"></i>';
                
                // Update title
                themeToggle.title = isDarkMode ? 
                    'Switch to Light Mode' : 
                    'Switch to Dark Mode';
            });
            
            // Music toggle
            musicToggle.addEventListener('click', function() {
                isMusicPlaying = !isMusicPlaying;
                
                if (isMusicPlaying) {
                    bgMusic.play().catch(e => {
                        console.log("Autoplay prevented. User interaction required.");
                        isMusicPlaying = false;
                        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                        musicToggle.title = 'Play Music';
                    });
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.title = 'Pause Music';
                } else {
                    bgMusic.pause();
                    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                    musicToggle.title = 'Play Music';
                }
            });
            
            // Petals toggle
            petalsToggle.addEventListener('click', function() {
                petalsActive = !petalsActive;
                
                if (petalsActive) {
                    startPetalAnimation();
                    petalsToggle.innerHTML = '<i class="fas fa-feather-alt"></i>';
                    petalsToggle.title = 'Stop Petals';
                } else {
                    stopPetalAnimation();
                    petalsToggle.innerHTML = '<i class="fas fa-wind"></i>';
                    petalsToggle.title = 'Start Petals';
                }
            });
            
            // New quote button
            newQuoteBtn.addEventListener('click', function() {
                let randomIndex;
                let currentPoetry = mainPoetry.innerHTML.replace(/<br>/g, '\n');
                
                // Ensure we get a different quote
                do {
                    randomIndex = Math.floor(Math.random() * urduQuotes.length);
                } while (urduQuotes[randomIndex].replace(/<br>/g, '\n') === currentPoetry && urduQuotes.length > 1);
                
                // Update poetry with animation
                mainPoetry.style.animation = 'fadeIn 0.8s ease';
                mainTranslation.style.animation = 'fadeIn 0.8s ease';
                
                mainPoetry.innerHTML = urduQuotes[randomIndex];
                mainTranslation.innerHTML = englishTranslations[randomIndex];
                
                // Reset animation
                setTimeout(() => {
                    mainPoetry.style.animation = '';
                    mainTranslation.style.animation = '';
                }, 800);
            });
        }
        
        // Initialize smooth scrolling
        function initSmoothScrolling() {
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Highlight current section on scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('nav a');
                
                let currentSection = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
        
        // Initialize poetry hover effects
        function initPoetryHoverEffects() {
            const poetryElements = document.querySelectorAll('.urdu-poetry, .section-poetry, .chat-question');
            
            poetryElements.forEach(poetry => {
                poetry.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02)';
                    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
                
                poetry.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '';
                });
            });
        }
        
        // Auto-play music on first user interaction (for browsers that require it)
        document.addEventListener('click', function initMusic() {
            if (!isMusicPlaying) {
                // Try to play music gently
                bgMusic.volume = 0.3;
            }
            
            // Remove this listener after first interaction
            document.removeEventListener('click', initMusic);
        }, { once: true });