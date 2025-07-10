import chalk from 'chalk';

/**
 * Format date for logging
 * @param {Date} date
 * @returns {string}
 */
function formatTime(date = new Date()) {
    return date.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

/**
 * Lola logging functions.
 *
 */
export default class Logging {
    static async log(message) {
        console.log(`[${chalk.gray(formatTime())}] ${message}`);
    }

    static async logError(subject, message) {
        this.log(`${chalk.red(subject)}: ${message}`);
    }

    static async logEvent(stackName, action, event) {
        /* eslint-disable max-len */
        console.log(
            `[${chalk.gray(formatTime(new Date(event.Timestamp)))}] ${action} ${chalk.cyan(stackName)}: ${
                event.ResourceType
            } - ${chalk.yellow(event.LogicalResourceId)} ${chalk.green(event.ResourceStatus)} ${
                event.ResourceStatusReason || ''
            }`,
        );
        /* eslint-enable max-len */
    }

    static async logOk(subject, message, indent = false) {
        if (indent) {
            const result = `${chalk.green(subject)}: ${message}`;
            this.log(result.replace(/\n\r?/g, '\n\t'));
        } else {
            this.log(`${chalk.green(subject)}: ${message}`);
        }
    }

    static async logIfVerbose(message, verbose) {
        if (verbose) {
            this.log(message);
        }
    }
}
