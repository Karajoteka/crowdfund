class projectDescription extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
            <img class="marker" src="./images/icon-bookmark.svg" alt="Bookmark button">
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
          height: 50px;
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
          height: 50px;
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
          }
        }
      </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('project-description', projectDescription);