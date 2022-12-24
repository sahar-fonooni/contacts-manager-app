import { string } from 'prop-types';
import * as Yup from 'yup' ; 
export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("Name and surname are required") ,
    photo: Yup.string().url("Address is invalid").required("contact`s photo is required"),
    mobile: Yup.number().required("phone number is required"),
    email: Yup.string().email("email address is invalied").required("email address is required"),
    job: Yup.string().required("choocing group is required"),
    group: Yup.string().nullable()
});