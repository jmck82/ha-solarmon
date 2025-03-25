class SolarMonCard extends HTMLElement {

    setConfig(config) {
      if (!config.daily_yield_entity || !config.total_yield_entity) {
        throw new Error("You need to define daily_yield_entity and total_yield_entity");
      }
      this.config = config;
  
      if (!this.content) {
        this.innerHTML = `
          <ha-card>
            <div class="card-content">
              <div>Daily Yield: <span id="daily"></span></div>
              <div>Total Yield: <span id="total"></span></div>
            </div>
          </ha-card>
        `;
        this.content = this.querySelector('.card-content');
        this.dailySpan = this.querySelector('#daily');
        this.totalSpan = this.querySelector('#total');
      }
    }
  
    set hass(hass) {
          this._hass = hass;
  
      const dailyState = hass.states[this.config.daily_yield_entity];
      const totalState = hass.states[this.config.total_yield_entity];
  
      this.dailySpan.textContent = dailyState ? dailyState.state + ' kWh' : 'Loading...';
      this.totalSpan.textContent = totalState ? totalState.state + ' kWh' : 'Loading...';
    }
  
      static getConfigSchema(){
          return [
              {name: "daily_yield_entity", type: "string"},
              {name: "total_yield_entity", type: "string"}
          ]
      }
  
    getCardSize() {
      return 2;
    }
  }
  
  customElements.define('solar-mon', SolarMonCard); //  IMPORTANT: Use 'solar-mon' here