import { Link } from "react-router-dom";

import { CurrentLine, Cyan, Orange, Purple, Red } from "../../helpers/colors";
import { Pen , Trash ,Eye} from "phosphor-react";
import '../contact/Style/Contact.css'

const Contact = ({ contact, deleteContact }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CurrentLine }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={contact.photo}
                alt={contact.fullname}
                style={{ border: `1px solid ${Purple}` }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7 col-sm-7 textBox">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark textSize">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold textSize">{contact.fullname}</span>
                </li>

                <li className="list-group-item list-group-item-dark textSize">
                  شماره موبایل :{"  "}
                  <span className="fw-bold textSize">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark textSize">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold textSize">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center d-sm-flex new">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1 buttons"
                style={{ backgroundColor: Orange }}
              >
                <Eye size={24} weight="duotone" />
              </Link>

              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1 buttons"
                style={{ backgroundColor: Cyan }}
              >
                <Pen size={24} weight="duotone" />
              </Link>
              <button
                onClick={deleteContact}
                className="btn my-1 buttons"
                style={{ backgroundColor: Red }}
              >
                <Trash size={24} weight="duotone" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
