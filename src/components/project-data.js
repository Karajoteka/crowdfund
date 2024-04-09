class productData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["backed", "backers", "days", "max"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "backed") {
      this.backed = Number(newVal.replace(/[^0-9.-]+/g,""));
    }
    if (attr === "backers" && oldVal !== newVal) {
        this.backers = newVal;
    }
    if (attr === "days") {
        this.days = newVal;
    }
    if (attr === "max") {
      this.max = newVal;
    }
  }
  formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <div class="data-container">
          <div class="backed-container">
            <h2 id="backed">$${this.formatNumberWithCommas(this.backed)}</h2>
            <p>of $${this.formatNumberWithCommas(this.max)} backed</p>
          </div>
          <!-- <hr> -->
          <div class="backers-container">
            <h2 id="backers">${this.backers}</h2>
            <p>total backers</p>
          </div>
          <!-- <hr> -->
          <div class="days-container">
            <h2 id="days">${this.days}</h2>
            <p>days left</p>
          </div>
        </div>
        
        <div id="progress-bar" role="progressbar" aria-valuenow="${this.backed}" aria-valuemin="0" aria-valuemax="${this.max}">
          <div id="progress-bar-fill"></div>
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
          top: -26px;
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
          text-align: center;
        }

        .data-container div {
          width: 150px;
        }

        .data-container div:not(:last-child)::after {
          content: "";
          display: block;
          height: 0.5px;
          width: 50%;
          background-color: var(--dark-grey);
          margin: auto;
        }

        section div h2 {
          font-size: 2rem;
        }

        section div p {
          position: relative;
          top: -24px;
          font-size: 0.8rem;
          color: var(--dark-grey);
        }

        #progress-bar {
          margin: 16px 0 36px;
          width: 100%;
          height: 10px;
          background-color: rgb(249,250,251);
          border-radius: 20px;
        }

        #progress-bar-fill {
          height: 100%;
          background-color: var(--moderate-cyan);
          width: 0;
          border-radius: 20px;
        }

        @media (min-width: 675px) {
          section {
            max-width: 600px;
            text-align: left;
          }

          .data-container {
            display: flex;
          }

          .data-container div:nth-child(2),
          .data-container div:nth-child(3) {
              margin-left: 40px;
          }

          .data-container div:not(:last-child)::after {
            content: "";
            display: block;
            width: 0.5px;
            height: 60%;
            background-color: var(--dark-grey);
            margin-left: 150px;
            position: relative;
            top: -106px;
          }

          #progress-bar {
            margin-top: 0;
          }
      </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.updateProgressBar();
  }
  updateProgressBar() {
    if (this.backed && this.max) {
      const progressBarFill = this.shadowRoot.querySelector('#progress-bar-fill');
      progressBarFill.style.width = `${this.getProgress()}%`;
    }
  }
  getProgress() {
    return (this.backed / this.max) * 100;
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("product-data", productData);