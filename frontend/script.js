const BACKEND_URL = 'http://localhost:5000';

async function loadPortfolio() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/portfolio`);
    const data = await res.json();
    console.log('Data loaded:', data);

    document.getElementById('hero-name').textContent = data.name || '';
    document.getElementById('hero-title').textContent = data.title || '';
    document.getElementById('hero-bio').textContent = data.bio || '';
    document.getElementById('about-text').textContent = data.about || '';
    if (data.photo) document.getElementById('profile-photo').src = data.photo;

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
      skillsContainer.innerHTML += `
        <div class="skill-card">
          <div class="skill-icon">${skill.icon}</div>
          <h4>${skill.name}</h4>
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width:${skill.level}%"></div>
          </div>
        </div>`;
    });

    // Projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    data.projects.forEach(project => {
      const techs = project.tech.map(t => `<span>${t}</span>`).join('');
      projectsContainer.innerHTML += `
        <div class="project-card">
          <span class="project-tag">Data Science</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-stack">${techs}</div>
        </div>`;
    });

    // Education
    const eduContainer = document.getElementById('education-container');
    eduContainer.innerHTML = '';
    data.education.forEach(edu => {
      eduContainer.innerHTML += `
        <div class="education-card">
          <div class="edu-year">${edu.year}</div>
          <h3>${edu.degree}</h3>
          <p>${edu.institution}</p>
        </div>`;
    });

    // Contact
    const contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = `
      <div class="contact-card">
        <i class="fas fa-envelope"></i>
        <h4>Email</h4>
        <p>${data.contact.email}</p>
      </div>
      <div class="contact-card">
        <i class="fas fa-phone"></i>
        <h4>Phone</h4>
        <p>${data.contact.phone}</p>
      </div>
      <div class="contact-card">
        <i class="fas fa-map-marker-alt"></i>
        <h4>Location</h4>
        <p>${data.contact.location}</p>
      </div>`;

  } catch (err) {
    console.error('FETCH ERROR:', err);
  }
}

loadPortfolio();