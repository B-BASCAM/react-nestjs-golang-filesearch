export const padTo2Digits = (num: number): string => {

    return num.toString().padStart(2, '0');
};