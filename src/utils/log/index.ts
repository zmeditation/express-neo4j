import { createLogger, format, transports } from "winston";

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

export const log = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        ignorePrivate(),
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf((info) => {
          const { timestamp, level, message } = info;
          return `[${level}] ${timestamp} ${message}`;
        })
      ),
    }),
  ],
});
