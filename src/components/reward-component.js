class rewardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["title", "pledge", "description", "rewards"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }
    if (attr === "title" && oldVal !== newVal) {
      this.title = newVal;
    }
    if (attr === "pledge") {
        this.pledge = newVal;
    }
    if (attr === "description") {
        this.description = newVal;
    }
    if (attr === "rewards") {
      this.rewards = newVal;
    }
  }
  getTemplate() {
    const template = document.createElement("template");
    const sectionClass = this.rewards === '0' ? 'no-rewards' : '';
    const buttonClass = this.rewards === '0' ? 'button-no-rewards' : '';
    const buttonText = this.rewards === '0' ? 'Out of Stock' : 'Select Reward';
    template.innerHTML = `
      <section class="${sectionClass}">
        <div class="title-container">
          <h3>${this.title}</h3>
          <h3 class="pledge">${this.pledge}</h3>
        </div>
        <p>${this.description}</p>
        <div class="button-container">
          <p id="rewards-left">${this.rewards}<span>left</span></p>
          <button id="select-reward" class="${buttonClass}" data-reward-id="${this.reward}">${buttonText}</button>
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

        section .pledge {
          position: relative;
          top: -10px;
          color: var(--moderate-cyan);
        }

        section p {
          color: var(--dark-grey);
          line-height: 1.8;
        }

        #rewards-left {
          position: relative;
          top: -20px;
          font-size: 2rem;
          font-weight: bold;
          color: var(--black);
          vertical-align: middle;
        }

        #rewards-left span {
          font-size: 1rem;
          font-weight: 400;
          vertical-align: middle;
          color: var(--dark-grey);
          position: relative;
          top: -4px;
          margin-left: 8px;
        }

        button {
          all: unset;
          width: 160px;
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
          margin-bottom: 20px;
          margin-top: -36px;
        }

        .no-rewards {
          opacity: 0.4;
        }

        .button-no-rewards {
          background-color: var(--dark-grey);
        }

        @media (min-width: 675px) {
          .title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .title-container .pledge {
            margin-top: 28px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: -20px;
          }

          .button-container button {
            margin-top: 18px;
          }

          .button-container button:hover {
            cursor: pointer;
            background-color: var(--dark-cyan);
          }

          .no-rewards button:hover, .no-rewards:hover button {
            cursor: default;
            background-color: var(--dark-grey);
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
    const selectRewardButtons = this.shadowRoot.querySelectorAll('#select-reward');
  
    selectRewardButtons.forEach((selectRewardButton, index) => {
      selectRewardButton.addEventListener('click', (event) => {
        if (selectRewardButton.textContent !== 'Out of Stock') {
          const backProject = document.querySelector('back-project');
          const backProjectModal = backProject.shadowRoot.querySelector('#back-project-modal');
          backProjectModal.style.display = 'block';
          
          const rewardId = this.getAttribute('data-reward-id');
          const rewardComponentsInModal = backProject.shadowRoot.querySelectorAll(`reward-component-in-modal[data-reward-id="${rewardId}"]`);
          const checkboxInModal = rewardComponentsInModal[index].shadowRoot.querySelector('.custom-checkbox');
          checkboxInModal.click();

          const projectDescriptionComponent = document.querySelector('project-description');
          const backButton = projectDescriptionComponent.shadowRoot.querySelector('.back-button');
          backButton.click();
        }
      });
    });
  }
}
customElements.define("reward-component", rewardComponent);