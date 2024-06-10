/**
* Clamps a middle value within a range of values between a defined minimum bound and a maximum bound. 

* The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.
*/

export const clamp = (min: number, num: number, max: number) => Math.min(Math.max(num, min), max);
