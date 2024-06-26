
function log(date, level, category, message){
    console.log(formatMessage(date, level, category, message));
}

function formatMessage(date, level, category, message) {
  return `Data: ${date}, level: ${level}, category: ${category} message: ${JSON.stringify(
    message
  )}`;
}

export default {log};
