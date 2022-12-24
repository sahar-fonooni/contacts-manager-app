import { useEffect , useContext} from "react";
import { useImmer } from "use-immer";
import { Link, useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';

import { ContactContext } from "../../context/contactContext";
import { Formik , Field ,Form , ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";

import {
  getContact,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { Comment, Orange, Purple } from "../../helpers/colors";

const EditContact = () => {
  const { contactId } = useParams();
  const {setContacts , setFilteredContacts ,loading , setLoading , groups} = useContext(ContactContext); 
  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) ; 
        const { data: contactData } = await getContact(contactId);
        setLoading(false) ; 
        setContact(contactData); 
      } catch (err) {
        console.log(err);
        setLoading(false) ; 
      } 
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true) ; 
      // NOTE
      // 4th way:
      // copy state
      // update state 
      // send request
      // status === 200 -> do nothing 
      // status === error -> setState(copyState)
      const { data , status } = await updateContact(values, contactId);
      /* 
      NOTE 
      1- forceRender -> setForceRender(true)
      2- Send request server
      3- Update local state...(this is a better way)
      4- Update local state before sending request to server...(Helps the audience think
         that the site has a good speed but you send the information tight noww)
      */

      if (status===200) {  
      setLoading(false); 

      toast.info("مخاطب با موفقیت ویرایش شد")

        setContacts((draft)=>{
          const contactIndex = draft.findIndex(
            (c)=>c.id===parseInt(contactId)
          ); 
        draft[contactIndex]= {...data} ; 
          });
        setFilteredContacts((draft)=>{
          const contactIndex = draft.findIndex(
            (c)=>c.id === parseInt(contactId)
          )
          draft[contactIndex]={...data};
        }); 

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false) ; 
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: Orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                    initialValues={{
                      fullname:contact.fullname,
                      photo:contact.photo,
                      mobile:contact.mobile,
                      email:contact.email,
                      job:contact.job,
                      group:contact.group
                    }}
                  validationSchema={contactSchema}
                  onSubmit={(values)=>{submitForm(values);}}
                  >
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        // required={true}
                      />
                      <ErrorMessage name="fullname" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mb-2">
                      <Field
                        name="photo"
                        type="text"
                        className="form-control"
                        // required={true}
                        placeholder="آدرس تصویر"
                      />
                      <ErrorMessage name="photo" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mb-2">
                      <Field
                        name="mobile"
                        type="number"
                        className="form-control"
                        // required={true}
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage name="mobile" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mb-2">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        // required={true}
                        placeholder="آدرس ایمیل"
                      />
                      <ErrorMessage name="email" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mb-2">
                      <Field
                        name="job"
                        type="text"
                        className="form-control"
                        // required={true}
                        placeholder="شغل"
                      />
                      <ErrorMessage name="job" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mb-2">
                      <Field
                        name="group"
                        // required={true}
                        as="select"
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage name="group" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: Purple }}
                        value="ساخت مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: Comment }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
    
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
