class backProject extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ['project'];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'project') {
      this.project = newVal;
    }
  } 
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section id="back-project-modal">
        <div class="title-container">
          <h2>Back this project</h2>
          <img id="close-modal-icon" src="/images/icon-close-modal.svg" alt="Close modal">
        </div>
        <p>Want to support us in bringing ${this.project} out in the world?</p>
        <pledge-with-no-reward></pledge-with-no-reward>
        <reward-component-in-modal
          title="Bamboo Stand"
          pledge="Pledge $25 or more"
          description="You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
          rewards="101"
          data-reward-id="1"
        ></reward-component-in-modal>
        <reward-component-in-modal
          title="Black Edition Stand"
          pledge="Pledge $75 or more"
          description="You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
          rewards="64"
          data-reward-id="2"
        ></reward-component-in-modal>
        <reward-component-in-modal
          title="Mahogamy Special Edition"
          pledge="Pledge $200 or more"
          description="You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
          rewards="0"
          data-reward-id="3"
        ></reward-component-in-modal>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }
  getStyles() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');

        #back-project-modal {
          display: none;
          position: fixed;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -36%);
          z-index: 50;
          max-height: 90vh;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          width: 86%;
          height: auto;
          background-color: white;
          padding: 0 20px;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
          text-align: left;
        }

        #back-project-modal::-webkit-scrollbar {
          display: none;
        }

        .title-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .title-container h2 {
          font-size: 1.2rem;
          margin-top: 30px;
        }

        .title-container img {
          height: 16px;
          margin-top: 36px;
        }

        section p {
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--dark-grey);
          margin-bottom: 34px;
        }

        @media (min-width: 675px) {
          #back-project-modal {
            max-width: 600px;
            padding: 0 30px;
          }

          .title-container img:hover {
            cursor: pointer;
            content: url("/images/icon-close-modal-black.svg");
            width: 17px;
            height: 17px;
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
customElements.define("back-project", backProject);