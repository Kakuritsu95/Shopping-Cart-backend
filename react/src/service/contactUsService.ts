import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { ContactFormFields } from "../types/contactFormInterface";

export default (contactRequest: ContactFormFields) =>
  httpActions.post(API_ROUTES.contactUs, contactRequest);
