export const router = {};
const dailyLogUrl = "./dailyLog.json";
const monthlyLogUrl = "./monthlyLog.json";
const futureLogUrl = "./futureLog.json";
const dailyLog = document.getElementById("dailyLogDiv");
const monthlyLog = document.getElementById("monthlyLogDiv");
const futureLog = document.getElementById("futureLogDiv");

let dailyLogLoaded = false;
// const main = document.querySelector('main');
router.setState = function () {
  if (location.hash === "#/dailyLog") {
    if (!dailyLogLoaded) {
      router.loadDailyLog(true, false);
      dailyLogLoaded = true;
    }
    router.setDailyLogHome();
    return;
  }
  if (location.hash.substring(0, 10) === "#/dailyLog") {
    if (!dailyLogLoaded) {
      router.loadDailyLog(true, true);
      dailyLogLoaded = true;
    } else {
      router.setDay();
    }
    return;
  }
  if (location.hash === "#/monthlyLog") {
    dailyLogLoaded = false;
    router.loadDailyLog(false, false);
    router.setMonthlyLog();
    return;
  }
  if (location.hash === "#/futureLog") {
    dailyLogLoaded = false;
    router.loadDailyLog(false, false);
    router.setFutureLog();
    return;
  }

  if (location.hash === "#" || location.hash === "#/" || location.hash === "") {
    location.hash = "#/dailyLog";
    return;
  }
  router.setError();
};

router.loadDailyLog = function (render, setDay) {
  const sideBar = document.createElement("side-bar");
  sideBar.classList.add("col-2", "h-100", "position-fixed");
  const nav = document.body.querySelector("nav");
  nav.innerHTML = "";
  nav.appendChild(sideBar);
  document.body.className = "dailyLog";
  dailyLog.innerHTML = "";
  fetch(dailyLogUrl)
    .then((response) => response.json())
    .then((days) => {
      window.days = days;
      sideBar.content = days;
      if (render) router.renderDailyLog(days, setDay);
      if (render && setDay) router.setDay();
    });
};

router.renderDailyLog = function (days) {
  days.forEach((day) => {
    const newDay = document.createElement("section");
    newDay.tabIndex = 0;
    newDay.id = "/dailyLog/" + day.date;
    newDay.classList.add("card", "w-50", "mx-auto", "my-3", "border-3");
    const date = new Date(day.date);
    const dateTitle = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
    const dateFont = "font-family: 'Satisfy', cursive; color: #2C5684;";
    newDay.innerHTML =
      '<div class="card-body"><h2 class="card-title text-center"><time datetime="' +
      day.date +
      '" style="' +
      dateFont +
      '">' +
      dateTitle +
      "</time></h2></div>";
    dailyLog.appendChild(newDay);
    const entries = document.createElement("log-entries");
    entries.parentId = newDay.id;
    entries.editable = day.editable;
    entries.entries = day.entries;
    newDay.querySelector(".card-body").appendChild(entries);
    newDay.addEventListener("focus", (event) => {
      location.hash = newDay.id;
      newDay.classList.add("focused");
    });
    newDay.addEventListener("blur", (event) => {
      newDay.classList.remove("focused");
    });
  });
};

router.setDailyLogHome = function () {
  window.scrollTo(0, 0);
  document.activeElement.blur();
};

router.setDay = function () {
  const day = document.getElementById(location.hash.substring(1));
  if (!day) {
    location.hash = "#/dailyLog";
    return;
  }
  if (document.activeElement !== day) {
    day.focus();
    day.classList.add("focus");
  }
};

router.setMonthlyLog = function () {
  document.body.className = "monthlyLog";
  monthlyLog.innerHTML = "";
  fetch(monthlyLogUrl)
    .then((response) => response.json())
    .then((months) => {
      window.months = months;
      const monthElem = document.createElement("monthly-log");
      console.dir(monthElem);
      monthElem.content = months[0];
      monthlyLog.appendChild(monthElem);
    });
};

router.setFutureLog = function () {
  document.body.className = "futureLog";
  futureLog.innerHTML = "";
  let counter = 0;
  fetch(futureLogUrl)
    .then((response) => response.json())
    .then((futureMonths) => {
      window.futureMonths = futureMonths;
      futureMonths.forEach((month) => {
        if (counter < 6) {
          const futureElem = document.createElement("future-logs");
          futureElem.content = month;
          futureLog.append(futureElem);
          counter++;
        }
      });
    });
};

router.setError = function () {
  document.body.className = "error";
};
