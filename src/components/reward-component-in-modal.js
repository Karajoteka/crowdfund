class rewardComponentInModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode:"open" })
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
        this.pledgeAmount = newVal.replace(/\D/g,'');
        const pledgeInput = this.shadowRoot.querySelector('#pledge-input');
        if (pledgeInput) {
          pledgeInput.value = `$${this.pledgeAmount}`;
        }
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
    template.innerHTML = `
      <section id="reward-component-in-modal" class="${sectionClass}" data-reward-id="${this.rewardId}">
        <div class="checkbox-title-container">
          <div class="custom-checkbox"></div>
          <div class="title-container">
            <h3>${this.title}</h3>
            <h3 class="pledge">${this.pledge}</h3>
          </div>
        </div>
        <p>${this.description}</p>
        <p id="rewards-left">${this.rewards}<span>left</span></p>
        
        <hr>
        <div class="dropdown">
          <p class="enter">Enter your pledge</p>
          <div class="buttons-container">
            <div class="input-container">
              <input id="amount-input" type="number" min="0" value="${this.pledgeAmount}"></input>
              <span class="dollar-sign">$</span>
            </div>
            <button class="continue-button">Continue</button>
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
          margin-top: 10px;
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
          margin-left: 30px;
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
          font-size: 1.4rem;
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
          top: -2px;
          margin-left: 8px;
        }

        .dropdown {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }

        hr {
          visibility: hidden;
          height: 0;
          overflow: hidden;
          width: calc(100% + 40px);
          height: 2px;
          margin-left: -20px;
          margin-right: -20px;
          background-color: var(--light-grey);
          opacity: 0.2;
        }

        .enter {
          text-align: center;
          margin-top: 30px;
        }

        .buttons-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .buttons-container > * {
          margin: 0;
        }

        .input-container {
          position: relative;
          display: inline-block;
        }

        #amount-input {
          width: 70px;
          height: 50px;
          border: 2px solid rgba(169, 169, 169, 0.3);
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          font-weight: bold;
          font-size: 1rem;
          padding-left: 24px;
        }

        .dollar-sign {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--light-grey);
          font-size: 1rem;
          font-weight: bold;
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

          .no-rewards h3:hover, .no-rewards .pledge:hover {
            color: inherit;
          }

          .no-rewards .pledge:hover {
            color: var(--moderate-cyan);
          }

          .no-rewards, .no-rewards * {
            cursor: default !important;
          }

          .title-container .pledge {
            margin-top: 25px;
            margin-left: 20px;
          }

          #rewards-left {
            position: relative;
            top: -132px;
            left: 400px;
          }

          section p {
            margin-bottom: -10px;
            margin-left: 30px;
            padding-right: 10px;
          }

          .dropdown {
            display: flex;
            align-items: center;
          }

          .enter {
            width: auto;
            white-space: nowrap;
            margin-bottom: 34px;
          }

          .buttons-container #amount-input {
            position: relative;
            width: 114px;
            margin-left: 120px;
            margin-top: 14px;
          }

          .buttons-container #amount-input:hover {
            cursor: pointer;
          }

          .input-container {
            margin-left: -50px;
          }

          .input-container .dollar-sign {
            position: absolute;
            left: 146px;
            bottom: 22px;
          }

          .buttons-container button {
            width: 114px;
            margin-top: 14px;
          }

          .buttons-container button:hover {
            cursor: pointer;
            background-color: var(--dark-cyan);
          }
        }
      </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const section = this.shadowRoot.querySelector('section');
    if (this.rewards === '0') {
      section.classList.add('no-rewards');
    } else {
      section.classList.remove('no-rewards');
    }
  }
  connectedCallback() {
    this.render();
    const checkbox = this.shadowRoot.querySelector('.custom-checkbox');
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    const hr = this.shadowRoot.querySelector('hr');
    const section = this.shadowRoot.querySelector('section');
    const amountInput = this.shadowRoot.querySelector('#amount-input');

    checkbox.addEventListener('click', (event) => {
      if (this.rewards === '0') {
        event.preventDefault();
      } else {
        checkbox.classList.toggle('active');
        const isActive = checkbox.classList.contains('active');
        dropdown.style.visibility = isActive ? 'visible' : 'hidden';
        dropdown.style.height = isActive ? 'auto' : '0';
        hr.style.visibility = isActive ? 'visible' : 'hidden';
        hr.style.height = isActive ? 'auto' : '0';
        section.classList.toggle('active-border', isActive);

        this.dispatchEvent(new CustomEvent('checkbox-clicked', {
          detail: { checkbox: checkbox },
          bubbles: true,
          composed: true
        }));
      }
    });

    amountInput.addEventListener('input', () => {
      if (amountInput.value < 0) {
        amountInput.value = 0;
      }
    });

    const continueButton = this.shadowRoot.querySelector('.continue-button');
    continueButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('continue-button-clicked', {
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define("reward-component-in-modal", rewardComponentInModal);