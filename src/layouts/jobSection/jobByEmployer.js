import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import downArrow from "../../assets/images/arrow-down.png";

export default function JobByEmployer() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState([
    {
      id: 1,
      emp_uid: "d05803be-a163-4222-a150-c14c20108a87",
      job_title: "Business Development",
      role_overview:
        "Handling Business Development Calls\nLeads Follow up\ncalling experience Preferred",
      salary_range_start: 10000,
      salary_range_start_symbol: 3,
      salary_range_end: 30000,
      salary_range_end_symbol: 3,
      candidate_requirements:
        "Good Communication\nFreshers are welcome\nGraduation required\nshould be good in English & Computer",
      additional_benefits: "Bonus, Leave Approval Immidietly, Holidays",
      status: 1,
      attach_file: "1669802722.pdf",
      created_at: "2022-11-30 10:05:22",
      updated_at: "2022-12-15 05:07:05",
      deleted_at: null,
      job_attach_file_path: null,
      salary_range_start_symbol_list: {
        id: 3,
        title: "Canada",
        sortname: "CA",
        country_name: "Canada",
        currency_name: "Canadian Dollar",
        currency_code: "CAD",
        symbol: "C$",
        phonecode: "1",
        status: 1,
        created_at: "2022-11-30 01:07:17",
        updated_at: "2022-12-15 05:07:05",
        deleted_at: null,
      },
      salary_range_end_symbol_list: {
        id: 3,
        title: "Canada",
        sortname: "CA",
        country_name: "Canada",
        currency_name: "Canadian Dollar",
        currency_code: "CAD",
        symbol: "C$",
        phonecode: "1",
        status: 1,
        created_at: "2022-11-30 01:07:17",
        updated_at: "2022-12-15 05:07:05",
        deleted_at: null,
      },
      working_schedule: [
        {
          id: 1,
          job_id: 1,
          working_schedule_id: 1,
          emp_working_schedule: {
            id: 1,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            schedule: "Fulltime Office",
            status: 1,
            created_at: "2022-11-30 04:29:35",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
        {
          id: 2,
          job_id: 1,
          working_schedule_id: 3,
          emp_working_schedule: {
            id: 3,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            schedule: "8 Hours Full Time",
            status: 1,
            created_at: "2022-11-30 04:29:54",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
      ],
      office_location: [
        {
          id: 1,
          job_id: 1,
          office_location_id: 1,
          emp_office_locations: {
            id: 1,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            location: "India",
            status: 1,
            created_at: "2022-11-30 04:29:17",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
        {
          id: 2,
          job_id: 1,
          office_location_id: 2,
          emp_office_locations: {
            id: 2,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            location: "USA",
            status: 1,
            created_at: "2022-11-30 04:29:21",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
      ],
      employer_list: {
        id: 1,
        uuid: "d05803be-a163-4222-a150-c14c20108a87",
        is_pe: "0",
        email: "nick007@yopmail.com",
        email_verified_at: "2022-11-21 18:11:10",
        name: "nick007",
        is_request: 1,
        is_login: 0,
        status: 1,
        uk_address: "uk",
        hq_address: "uk",
        billing_address: "uk",
        contact_details: "nick007@yopmail.com",
        logo: "1675401279.jpg",
        url: "nick007.com",
        is_terms_and_conditions: 0,
        is_marketing_sign_up: 0,
        currency_code: null,
        created_at: "2022-11-21 12:41:10",
        updated_at: "2023-02-05 23:05:57",
        deleted_at: null,
        logo_path: "https://backend.harriercandidates.com/storage/uploads/logo/1675401279.jpg",
      },
    },
    {
      id: 2,
      emp_uid: "d05803be-a163-4222-a150-c14c20108a87",
      job_title: "Human Resources Assistant",
      role_overview:
        "This position reports to the Human Resources (HR) director and\ninterfaces with company managers and HR staff. Company XYZ is\ncommitted to an employee-orientated, high performance culture that\nemphasizes empowerment, quality, continuous improvement, and the\nrecruitment and ongoing development of a superior workforce.",
      salary_range_start: 3000,
      salary_range_start_symbol: 12,
      salary_range_end: 5000,
      salary_range_end_symbol: 12,
      candidate_requirements:
        "- Proficient with Microsoft Word and Excel\n- General knowledge of employment law and practices\n- Able to maintain a high level of confidentiality\n- Effective oral and written management communication skills",
      additional_benefits:
        "HR Information Systems; Employee relations; Training and development; Benefits; Compensation; Organization development; Employment",
      status: 1,
      attach_file: "1669802994.pdf",
      created_at: "2022-11-30 10:09:54",
      updated_at: "2022-12-15 05:07:05",
      deleted_at: null,
      job_attach_file_path: null,
      salary_range_start_symbol_list: {
        id: 12,
        title: "United Kingdom",
        sortname: "GB",
        country_name: "United Kingdom",
        currency_name: "Pound Sterling",
        currency_code: "GBP",
        symbol: "£",
        phonecode: "44",
        status: 1,
        created_at: "2022-11-30 01:07:17",
        updated_at: "2022-12-15 05:07:05",
        deleted_at: null,
      },
      salary_range_end_symbol_list: {
        id: 12,
        title: "United Kingdom",
        sortname: "GB",
        country_name: "United Kingdom",
        currency_name: "Pound Sterling",
        currency_code: "GBP",
        symbol: "£",
        phonecode: "44",
        status: 1,
        created_at: "2022-11-30 01:07:17",
        updated_at: "2022-12-15 05:07:05",
        deleted_at: null,
      },
      working_schedule: [
        {
          id: 3,
          job_id: 2,
          working_schedule_id: 2,
          emp_working_schedule: {
            id: 2,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            schedule: "Remote",
            status: 1,
            created_at: "2022-11-30 04:29:39",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
      ],
      office_location: [
        {
          id: 3,
          job_id: 2,
          office_location_id: 1,
          emp_office_locations: {
            id: 1,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            location: "India",
            status: 1,
            created_at: "2022-11-30 04:29:17",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
        {
          id: 4,
          job_id: 2,
          office_location_id: 3,
          emp_office_locations: {
            id: 3,
            emp_uuid: "d05803be-a163-4222-a150-c14c20108a87",
            location: "England",
            status: 1,
            created_at: "2022-11-30 04:29:28",
            updated_at: "2022-12-15 05:07:05",
            deleted_at: null,
          },
        },
      ],
      employer_list: {
        id: 1,
        uuid: "d05803be-a163-4222-a150-c14c20108a87",
        is_pe: "0",
        email: "nick007@yopmail.com",
        email_verified_at: "2022-11-21 18:11:10",
        name: "nick007",
        is_request: 1,
        is_login: 0,
        status: 1,
        uk_address: "uk",
        hq_address: "uk",
        billing_address: "uk",
        contact_details: "nick007@yopmail.com",
        logo: "1675401279.jpg",
        url: "nick007.com",
        is_terms_and_conditions: 0,
        is_marketing_sign_up: 0,
        currency_code: null,
        created_at: "2022-11-21 12:41:10",
        updated_at: "2023-02-05 23:05:57",
        deleted_at: null,
        logo_path: "https://backend.harriercandidates.com/storage/uploads/logo/1675401279.jpg",
      },
    },
  ]);

  const [collapse, setCollapse] = useState();
  const [jobId, setJobId] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e, id) => {
    setJobId(id);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ===== Collapse ====

  const Collapse = (i) => {
    if (collapse === i) {
      setCollapse();
    } else {
      setCollapse(i);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getJobDetails(id);
  }, []);

  const getJobDetails = async (id) => {
    // await axiosInstanceAuth
    //   .post("/v1/emp/all/jobs/details", {
    //     id: id,
    //   })
    //   .then((res) => {
    //     const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
    //     const mydata = JSON.parse(Decrypt(res?.data?.data));
    //     console.log("----->>getJobDetails", mydata);
    //     if (res?.data?.success) {
    //       setJobDetails(mydata);
    //     } else {
    //         toast.error(msg);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err --->", err);
    //   });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div className={`my-jobs`}>
        <div className="">
          <div className="my-job mh-auto">
            <div className="row m-10">
              {jobDetails.map((collapsed, i) => (
                <div className="col-lg-6" key={i}>
                  <div
                    className={`${collapse === i ? "full" : "small"} my-job-box position-relative`}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="job-title">{collapsed.job_title}</h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        {collapsed.status == 1 ? (
                          <div className="job-status-active">Active Job</div>
                        ) : (
                          <div className="job-status-inactive">Inactive Job</div>
                        )}
                      </div>
                    </div>

                    <div className="about-job">
                      <h5 className="job-sub-title mt-4">Candidate Requirements:</h5>
                      <div className="d-flex align-items-baseline mt-2">
                        <p className="job-description">{collapsed?.candidate_requirements}</p>
                      </div>

                      <h5 className="job-sub-title mt-4">Role Overview</h5>
                      <p className="job-description mt-2">{collapsed.role_overview}</p>

                      <h5 className="job-sub-title mt-4">Additional benefits:</h5>
                      <p className="job-description mt-2">{collapsed?.additional_benefits}</p>

                      <h5 className="job-sub-title mt-4">Work Schedule</h5>
                      <p className="job-description mt-2">
                        {collapsed?.working_schedule.map(
                          (d) => `${d?.emp_working_schedule?.schedule}, `
                        )}
                      </p>
                    </div>
                    <div className="d-sm-flex align-items-center justify-content-between from-where-work">
                      <div className="work-from d-inline-block">
                        {collapsed?.office_location.map(
                          (d) => `${d?.emp_office_locations?.location}, `
                        )}
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between mt-sm-0 mt-3 no-word-brk">
                          <p className="h6 px-2">
                            {collapsed.salary_range_start_symbol_list?.currency_code}
                          </p>
                          <p className="h6 custom-box no-word-brk">
                            {collapsed.salary_range_start}
                          </p>

                          <p className="job-description px-2 no-word-brk">To</p>

                          <p className="h6 custom-box no-word-brk">{collapsed.salary_range_end}</p>

                          <button className="h6 border-0 bg-transparent ms-3">
                            <img
                              src={downArrow}
                              alt=""
                              onClick={() => Collapse(i)}
                              className="icon-rotate"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
