import fs from "fs";
import path from "path";

async function log(message) {
  const filename = `app_${getFormattedDate()}.csv`;
  const logPath = path.join(__dirname, "logs", filename);

  try {
    const exists = await fs.promises
      .access(logPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      const header = "date,level,category,message\n";
      await fs.promises.writeFile(logPath, header);
    }

    await fs.promises.appendFile(logPath, message + "\n");
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
}

function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${day}_${month}_${year}`;
}

export { log };
