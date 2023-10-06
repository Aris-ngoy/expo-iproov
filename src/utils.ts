function objectToSnakeCase(obj: any): any {
    const converted: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];

            if (value == null) continue;

            if (value instanceof Array || (value !== null && value.constructor === Object)) {
                value = objectToSnakeCase(value);
            }
            converted[camelToSnakeCase(key)] = value;
        }
    }
    return converted;
}

function convertColorsToARGB(obj: any): any {
    Object.keys(obj).forEach((key) => {
        if (key.endsWith('color')) {
            obj[key] = rgba2argb(obj[key]);
        }

        // loop through nested objects
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            for (const nestedKey in obj[key]) {
                if (nestedKey.endsWith('color')) {
                    obj[key][nestedKey] = rgba2argb(obj[key][nestedKey]);
                }
            }
        }
    });

    return obj;
}

/**
 * Given camelCase string, returns snake_case version
 */
function camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function rgba2argb(hex: string | null): string | null {
    if (hex == null) return null;

    const color = hex.slice(1, 7);
    const alpha = hex.length === 9 ? hex.slice(-2) : 'FF';

    return `#${alpha}${color}`;
}

export { objectToSnakeCase, convertColorsToARGB };
