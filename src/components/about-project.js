class aboutProject extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["description"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "description") {
      this.description = newVal;
    }
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <h2>About this project</h2>
        <p>${this.description}</p>
        <reward-component
          title="Bamboo Stand"
          pledge="Pledge $25 or more"
          description="You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
          rewards="101"
          data-reward-id="1"
        ></reward-component>
        <reward-component
          title="Black Edition Stand"
          pledge="Pledge $75 or more"
          description="You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
          rewards="64"
          data-reward-id="2"
        ></reward-component>
        <reward-component
          title="Mahogamy Special Edition"
          pledge="Pledge $200 or more"
          description="You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
          rewards="0"
          data-reward-id="3"
        ></reward-component>
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
          top: -16;
          width: 86%;
          height: auto;
          background-color: white;
          margin: auto;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
          text-align: left;
        }

        section h2 {
          align-self: flex-start;
          font-size: 1.2rem;
          margin-top: 30px;
        }

        section p {
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--dark-grey);
          margin-bottom: 34px;
        }

        @media (min-width: 675px) {
          section {
            max-width: 600px;
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
customElements.define("about-project", aboutProject);