tailwind.config = { theme: { extend: { colors: {
  body: 'var(--body)', 
  card: 'var(--card)', 
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
}}}}


$(document).ready(function() {
  lucide.createIcons();
  AOS.init({ once: true, duration: 400 });

  renderPortfolioItems();
  initPortfolioFilter();
  renderTestimonials();
});


// ========= Hero Section =========

// Particle background effect
$(function() {

  const colors = [ 
    '#FF4500', '#FFA500', '#B22222', 
];

  for (let i = 0; i < 80; i++) {
    const size = Math.random() * 5;
    const $particle = $('<div>', {
      class: "particle",
      css: {
        width: `${size}px`,
        height: `${size}px`,
        background: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }
    }).appendTo($('#particles'));
    
    animateParticle($particle[0]);
  }

  function animateParticle(particle) {
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const moveX = (Math.random() - 0.5) * 100;
    const moveY = (Math.random() - 0.5) * 100;
    
    particle.animate([
      { opacity: 0, offset: 0, transform: 'translate(0, 0) scale(0.5)' },
      { opacity: 1, offset: 0.5, transform: `translate(${moveX}px, ${moveY}px) scale(1.2)` },
      { opacity: 0, offset: 1, transform: `translate(${moveX * 2}px, ${moveY * 2}px) scale(0.5)` }
    ], {
      delay: delay * 1000,
      iterations: Infinity,
      duration: duration * 1000
    });
  }
});

// Navigation Section =========
$(function() {
  const $mobileNav = $('#mobile-nav');
  const $navLinks = $('.nav-link');
  
  // Open mobile menu
  $('#mobile-menu-btn').on('click', function() {
    $mobileNav.css('height', '100vh');
    $navLinks.each(function(index) {
      $(this).delay(100 + (index * 100)).queue(function() {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        }).dequeue();
      });
    });

    if ($mobileNav.css('height') != '0px') {
      $navLinks.css({
        'opacity': '0',
        'transform': 'translateY(8px)'
      });
      
      $mobileNav.css('height', '0');
    }
  });
  
  // Close menu when clicking on a link
  $navLinks.on('click', function() {
      $('#mobile-menu-btn').click();
  });
});

// ========= Portfolio Section =========

// portfolioData is imported from data.js

const categories = [...new Set(portfolioData.map(i => i.category))];
$("#filter-buttons").append(
  `<button class="filter-btn glass-card hover:bg-white/10 bg-gradient" data-filter="all">All Projects</button>` +
  categories.map((cat,i)=>
    `<button class="filter-btn glass-card hover:bg-white/10" data-filter="${cat}">${cat}</button>`
  ).join("")
);

function renderPortfolioItems(filter = 'all') {
  const filteredProjects = filter === 'all' ? portfolioData : portfolioData.filter(project => project.category === filter);
  
  $('#portfolio-grid').html(filteredProjects.map((project, i) => (`
    <a href="/project.html?id=${project.id}" class="relative rounded-xl overflow-hidden group transform-gpu hover:-rotate-1 hover:-rotate-y-3 hover:scale-105 duration-500" data-category="${project.category}">
      <!-- Project Image -->
      <img src="${project.image || "./src/defulte.png"}" alt="${project.title}" class="w-full h-64 object-cover duration-500">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 duration-500 flex flex-col justify-end p-4">
        <h3 class="text-lg font-bold text-white">${project.title}</h3>
        <p class="text-gray-200 text-sm line-clamp-2">${project.description}</p>
      </div>
    </a>
  `)).join(''))
} 

function initPortfolioFilter() {
  $('.filter-btn').on('click', function() {
    $(this).addClass('bg-gradient').siblings().removeClass('bg-gradient');
    const filter = $(this).data('filter');
    renderPortfolioItems(filter);
  });
} initPortfolioFilter();


// ========= Testimonials Section =========

const testimonials = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        position: "MediCare Dental",
        content: "Abdel transformed our online presence completely. The new website and branding have significantly increased our patient bookings. His understanding of the healthcare industry is exceptional.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        position: "TechCorp Solutions",
        content: "Working with Abdel was a game-changer for our software platform. His design expertise improved our user engagement metrics by 40%. Highly recommended for any business looking to enhance their digital products.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 5
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        position: "Family Dental Care",
        content: "Abdel's patient portal design is intuitive and user-friendly. Our staff and patients love the new system. It has streamlined our appointment process significantly.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4
    }
];

function renderTestimonials() {
    $('#testimonials-container').html(testimonials.map((testimonial, i) => (`
        <li class="${i > 0 && 'hidden'}">
          <div class="glass-card p-8 rounded-xl">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 rounded-full bg-gradient flex items-center justify-center mr-4">
                  <i data-lucide="user" class="w-8 h-8 text-white"></i>
                </div>
                <div>
                  <h4 class="text-xl font-bold">${testimonial.name}</h4>
                  <p class="text-secondary">${testimonial.position}</p>
                </div>
              </div>
              <p class="text-gray-400 mb-6">
                ${testimonial.content}
              </p>
              <div class="flex text-secondary">
                ${Array.from({ length: testimonial.rating }).map(() => `<i data-lucide="star" class="size-5 fill-current"></i>`).join('')}
              </div>
          </div>
      </li>
    `)).join(''));
    
    let i = 0;
    setInterval(() => {
      $('#testimonials-container li').eq(i).removeClass('hidden').siblings().addClass('hidden');
      i = (i + 1) % testimonials.length;
    }, 3000);

  lucide.createIcons();
} 


// ========== Contact Section ==========

$("#contact-form").on("submit", function(e) {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();

    // إنشاء mailto
    let mailtoLink = `mailto:${$('#email-link').text()}?subject=Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
    window.location.href = mailtoLink;
    
    // مسح الفورم
    $(this).trigger("reset");
  });

