import { format, formatDistanceStrict, formatDistanceToNow, isThisYear } from 'date-fns'

export function formatPostDate(date) {
    // MARCH 23 (if it's current year)
    const formatShort = format(new Date(date), 'MMMM d').toUpperCase();
    // FEBRUARY 2, 2019 (if it's not current year)
    const formatLong = format(new Date(date), 'MMMM d, yyy').toUpperCase();

    return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNowShort(date) {
    // 5 days ago-> -> '5 days' -> ['5', 'days'] -> ['5', 'd'] -> '5d'
    // 7 weeks ago -> 7w
    // 3 months ago -> 3m
    return formatDistanceStrict(new Date(date), new Date(Date.now()))
        .split(' ')
        .map((s, i) => i === 1 ? s[0] : s)
        .join('')
}

export function formatDateToNow(date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true }).toUpperCase();
}