// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Project Section: Dynamic Loading & Filtering ---
    const projectsData = [
        {
            id: 1,
            title: 'E-commerce Store',
            description: 'A full-stack e-commerce application with user authentication and payment gateway integration.',
            image: 'https://via.placeholder.com/300x200?text=E-commerce',
            link: '#', // To Replace with actual project link
            category: 'web'
        },
        {
            id: 2,
            title: 'Mobile Recipe App',
            description: 'A native mobile application for discovering and managing recipes, built with React Native.',
            image: 'https://via.placeholder.com/300x200?text=Recipe+App',
            link: '#',// To Replace with actual project link
            category: 'mobile'
        },
        {
            id: 3,
            title: 'Portfolio Website V1',
            description: 'The first iteration of my personal portfolio, showcasing my early web development skills.',
            image: 'https://via.placeholder.com/300x200?text=Portfolio+V1',
            link: '#',// To Replace with actual project link
            category: 'web'
        },
        {
            id: 4,
            title: 'Fitness Tracker',
            description: 'A web-based fitness tracker allowing users to log workouts and track progress.',
            image: 'https://via.placeholder.com/300x200?text=Fitness+Tracker',
            link: '#',
            category: 'web'
        }
        // Add more projects here
    ];

    const projectsContainer = document.getElementById('projects-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function displayProjects(filter = 'all') {
        projectsContainer.innerHTML = ''; // Clear existing projects

        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter(project => project.category === filter);

        if (filteredProjects.length === 0) {
            projectsContainer.innerHTML = '<p>No projects found for this category.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.setAttribute('data-category', project.category);

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // Initial display of all projects
    displayProjects();

    // Add event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            displayProjects(filter);
        });
    });

    // --- 2. About Me Section: "Read More" Toggle ---
    const toggleBioButton = document.getElementById('toggle-bio');
    const moreBioContent = document.getElementById('more-bio');

    if (toggleBioButton && moreBioContent) {
        toggleBioButton.addEventListener('click', () => {
            moreBioContent.classList.toggle('hidden');
            if (moreBioContent.classList.contains('hidden')) {
                toggleBioButton.textContent = 'Read More';
            } else {
                toggleBioButton.textContent = 'Read Less';
            }
        });
    }

    // --- 3. Contact Form: Client-Side Validation ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formStatus.textContent = '';
        formStatus.classList.remove('success-message', 'error-message');

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        }

        if (isValid) {
            // In a real application, you would send this data to a server
            // using fetch() or XMLHttpRequest.
            console.log('Form Submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            formStatus.textContent = 'Message sent successfully!';
            formStatus.classList.add('success-message');
            contactForm.reset(); // Clear the form
        } else {
            formStatus.textContent = 'Please correct the errors in the form.';
            formStatus.classList.add('error-message');
        }
    });


    // --- 4. Navigation: Smooth Scrolling & Active States ---
    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Adjusted for padding/header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Optional: Set initial active link if page loads at a specific scroll position
    const initialSection = sections[0].getAttribute('id');
    document.querySelector(`#main-nav a[href="#${initialSection}"]`).classList.add('active');


    // --- 5. Skills Section: Optional Interactive Effect (e.g., hover to emphasize) ---
    // The progress bars are primarily CSS, but you could add JS to dynamically change widths
    // based on fetched data, or add more complex hover effects.
    // For this example, the width is set inline in HTML for simplicity.
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // Example: Could make the progress bar "grow" or add a shadow
            item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        item.addEventListener('mouseout', () => {
            item.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });

}); // End of DOMContentLoaded