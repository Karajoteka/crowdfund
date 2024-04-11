class pledgeWithNoReward extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <div class="checkbox-title-container">
          <div class="custom-checkbox"></div>
          <div class="title-container">
            <h3>Pledge with no reward</h3>
          </div>
        </div>
        <p>Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.</p>
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
          width: 100%;
          height: auto;
          background-color: white;
          margin: auto;
          margin-bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
          border: 2px solid rgba(169, 169, 169, 0.3);
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .checkbox-title-container {
          display: flex;
        }

        .custom-checkbox {
          width: 26px;
          height: 26px;
          border: 2px solid rgba(169, 169, 169, 0.3);
          border-radius: 50%;
          position: relative;
          top: 26px;
          cursor: pointer;
        }

        .custom-checkbox::after {
          content: "";
          width: 16px;
          height: 16px;
          background-color: var(--moderate-cyan);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          visibility: hidden;
        }

        .custom-checkbox.active::after {
          visibility: visible;
        }

        .title-container {
          margin-left: 20px;
          margin-top: 14px;
        }

        section p {
          color: var(--dark-grey);
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .active-border {
          border-color: var(--moderate-cyan);
        }

        @media (min-width: 675px) {
          .title-container {
            display: flex;
            margin-top: 10px;
          }

          .title-container h3:hover {
            cursor: pointer;
            color: var(--moderate-cyan);
          }

          section p {
            margin-left: 30px;
            margin-bottom: 30px;
            padding-right: 10px;
            
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
    const checkbox = this.shadowRoot.querySelector('.custom-checkbox');
    const section = this.shadowRoot.querySelector('section');
    checkbox.addEventListener('click', function() {
      this.classList.toggle('active');
      section.classList.toggle('active-border', this.classList.contains('active'));
    });
  }
}
customElements.define("pledge-with-no-reward", pledgeWithNoReward);