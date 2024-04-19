class thanksMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section class="thanks-message-container">
        <img src="./images/icon-check.svg" alt="Icon check">
        <h2>Thanks for your support!</h2>
        <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <button class="finish-button">Got it!</button>
      </section>
      ${this.getStyles()};
    `;
    return template;
  }
  getStyles() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');

        .thanks-message-container {
          position: relative;
          top: -1700px;
          transform: none;
          width: 86%;
          max-width: 500px;
          background-color: white;
          margin: 0 auto;
          left: 0;
          right: 0;
          border-radius: 8px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          display: none;
        }

        img {
          width: 50px;
          margin-top: 30px;
        }

        h2 {
          margin-top: 20px;
          font-size: 1rem;
        }

        p {
          padding: 20px;
          font-size: 0.8rem;
          text-align: center;
          color: var(--dark-grey);
        }

        .finish-button {
          all: unset;
          width: 100px;
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
          margin-bottom: 30px;
        }

        @media (min-width: 675px) {
          .thanks-message-container {
            max-width: 500px;
          }

          h2 {
            margin-top: 30px;
            margin-bottom: -30px;
          }

          p {
            padding: 40px;
            margin-bottom: -10px;
          }

          .finish-button:hover {
            cursor: pointer;
            background-color: var(--dark-cyan);
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
customElements.define("thanks-message", thanksMessage);