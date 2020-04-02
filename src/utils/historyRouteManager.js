const sessionStorage = window.sessionStorage;

class historyRouteManager {
  constructor(options = {}) {
    this.prefix = options.prefix || "__router__";
    this.count = options.initCount || 1;
  }
  addCount(num = 1) {
    this.count += num;
  }
  minusCount(num = 1) {
    this.count -= num;
  }
  resetCount() {
    this.count = 0;
  }
  set(key, value) {
    sessionStorage.setItem(this.prefix + key, value || this.count);
  }
  get(key) {
    return sessionStorage.getItem(this.prefix + key) * 1 || 0;
  }
  remove(key) {
    sessionStorage.removeItem(this.prefix + key);
  }
  clearHistoryRoute() {
    Object.keys(sessionStorage, v => {
      if (v.indexOf(this.prefix) !== -1) {
        this.remove(v);
      }
    });
  }
}

export default historyRouteManager;
