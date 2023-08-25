export const classNameValidator = 
    (styles: any,  hasError: boolean, validaClassName: string, invalidClassName: string) =>
        hasError
        ? `${styles[invalidClassName]}`
        : `${styles[validaClassName]}`