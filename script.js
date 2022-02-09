$(document).ready(function () {
  "use strict";

  // UTILITY
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // END UTILITY

  // COMMANDS
  function clear() {
    terminal.text("");
  }

  function help() {
    terminal.append(
      "clear              ==> clear terminal outpue\n" +
        "cv | resume        ==> open my resume website\n" +
        "call               ==> call to my phone (iran)\n" +
        "call-us            ==> call to my phone (United State)\n" +
        "email || gmail     ==> send an email to me\n" +
        "telegram           ==> my telegram contact\n" +
        "exit | close       ==> close page\n"
    );
  }

  function openTelegram() {
    window.open("https://t.me/MasoudHeidary");
  }

  function openGithub() {
    window.open("https://github.com/MasoudHeidary");
  }

  function openGmail() {
    window.open("mailto:MasoudHeidaryDeveloper@gmail.com");
  }

  function callUS() {
    window.open("tel:+14247818751");
  }

  function callIran() {
    window.open("tel:+989109958035");
  }

  function openCV() {
    window.open("https://MasoudHeidaryMH.ir");
  }

  function closePage() {
    window.close();
  }

  //   function echo(args) {
  //     var str = args.join(" ");
  //     terminal.append(str + "\n");
  //   }
  //
  //   function fortune() {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("GET", "https://cdn.rawgit.com/bmc/fortunes/master/fortunes", false);
  //     xhr.send(null);

  //     if (xhr.status === 200) {
  //       var fortunes = xhr.responseText.split("%");
  //       var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
  //       terminal.append(fortune + "\n");
  //     }
  //   }
  // END COMMANDS

  var title = $(".title");
  var terminal = $(".terminal");
  var prompt = "➜";
  var path = "~";

  var commandHistory = [];
  var historyIndex = 0;

  var command = "";
  var commands = [
    {
      name: "clear",
      function: clear,
    },
    {
      name: "help",
      function: help,
    },
    {
      name: "telegram",
      function: openTelegram,
    },
    {
      name: "github",
      function: openGithub,
    },
    {
      name: "gmail",
      function: openGmail,
    },
    {
      name: "email",
      function: openGmail,
    },
    {
      name: "call",
      function: callIran,
    },
    {
      name: "call-us",
      function: callUS,
    },
    {
      name: "cv",
      function: openCV,
    },
    {
      name: "resume",
      function: openCV,
    },
    {
      name: "exit",
      function: closePage,
    },
    {
      name: "close",
      function: closePage,
    },
    // {
    //   name: "fortune",
    //   function: fortune,
    // },
    // {
    //   name: "echo",
    //   function: echo,
    // },
  ];

  function processCommand() {
    var isValid = false;

    // Create args list by splitting the command
    // by space characters and then shift off the
    // actual command.

    var args = command.split(" ");
    var cmd = args[0];
    args.shift();

    // Iterate through the available commands to find a match.
    // Then call that command and pass in any arguments.
    for (var i = 0; i < commands.length; i++) {
      if (cmd === commands[i].name) {
        commands[i].function(args);
        isValid = true;
        break;
      }
    }

    // No match was found...
    if (!isValid) {
      terminal.append("zsh: command not found: " + command + "\n");
    }

    // Add to command history and clean up.
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    command = "";
  }

  function displayPrompt() {
    terminal.append('<span class="prompt">' + prompt + "</span> ");
    terminal.append('<span class="path">' + path + "</span> ");
  }

  // Delete n number of characters from the end of our output
  function erase(n) {
    command = command.slice(0, -n);
    terminal.html(terminal.html().slice(0, -n));
  }

  function clearCommand() {
    if (command.length > 0) {
      erase(command.length);
    }
  }

  function appendCommand(str) {
    terminal.append(str);
    command += str;
  }

  /*
//	Keypress doesn't catch special keys,
//	so we catch the backspace here and
//	prevent it from navigating to the previous
//	page. We also handle arrow keys for command history.
*/

  $(document).keydown(function (e) {
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // BACKSPACE
    if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (command !== "") {
        erase(1);
      }
    }

    // UP or DOWN
    if (keyCode === 38 || keyCode === 40) {
      // Move up or down the history
      if (keyCode === 38) {
        // UP
        historyIndex--;
        if (historyIndex < 0) {
          historyIndex++;
        }
      } else if (keyCode === 40) {
        // DOWN
        historyIndex++;
        if (historyIndex > commandHistory.length - 1) {
          historyIndex--;
        }
      }

      // Get command
      var cmd = commandHistory[historyIndex];
      if (cmd !== undefined) {
        clearCommand();
        appendCommand(cmd);
      }
    }
  });

  $(document).keypress(function (e) {
    // Make sure we get the right event
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // Which key was pressed?
    switch (keyCode) {
      // ENTER
      case 13: {
        terminal.append("\n");

        processCommand();
        displayPrompt();
        break;
      }
      default: {
        appendCommand(String.fromCharCode(keyCode));
      }
    }
  });

  resizeTerminal();

  // Set the window title
  title.text("Masoud Heidary - Please open Terminal in just Desktop|Laptop");

  // Get the date for our fake last-login
  var date = new Date().toString();
  date = date.substr(0, date.indexOf("GMT") - 1);

  // Display last-login and promt
  terminal.append("Last login: " + date + " on Masoud Heidary VPS\n");
  displayPrompt();

  // Display virtual keyboard in mobile
  $("#v-key").focus();
  $(".window").click(function () {
    console.log("focus");
    $("#v-key").focus();
  });

  $('#v-key').on('keydown',function (e) {
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // BACKSPACE
    if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (command !== "") {
        erase(1);
      }
    }

    // UP or DOWN
    if (keyCode === 38 || keyCode === 40) {
      // Move up or down the history
      if (keyCode === 38) {
        // UP
        historyIndex--;
        if (historyIndex < 0) {
          historyIndex++;
        }
      } else if (keyCode === 40) {
        // DOWN
        historyIndex++;
        if (historyIndex > commandHistory.length - 1) {
          historyIndex--;
        }
      }

      // Get command
      var cmd = commandHistory[historyIndex];
      if (cmd !== undefined) {
        clearCommand();
        appendCommand(cmd);
      }
    }
  });
});

// ==============================================================
// responsible terminal size base on screen size
function resizeTerminal() {
  $(".terminal").css("height", `${$(window).height() * 0.9}px`);
  $(".window").css("width", `${$(window).width() * 0.9}px`);
}
window.onresize = function () {
  resizeTerminal();
};
// ==============================================================
