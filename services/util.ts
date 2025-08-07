import { format } from 'date-fns';
import { enIN } from 'date-fns/locale';

/**
 * Format a date string into "MMM dd, yyyy, hh:mm a" format.
 *
 * @param dateString - The date string to format (ISO format recommended).
 * @returns The formatted date string, or an empty string if input is invalid.
 */
export function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

        return format(date, 'MMM dd, yyyy, hh:mm a', {
            locale: enIN,
        });
    } catch (err) {
        console.error('Invalid date:', dateString, err);
        return '';
    }
}
