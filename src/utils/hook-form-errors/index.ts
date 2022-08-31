import { IFormErrors } from '@interfaces/form';
import { FieldError } from 'react-hook-form';

const hasValidationErrors = (
    inputName: string,
    errors: IFormErrors,
): boolean => {
    const errorsEntries = Object.entries(errors);
    const errorEntry = errorsEntries.find((entry) => entry[0] === inputName);
    if (errorEntry) {
        const fieldError: FieldError | undefined = errorEntry[1];
        if (fieldError) {
            return true;
        }
    }
    return false;
};

export default hasValidationErrors;
