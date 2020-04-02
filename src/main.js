import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import historyRouteManager from "@/utils/historyRouteManager";

Vue.config.productionTip = false;

function initHistoryManager() {
  let history = new historyRouteManager({ prefix: "__test_router__" });
  let initCount = history.get("count") * 1 || 0;
  history.set("/", initCount);
  history.addCount(initCount);

  let isPush = false;
  let isTouchStart = false;
  let endTime = Date.now();

  document.addEventListener("touchstart", () => {
    isTouchStart = true;
  });
  document.addEventListener("touchend", () => {
    isTouchStart = false;
    endTime = Date.now();
  });

  let methods = ["push", "go", "replace", "forward", "back"];

  methods.forEach(key => {
    let method = router[key].bind(router);
    router[key] = function(...args) {
      isPush = true;
      method.apply(null, args);
    };
  });

  router.beforeEach(function(to, from, next) {
    const toIndex = history.get(to.path);
    const fromIndex = history.get(from.path);
    let direction;

    if (toIndex) {
      if (
        !fromIndex ||
        parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
        (toIndex === "0" && fromIndex === "0")
      ) {
        direction = "forward";
      } else {
        direction = "reverse";
      }
    } else {
      history.addCount();
      history.set("count");
      to.path !== "/" && history.set(to.path);
      direction = "forward";
    }

    // 判断是否是ios左滑返回 或者 右滑前进
    if (
      toIndex &&
      toIndex !== "0" &&
      !isPush &&
      (Date.now() - endTime < 377 || isTouchStart)
    ) {
      store.commit("updateDirection", { direction: "" });
    } else {
      store.commit("updateDirection", { direction: direction });
    }
    isTouchStart = false;

    next();
  });

  router.afterEach(function() {
    isPush = false;
  });
}

initHistoryManager();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
