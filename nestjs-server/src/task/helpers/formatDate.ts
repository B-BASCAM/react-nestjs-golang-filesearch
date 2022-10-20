import { padTo2Digits } from "./padToTwoDigits";

/**
 * @returns {string=} (dd.mm.yyyy hh:mm:ss)
 */
export const formatDate = (date: Date): string => {

    return (
        [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
};

