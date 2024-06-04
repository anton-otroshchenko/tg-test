const dayStatus = {
    SUCCESS: 'Success',
    FAIL: 'Fail',
    SKIP: 'Skip'
} as const;

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const allActiveDays = [true, true, true, true, true, true, true];
const reminderDaysOptions = ['Every Monday', 'Every Tuesday', 'Every Wednesday', 'Every Thursday', 'Every Friday', 'Every Saturday', 'Every Sunday'];


export { dayStatus, days, reminderDaysOptions, allActiveDays };