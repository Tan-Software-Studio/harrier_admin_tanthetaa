// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Admin from "layouts/admin";
import Notifications from "layouts/notifications";
import CvList from "layouts/cvList/cvList";
import CandidatesList from "layouts/candidates/candidatesList";
import EmployersList from "layouts/employers/employersList";
import EmployersTypeList from "./layouts/employerTypes/employerTypeList";
import Settings from "./layouts/settings/settings";
import SignIn from "layouts/authentication/sign-in";
import LogOutConfirmation from "layouts/authentication/sign-in/confirmation";
import ForgotPassword from "layouts/authentication/forgot-password";
import ResetPassword from "layouts/authentication/reset-password";
import BASE_URL_CV_PATH from "./pathFiles/basePathUrl";

// @mui icons
import Icon from "@mui/material/Icon";
import CandidatesUpdate from "layouts/candidates/candidatesUpdate";
import Sample from "layouts/candidates/sample";
import Tables from "layouts/tables";
import EmployerCreate from "layouts/employers/employerCreate";
import GuestList from "layouts/guest/guestList";
import ApplicantTrackingSystem from "layouts/applicantTrackingSystem/applicantTrackingSystem";
import ContactUs from "layouts/contactUs/contactUs";
import JobSection from "layouts/jobSection/jobSection";
import JobByEmployer from "layouts/jobSection/jobByEmployer";

// const BASE_CV_PATH = BASE_URL_CV_PATH;

const routes = [
  {
    route: "/",
    component: <SignIn />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    route: "/admin",
    component: <Admin />,
  },
  {
    route: "/notification",
    component: <Notifications />,
  },
  {
    route: "/cv-list",
    component: <CvList />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Candidates",
    key: "candidates",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/candidates",
    component: <CandidatesList />,
  },
  {
    route: "/candidates-update/:uuid",
    component: <CandidatesUpdate />,
  },
  // {
  //   route: `${BASE_CV_PATH}:e`,
  // },
  {
    type: "collapse",
    auth: true,
    name: "Employers",
    key: "employers",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/employers",
    component: <EmployersList />,
  },
  {
    route: "/employer-create",
    component: <EmployerCreate />,
  },
  {
    route: "/employer-typelist",
    component: <EmployersTypeList />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Guest",
    key: "guest",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/guest",
    component: <GuestList />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Jobs",
    key: "jobs",
    icon: <Icon fontSize="small">badge</Icon>,
    route: "/jobs",
    component: <JobSection />,
  },
  {
    route: "/jobs/:id",
    component: <JobByEmployer />,
  },
  {
    type: "collapse",
    auth: true,
    name: "ATS",
    key: "applicant-tracking-system",
    icon: <Icon fontSize="small">troubleshoot</Icon>,
    route: "/applicant-tracking-system",
    component: <ApplicantTrackingSystem />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
  {
    type: "collapse",
    auth: true,
    name: "Contact Us",
    key: "contact Us",
    icon: <Icon fontSize="small">message</Icon>,
    route: "/contact-us",
    component: <ContactUs />,
  },
  {
    type: "collapse",
    auth: false,
    name: "Log out",
    key: "Log out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <LogOutConfirmation />,
  },
  {
    route: "/authentication/forgot-password",
    component: <ForgotPassword />,
  },
  {
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
  {
    route: "/tables",
    component: <Tables />,
  },
  {
    route: "/sample",
    component: <Sample />,
  },
];

export default routes;
