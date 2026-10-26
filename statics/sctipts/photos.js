document.addEventListener('DOMContentLoaded', () => {
  // 1. 背景の星空キャンバス描画
  const canvas = document.getElementById('stars-canvas');
  if (canvas) {
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
  }

  // 2. カテゴリタブによる写真フィルタリング機能
  const tabButtons = document.querySelectorAll('.tab-btn');
  const picContainers = document.querySelectorAll('.pic-container');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // すべてのタブから active クラスを削除し、クリックされたものに付与
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      picContainers.forEach(container => {
        const containerCategory = container.getAttribute('data-category');

        if (selectedCategory === 'all' || containerCategory === selectedCategory) {
          container.classList.remove('hide');
        } else {
          container.classList.add('hide');
        }
      });
    });
  });

  // 3. モバイルメニューのトグル
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});
