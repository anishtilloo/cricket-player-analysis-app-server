import { z, object, string, optional, literal, number, array } from 'zod';


const one = 1;
const ten = 10;
const fifteen = 15;
const twentyFive = 25;
const fifty = 50;
const hundred = 100;
const twoHundered = 200;
const twoFifty = 250;
const threeHundred = 300;


export const OptionalField = (fieldValidation: any) =>
    optional(fieldValidation).or(literal("")).or(literal(null));

export const StringMax15 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(fifteen, {
        message: `${fieldName} should be at least ${fifteen} character.`
    });

export const StringMax25 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(twentyFive, {
        message: `${fieldName} should be at least ${twentyFive} character.`
    });

export const StringMax50 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(fifty, {
        message: `${fieldName} should be at least ${fifty} character.`
    });

export const StringMax100 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(hundred, {
        message: `${fieldName} should be at least ${hundred} character.`
    });

export const StringMax200 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(twoHundered, {
        message: `${fieldName} should be at least ${twoHundered} character.`
    });

export const StringMax250 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(twoFifty, {
        message: `${fieldName} should be at least ${twoFifty} character.`
    });

export const StringMax300 = (fieldName = "This field") => 
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(one, {
        message: `${fieldName} should be at least ${one} character.`
    }).max(threeHundred, {
        message: `${fieldName} should be at least ${threeHundred} character.`
    });

export const StringArray = (fieldName = "This field") => 
    array(string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }))
    .refine((data) => data.length > 0, {
      message: `${fieldName} can't be empty.`,
    })
    .refine((data) => data.every((item) => typeof item === 'string'), {
      message: `${fieldName} should be an array of strings.`,
    });

export const MobileNumber = (fieldName = "This field") =>  
    string({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of string.`
    }).min(ten, {
        message: `${fieldName} should be at least ${ten} character.`
    }).max(ten, {
        message: `${fieldName} should be at least ${ten} character.`
    }).regex(new RegExp(/^[0-9]+$/), 
    'Name should contain only alphabets.'
    );

export const NumberSchema = (fieldName = "This field") => 
    number({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of number.`
    }).refine(
        (value) =>{
            // used type conversion because parseFloat takes only string
            // and as to convert the type from one another two types should sufficiently overlaps but number and string dosen't overlap therfore first converted to unknown then to string
            const floatNumber = parseFloat(value as unknown as string);
            return (
                !isNaN(floatNumber) &&
                /^\d+(\.\d{1,2})?$/.test(value as unknown as string)
            );
        },{
            message: `${fieldName} can only contain 2 decimal places.`
        }
    );

export const NumberAndFloatMinMaxSchema = (fieldName = "This field", minLimit: number, maxLimit: number) => 
    number({
        required_error: `${fieldName} is required.`,
        invalid_type_error: `${fieldName} should be of number.`
    }).min(minLimit, {
        message: `${fieldName} can't be less than ${minLimit}.`
    }).max(maxLimit, {
        message: `${fieldName} can't be more than ${maxLimit}.`
    }).refine(
        (value) =>{
            // used type conversion because parseFloat takes only string
            // and as to convert the type from one another two types should sufficiently overlaps but number and string dosen't overlap therfore first converted to unknown then to string
            const floatNumber = parseFloat(value as unknown as string);
            return (
                !isNaN(floatNumber) &&
                floatNumber >= minLimit &&
                floatNumber <= maxLimit &&
                /^\d+(\.\d{1,2})?$/.test(value as unknown as string)
            );
        },{
            message: `${fieldName} can only contain 2 decimal places.`
        }
    );



