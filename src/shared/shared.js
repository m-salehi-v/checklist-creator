export const checkValidity = (rules, value) => {
    let isInvalid = true;
    if (rules.isEmail) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isInvalid = !(isInvalid && pattern.test(value));
    }
    if (rules.minLength) {
        isInvalid = !(value.length >= rules.minLength)
    }
    if (rules.isUsername) {
        const pattern = /^(?=.{4,20}$)[a-zA-Z0-9._]+$/;
        isInvalid = !(isInvalid && pattern.test(value));
    }
    return isInvalid;
}