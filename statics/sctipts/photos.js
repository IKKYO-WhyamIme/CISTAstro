    // 1. 背景の星空キャンバス描画
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 150;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }
      });
      requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    resizeCanvas();
    initStars();
    drawStars();

    // 2. スクロール監視による順番フェードインアニメーション (Intersection Observer API)
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -150px 0px', // 画面下部から150px手前で発火
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 画面内に入ったら 'is-visible' クラスを付与してCSSアニメーションを発火
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    galleryItems.forEach(item => {
      observer.observe(item);
    });

    // 3. モバイルメニューのトグル
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
