class projectDescription extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.clicked = false;
    this.bookmarked = false;
  }
  static get observedAttributes() {
    return ["logo", "title", "description"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "logo") {
      this.logo = newVal;
    }
    if (attr === "title" && oldVal !== newVal) {
        this.title = newVal;
    }
    if (attr === "description") {
        this.description = newVal;
    }
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <img class="description-logo" src="${this.logo}">
        <h1>${this.title}</h1>
        <p>${this.description}</p>
        <div class="description-buttons">
          <button class="back-button">Back this project</button>
          <div class="bookmark-container">
            <svg class="marker" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <circle fill="#2F2F2F" cx="28" cy="28" r="28"/>
                <path fill="#B1B1B1" d="M23 19v18l5-5.058L33 37V19z"/>
              </g>
            </svg>
            <div class="bookmark-button">Bookmark</div>
          </div>
        </div>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }
  getStyles() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');
        
        section {
          position: relative;
          top: -50px;
          width: 86%;
          height: auto;
          background-color: white;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 30px;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        }

        .description-logo {
          position: relative;
          top: -24px;
          width: 50px;
        }

        h1 {
          position: relative;
          top: -20px;
          text-align: center;
          line-height: 1.2;
          font-size: 1.4rem;
        }

        p {
          position: relative;
          top: -30px;
          text-align: center;
          line-height: 1.8;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--dark-grey);
        }

        .description-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: -20px;
          margin-bottom: 30px;
        }

        .back-button {
          all: unset;
          width: 200px;
          height: 56px;
          font-family: 'Commissioner', sans-serif;
          background-color: var(--moderate-cyan);
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          margin-right: 10px;
        }

        .description-buttons img {
          height: 50px;
        }

        .bookmark-container .bookmark-button {
          display: none;
        }

        @media (min-width: 675px) {
          section {
            max-width: 600px;
          }

          .back-button:hover {
            cursor: pointer;
            background-color: var(--dark-cyan);
          }

          .bookmark-container {
            display: flex;
          }

          .bookmark-container .bookmark-button {
          display: flex;
          justify-content: end;
          align-items: center;
          padding-right: 30px;
          width: 140px;
          height: 56px;
          border-radius: 50px;
          background-color: var(--light-grey);
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          cursor: pointer;
          }

          .marker {
            position: relative;
            right: -50px;
            cursor: pointer;
          }
        }
      </style>
    `;
  }
  toggleStyles(circle, path, bookmarkButton, state) {
    const marker = this.shadowRoot.querySelector('.marker');
    if (!state) {
      circle.setAttribute('fill', 'hsl(176, 72%, 28%)');
      path.setAttribute('fill', '#FFFFFF');
      bookmarkButton.style.backgroundColor = '#F9FAFB';
      bookmarkButton.style.color = 'var(--dark-cyan)';
      bookmarkButton.textContent = 'Bookmarked';
      marker.style.right = '-35px';
      return true;
    } else {
      circle.setAttribute('fill', '#2F2F2F');
      path.setAttribute('fill', '#B1B1B1');
      bookmarkButton.style.backgroundColor = 'var(--light-grey)';
      bookmarkButton.style.color = 'white';
      bookmarkButton.textContent = 'Bookmark';
      marker.style.right = '-50px';
      return false;
    }
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    const marker = this.shadowRoot.querySelector('.marker');
    const circle = marker.querySelector('circle');
    const path = marker.querySelector('path');
    const bookmarkButton = this.shadowRoot.querySelector('.bookmark-button');

    marker.addEventListener('click', () => {
      this.clicked = this.toggleStyles(circle, path, bookmarkButton, this.clicked);
    });

    bookmarkButton.addEventListener('click', () => {
      this.bookmarked = this.toggleStyles(circle, path, bookmarkButton, this.bookmarked);
    });
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('project-description', projectDescription);