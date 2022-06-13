// grab elements from DOM 
var container = $(".container")
var jumbotronEl = $(".jumbotron")

// create data array
var timeFrames = [
  {
    time: "9AM",
    moment: "09:00 am",
    todo: "",
    id: 9
  },
  {
    time: "10AM",
    moment: "10:00 am",
    todo: "",
    id: 10
  },
  {
    time: "11AM",
    moment: "11:00 am",
    todo: "",
    id: 11
  },
  {
    time: "12PM",
    moment: "12:00 pm",
    todo: "",
    id: 12
  },
  {
    time: "1PM",
    moment: "01:00 pm",
    todo: "",
    id: 13
  },
  {
    time: "2PM",
    moment: "02:00 pm",
    todo: "",
    id: 14
  },
  {
    time: "3PM",
    moment: "03:00 pm",
    todo: "",
    id: 15,
  },
  {
    time: "4PM",
    moment: "04:00 pm",
    todo: "",
    id: 16
  },
  {
    time: "5PM",
    moment: "05:00 pm",
    todo: "",
    id: 17
  }
];


// create function that displays current time
function displayCurrentDat() {
  var today = moment(); f
  $("#currentDay").text(today.format("[Today is] dddd, MMM Do, YYYY"));
}

//  Create fucntion that applies css for different time
function applyTimeClass(time) {
  var currentHour = moment().format("HH")
  if (time > currentHour) {
    return "future";
  } else if (time < currentHour) {
    return "past";
  } else {
    return "present";
  }
}

// create a function that loops though array and creates a list of timeframes
function createTable() {
  // create container for time
  var orderedList = $("<article>").attr("class", "timeframe")
  for (let i = 0; i < timeFrames.length; i++) {
    // grab values from local storage
    var storedTodo = localStorage.getItem(timeFrames[i].time) || ""

    // create elements of each hour
    var eachDiv = $("<div>").attr("class", "timediv").addClass(applyTimeClass(timeFrames[i].id));
    var eachHour = $('<span>').attr("class", "time");
    var eachTodo = $('<textarea>').attr("class", "todo").attr("data-time", timeFrames[i].time).val(storedTodo);
    var saveButton = $("<button>").attr("class", "btn btn-success btn-custom").text("Save!");

    // append elements to DOM
    eachHour.text(timeFrames[i].time);
    eachDiv.append(eachHour, eachTodo, saveButton)
    orderedList.append(eachDiv)

    // function that saves current data to locals storage
    saveButton.on("click", function (event) {
      var textAreaValue = $("[data-time='" + timeFrames[i].time + "']").val()

      if (textAreaValue === "") {
        localStorage.removeItem(timeFrames[i].time)
      }

      localStorage.setItem(timeFrames[i].time, textAreaValue)
    })
  }
  container.append(orderedList);
}

// create init function to start
function init() {
  console.log("started")
  createTable()
  displayCurrentDat()
}

// call init function
init();