import fs from "fs";
import path from "path";
import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js";
import fileAppender from "./appenders/file.js";

const appenders = {
  [constants.appender.CONSOLE]: consoleAppender,
  [constants.appender.FILE]: fileAppender,
  [undefined]: consoleAppender,
};

function getAppender() {
  return appenders[config.appender];
}

export { getAppender };

function formatDefaultMessage(date, level, category, message) {
  return `Data: ${date}, level: ${level}, category: ${category}, message: ${message}`;
}

function formatJsonMessage(date, level, category, message) {
  return JSON.stringify({ date, level, category, message });
}

async function log(date, level, category, ...messages) {
  const formattedMessage =
    config.format === "json"
      ? formatJsonMessage(date, level, category, messages.join(" "))
      : formatDefaultMessage(date, level, category, messages.join(" "));

  const appender = getAppender();
  if (appender) {
    await appender.log(formattedMessage);
  } else {
    console.error("Invalid appender configured");
  }
}

export default log;
