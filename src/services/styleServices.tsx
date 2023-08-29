export const classNameValidator = (
    styles: any,
    hasError: boolean, 
    validaClassName: string, 
    invalidClassName: string
) =>
        hasError
        ? `${styles[invalidClassName]}`
        : `${styles[validaClassName]}`;

//Returns proper clasname based on is it the first render
export const getProperClassName = (
    styles: any,
    withoutAnimClassName: string,
    withAnimClassName: string,
    isFirstRender: boolean
) => 
    isFirstRender
        ? `${styles[withAnimClassName]}`
        : `${styles[withoutAnimClassName]}`;


export const getClassNameByToggle = (
    styles: any,
    isActive: boolean, 
    className: string, 
    classNameToAdd: string
)  => 
		isActive 
			? `${styles[className]} ${styles[classNameToAdd]}`
			: `${styles[className]}`;

    