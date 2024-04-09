class menuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section id="menu">
        <ul>
          <li><a href="#">About</a></li>
          <hr>
          <li><a href="#">Discover</a></li>
          <hr>
          <li><a href="#">Get Started</a></li>
        </ul>
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
          display: none;
          position: relative;
          top: 40px;
          width: 86%;
          background-color: white;
          margin: 0 auto;
          border-radius: 8px;
          z-index: 1;
        }

        ul {
          list-style: none;
          width: 100%;
          padding: 0px;
          margin: 0;
          text-align: start;
          font-size: 1rem;
          font-weight: 500;
        }

        li {
          padding: 16px;
        }

        li a {
          text-decoration: none;
          color: black;
        }

        hr {
          opacity: 20%;
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
customElements.define("menu-component", menuComponent);