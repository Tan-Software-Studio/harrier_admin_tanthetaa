import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import BASE_URL_CV_PATH from "../../pathFiles/basePathUrl";

import "./index.scss";

// Authentication layout components
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Checkbox, Chip, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ActivityLogModel from "./activityLogModel";
import NotesModel from "./notesModel";
import Skeleton from "react-loading-skeleton";

function CandidatesUpdate() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const BASE_CV_PATH = BASE_URL_CV_PATH;

  const filter = createFilterOptions();

  const [isData, setIsData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [candidate, setCandidate] = useState({
    current_company_url: "",
    employer: "",
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    line_management: "",
    desired_region: "",
    current_salary: "",
    current_bonus_or_commission: "",
    desired_salary: "",
    desired_bonus_or_commission: "",
    notice_period: "",
    status: 1,
    freelance_daily_rate: "",
    jurisdiction: "",
    pqe: "",
    legal_experience: "",
    area_of_law: "",
    deal_size: "",
    sales_quota: "",
    profile_about: "",
  });

  const [isDisable, setIsDisable] = useState(true);
  const [industryTime, setIndustryTime] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  // const [pqeTime, setPqeTime] = useState("");

  const [employersTypeListOptions, setEmployersTypeListOptions] = useState([]);
  const [sendEmpType, setSendEmpType] = useState({ id: "", title: "" });

  const [desiredEmployersTypeListOptions, setDesiredEmployersTypeListOptions] = useState([]);
  const [sendDesiredEmpType, setSendDesiredEmpType] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [sendCountry, setSendCountry] = useState({ country_name: "", id: "" });

  const [desireCountryOptions, setDesireCountryOptions] = useState([]);
  const [sendDesireCountry, setSendDesireCountry] = useState([]);

  const [regionOptions, setRegionOptions] = useState([]);
  const [sendRegion, setSendRegion] = useState({ country_name: "", id: "" });

  const [specificRegionOption, setspecificRegionOption] = useState([]);
  const [sendSpecificRegion, setSendSpecificRegion] = useState({ id: "", title: "" });

  const [desireRegionOptions, setDesireRegionOptions] = useState([]);
  const [sendDesireRegion, setSendDesireRegion] = useState([]);

  const [workingArrangementOptions, setWorkingArrangementOptions] = useState([]);
  const [sendWorkingArrangement, setSendWorkingArrangement] = useState({ id: "", title: "" });

  const [desiredWorkingArrangementOptions, setDesiredWorkingArrangementOptions] = useState([]);
  const [sendDesiredWorkingArrangement, setSendDesiredWorkingArrangement] = useState([]);

  const [customerTypesOptions, setCustomerTypesOptions] = useState([]);
  const [sendCustomerTypes, setSendCustomerTypes] = useState([]);

  const [legalTechToolsOptions, setLegalTechToolsOptions] = useState([]);
  const [sendLegalTechTools, setSendLegalTechTools] = useState([]);
  const [testsendLegalTechTools, setTestSendLegalTechTools] = useState([]);

  const [techToolsOptions, setTechToolsOptions] = useState([]);
  const [sendTechTools, setSendTechTools] = useState([]);
  const [testSendTechTools, setTestSendTechTools] = useState([]);

  const [qualificationsOptions, setQualificationsOptions] = useState([]);
  const [sendQualifications, setSendQualifications] = useState([]);
  const [testSendQualifications, setTestSendQualifications] = useState([]);

  const [langaugesOptions, setLangaugesOptions] = useState([]);
  const [sendLangauges, setSendLangauges] = useState([]);

  const freelanceOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendFreelance, setSendFreelance] = useState({ id: "", title: "" });

  const futureFreelanceOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendFutureFreelance, setSendFutureFreelance] = useState({ id: "", title: "" });

  const lawDegreeOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendLawDegree, setSendLawDegree] = useState({ id: "", title: "" });

  const qualifiedOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendQualified, setSendQualified] = useState({ id: "", title: "" });

  const legalExperienceOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendLegalExperience, setSendLegalExperience] = useState({ id: "", title: "" });

  const legalTechVendorOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendLegalTechVendor, setSendLegalTechVendor] = useState({ id: "", title: "" });

  const harrierSearchOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendHarrierSearch, setSendHarrierSearch] = useState({ id: "", title: "" });

  const harrierCandidatesOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [sendHarrierCandidates, setSendHarrierCandidates] = useState({ id: "", title: "" });

  const [currancyOptions, setCurrancyOptions] = useState([]);

  const [sendCurrentSalarySymbol, setSendCurrentSalarySymbol] = useState({ id: "", symbol: "" });
  const [sendDesiredSalarySymbol, setSendDesiredSalarySymbol] = useState({ id: "", symbol: "" });
  const [sendCurrentBonusOrCommissionSymbol, setSendCurrentBonusOrCommissionSymbol] = useState({
    id: "",
    symbol: "",
  });
  const [sendDesiredBonusOrCommissionSymbol, setSendDesiredBonusOrCommissionSymbol] = useState({
    id: "",
    symbol: "",
  });
  const [sendFreelanceRateSymbol, setSendFreelanceRateSymbol] = useState({ id: "", symbol: "" });
  const [sendDealSizeSymbol, setSendDealSizeSymbol] = useState({ id: "", symbol: "" });
  const [sendSalesQuotaSymbol, setSendSalesQuotaSymbol] = useState({ id: "", symbol: "" });

  const [CvFileName, setCvFileName] = useState();

  const [cv, setCv] = useState();
  const [preview, setPreview] = useState();

  const handleCvChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setCv(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getSingleCandidate();
  }, []);

  const handlenavigate = () => {
    navigate("/candidates");
  };

  // const handelViewCV = (e) => {
  //     console.log("-----ONClick Path", `${BASE_CV_PATH}${e}`)
  //     navigate(`${BASE_CV_PATH}${e}`)
  // }

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setCandidate({
      ...candidate,
      [name]: value,
    });
  };

  const getDesiredCuntriesOptions = async (mydata) => {
    await axiosInstanceAuth
      .get("/v1/list/mst_desired_countries")
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const DesiredCountriesList = myData;

        if (res?.data?.success) {
          setDesireCountryOptions(DesiredCountriesList);
          let DesireCountryRes = mydata?.desired_country;
          setSendDesireCountry(DesiredCountriesList.filter((x) => DesireCountryRes.includes(x.id)));
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getEmployerTypeListOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_employer_types`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const employersTypeList = myData;

        if (res?.data?.success) {
          setEmployersTypeListOptions(employersTypeList);
          setSendEmpType(employersTypeList.filter((x) => x.id == mydata?.employer_type)?.[0]);

          setDesiredEmployersTypeListOptions(employersTypeList);

          let desEmpTypeRes = mydata?.desired_employer_type;
          setSendDesiredEmpType(employersTypeList.filter((x) => desEmpTypeRes.includes(x.id)));
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getCuntryOptions = async (mydata) => {
    await axiosInstanceAuth
      .post("/v1/countries/typelist")
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const CountriesList = myData?.list;

        if (res?.data?.success) {
          setCountryOptions(CountriesList);
          setSendCountry(CountriesList.filter((x) => x.id == mydata?.current_country)?.[0]);

          setIsData(mydata?.current_region);
          getSpecificRegionOptions(
            mydata?.current_region,
            CountriesList.filter((x) => x.id == mydata?.current_country)?.[0]?.id
          );

          // setDesireCountryOptions(CountriesList);
          // // setSendDesireCountry(mydata?.desired_country)
          // let DesireCountryRes = mydata?.desired_country;
          // setSendDesireCountry(CountriesList.filter(x => DesireCountryRes.includes(x.id)));

          // setCurrancyOptions(CountriesList);
          // setSendCurrentSalarySymbol(CountriesList.filter(x => x.id == mydata?.current_salary_symbol)?.[0]);
          // setSendDesiredSalarySymbol(CountriesList.filter(x => x.id == mydata?.desired_salary_symbol)?.[0]);
          // setSendCurrentBonusOrCommissionSymbol(CountriesList.filter(x => x.id == mydata?.current_bonus_or_commission_symbol)?.[0]);
          // setSendDesiredBonusOrCommissionSymbol(CountriesList.filter(x => x.id == mydata?.desired_bonus_or_commission_symbol)?.[0]);
          // setSendFreelanceRateSymbol(CountriesList.filter(x => x.id == mydata?.freelance_daily_rate_symbol)?.[0]);
          // setSendDealSizeSymbol(CountriesList.filter(x => x.id == mydata?.deal_size_symbol)?.[0]);
          // setSendSalesQuotaSymbol(CountriesList.filter(x => x.id == mydata?.sales_quota_symbol)?.[0]);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getCurrancyOptions = async (mydata) => {
    await axiosInstanceAuth
      .get("v1/list/mst_currencies")
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const CurrancyList = myData;

        if (res?.data?.success) {
          setCurrancyOptions(CurrancyList);
          setSendCurrentSalarySymbol(
            CurrancyList.filter((x) => x.id == mydata?.current_salary_symbol)?.[0]
          );
          setSendDesiredSalarySymbol(
            CurrancyList.filter((x) => x.id == mydata?.desired_salary_symbol)?.[0]
          );
          setSendCurrentBonusOrCommissionSymbol(
            CurrancyList.filter((x) => x.id == mydata?.current_bonus_or_commission_symbol)?.[0]
          );
          setSendDesiredBonusOrCommissionSymbol(
            CurrancyList.filter((x) => x.id == mydata?.desired_bonus_or_commission_symbol)?.[0]
          );
          setSendFreelanceRateSymbol(
            CurrancyList.filter((x) => x.id == mydata?.freelance_daily_rate_symbol)?.[0]
          );
          setSendDealSizeSymbol(CurrancyList.filter((x) => x.id == mydata?.deal_size_symbol)?.[0]);
          setSendSalesQuotaSymbol(
            CurrancyList.filter((x) => x.id == mydata?.sales_quota_symbol)?.[0]
          );
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  // const getRegionOptions = async (mydata) => {
  //     await axiosInstanceAuth
  //         .get(`/v1/list/mst_regions`)
  //         .then((res) => {
  //             const myData = JSON.parse(Decrypt(res?.data?.data));
  //             const RegionList = myData;
  //             console.log("---------->>> setRegionOptions", regionOptions)

  //             if (res?.data?.success) {
  //                 setRegionOptions(RegionList);
  //                 setSendRegion(RegionList.filter(x => x.id == mydata?.current_region)?.[0])

  //                 setDesireRegionOptions(RegionList);
  //                 // setSendDesireRegion(mydata?.desired_region)
  //                 let DesireRegionRes = mydata?.desired_region;
  //                 setSendDesireRegion(RegionList.filter(x => DesireRegionRes.includes(x.id)));
  //             }
  //         })
  //         .catch((err) => {
  //             console.log("err--->", err);
  //         });
  // };

  const getSpecificRegionOptions = async (mydata, value) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        country_id: value,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/list/mst_regions`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const regionTypeList = myData?.list;

        if (res?.data?.success) {
          setspecificRegionOption(regionTypeList);
          setSendSpecificRegion(regionTypeList.filter((x) => x.id == mydata)?.[0]);
        } else {
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getWorkingArrangementOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_working_arrangements`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const WorkingArrangementList = myData;

        if (res?.data?.success) {
          setWorkingArrangementOptions(WorkingArrangementList);
          setSendWorkingArrangement(
            WorkingArrangementList.filter((x) => x.id == mydata?.working_arrangements)?.[0]
          );

          setDesiredWorkingArrangementOptions(WorkingArrangementList);
          // setSendDesiredWorkingArrangement(mydata?.desired_working_arrangements)
          let DesiredWorkingArrangementRes = mydata?.desired_working_arrangements;
          setSendDesiredWorkingArrangement(
            WorkingArrangementList.filter((x) => DesiredWorkingArrangementRes.includes(x.id))
          );
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getCustomerTypesOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_customer_types`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const CustomerTypesList = myData;
        if (res?.data?.success) {
          setCustomerTypesOptions(CustomerTypesList);
          // setSendCustomerTypes(mydata?.customer_type)
          let CustomerTypesRes = mydata?.customer_type;
          setSendCustomerTypes(CustomerTypesList.filter((x) => CustomerTypesRes.includes(x.id)));
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getLegalTechToolsOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_legal_tech_tools`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const LegalTechToolsList = myData;
        if (res?.data?.success) {
          setLegalTechToolsOptions(LegalTechToolsList);
          // setSendLegalTechTools(mydata?.legal_tech_tools)
          let LegalTechToolsRes = mydata?.legal_tech_tools;
          setSendLegalTechTools(LegalTechToolsList.filter((x) => LegalTechToolsRes.includes(x.id)));

          setTestSendLegalTechTools(LegalTechToolsRes);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getTechToolsOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_tech_tools`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const TechToolsList = myData;
        if (res?.data?.success) {
          setTechToolsOptions(TechToolsList);
          // setSendTechTools(mydata?.tech_tools)
          let TechToolsRes = mydata?.tech_tools;
          setSendTechTools(TechToolsList.filter((x) => TechToolsRes.includes(x.id)));

          setTestSendTechTools(TechToolsRes);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getQualificationsOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_qualifications`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const QualificationsList = myData;

        if (res?.data?.success) {
          setQualificationsOptions(QualificationsList);
          // setSendQualifications(mydata?.qualification)
          let QualificationsRes = mydata?.qualification;
          setSendQualifications(QualificationsList.filter((x) => QualificationsRes.includes(x.id)));

          setTestSendQualifications(QualificationsRes);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getLangaugesOptions = async (mydata) => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_languages`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const LangaugesList = myData;

        if (res?.data?.success) {
          setLangaugesOptions(LangaugesList);
          // setSendLangauges(mydata?.languages)
          let LangaugesRes = mydata?.languages;
          setSendLangauges(LangaugesList.filter((x) => LangaugesRes.includes(x.id)));
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getSingleCandidate = async () => {
    setIsLoading(true);
    const encryptedData = Encrypt(
      JSON.stringify({
        uuid: uuid,
      })
    );
    await axiosInstanceAuth
      .post("v1/adm/single/candidates/list", {
        response: encryptedData,
      })
      .then((res) => {
        const data = Decrypt(res?.data?.data);
        const mydata = JSON.parse(data);
        // console.log("getSingleCandidate --->", mydata);

        if (res?.data?.success) {
          setCandidate(mydata);
          setCvFileName(mydata?.cv);
          getEmployerTypeListOptions(mydata);
          getCuntryOptions(mydata);
          getDesiredCuntriesOptions(mydata);
          getCurrancyOptions(mydata);
          // getRegionOptions(mydata);
          getWorkingArrangementOptions(mydata);
          getCustomerTypesOptions(mydata);
          getLegalTechToolsOptions(mydata);
          getTechToolsOptions(mydata);
          getQualificationsOptions(mydata);
          getLangaugesOptions(mydata);
        }

        setIndustryTime(mydata?.time_in_industry);
        setCurrentRole(mydata?.time_in_current_role);
        // setPqeTime(mydata?.pqe)

        setSendFreelance(freelanceOptions.filter((x) => x.id == mydata?.freelance_current)?.[0]);
        setSendFutureFreelance(
          futureFreelanceOptions.filter((x) => x.id == mydata?.freelance_future)?.[0]
        );
        setSendLawDegree(lawDegreeOptions.filter((x) => x.id == mydata?.law_degree)?.[0]);
        setSendQualified(qualifiedOptions.filter((x) => x.id == mydata?.qualified_lawyer)?.[0]);
        setSendLegalExperience(
          legalExperienceOptions.filter((x) => x.id == mydata?.legal_experience)?.[0]
        );
        setSendLegalTechVendor(
          legalTechVendorOptions.filter((x) => x.id == mydata?.legaltech_vendor_or_consultancy)?.[0]
        );

        setSendHarrierSearch(
          harrierSearchOptions.filter((x) => x.id == mydata?.harrier_search)?.[0]
        );

        setSendHarrierCandidates(
          harrierCandidatesOptions.filter((x) => x.id == mydata?.harrier_candidate)?.[0]
        );

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err --->", err);
      });
  };

  const DesiredEmpMap = sendDesiredEmpType && sendDesiredEmpType.map((d, i) => d.id);
  const DesireCountryMap = sendDesireCountry && sendDesireCountry.map((d, i) => d.id);
  const DesireRegionMap = sendDesireRegion && sendDesireRegion.map((d, i) => d.id);
  const DesiredWorkingArrangementMap =
    sendDesiredWorkingArrangement && sendDesiredWorkingArrangement.map((d, i) => d.id);
  const CustomerTypesMap = sendCustomerTypes && sendCustomerTypes.map((d, i) => d.id);
  const LegalTechToolsMap = sendLegalTechTools && sendLegalTechTools.map((d, i) => d.id);
  const TechToolsMap = sendTechTools && sendTechTools.map((d, i) => d.id);
  const QualificationsMap = sendQualifications && sendQualifications.map((d, i) => d.id);
  const LangaugesMap = sendLangauges && sendLangauges.map((d, i) => d.id);

  const updateCandidate = async () => {
    const encryptedData = Encrypt(
      JSON.stringify({
        uuid: uuid,
        current_company_url: candidate.current_company_url,
        employer: candidate.employer,
        first_name: candidate?.first_name,
        last_name: candidate?.last_name,
        email: candidate.email,
        job_title: candidate.job_title,
        line_management: candidate.line_management,
        desired_region: candidate.desired_region,
        current_salary: candidate.current_salary,
        current_bonus_or_commission: candidate.current_bonus_or_commission,
        desired_salary: candidate.desired_salary,
        desired_bonus_or_commission: candidate.desired_bonus_or_commission,
        notice_period: candidate.notice_period,
        status: candidate.status,
        freelance_daily_rate: candidate.freelance_daily_rate,
        jurisdiction: candidate.jurisdiction,
        pqe: candidate.pqe,
        legal_experience: candidate.legal_experience,
        area_of_law: candidate.area_of_law,
        deal_size: candidate.deal_size,
        sales_quota: candidate.sales_quota,
        profile_about: candidate.profile_about,

        time_in_current_role: currentRole,
        time_in_industry: industryTime,
        // pqe: pqeTime,

        desired_employer_type: DesiredEmpMap,
        desired_country: DesireCountryMap,
        // desired_region: DesireRegionMap,
        desired_working_arrangements: DesiredWorkingArrangementMap,
        customer_type: CustomerTypesMap,

        // legal_tech_tools: LegalTechToolsMap,
        legal_tech_tools: testsendLegalTechTools,

        // tech_tools: TechToolsMap,
        tech_tools: testSendTechTools,

        // qualification: QualificationsMap,
        qualification: testSendQualifications,

        languages: LangaugesMap,
        // desired_employer_type: sendDesiredEmpType,
        // desired_country: sendDesireCountry,
        // desired_region: sendDesireRegion,
        // desired_working_arrangements: sendDesiredWorkingArrangement,
        // customer_type: sendCustomerTypes,
        // legal_tech_tools: sendLegalTechTools,
        // tech_tools: sendTechTools,
        // languages: sendQualifications,
        // qualification: sendLangauges,

        employer_type: sendEmpType?.id,
        current_country: sendCountry?.id,
        // current_region: sendRegion?.id,
        current_region: sendSpecificRegion?.id,

        working_arrangements: sendWorkingArrangement?.id,
        freelance_current: sendFreelance?.id,
        freelance_future: sendFutureFreelance?.id,
        law_degree: sendLawDegree?.id,
        qualified_lawyer: sendQualified?.id,
        // legal_experience: sendLegalExperience?.id,
        legaltech_vendor_or_consultancy: sendLegalTechVendor?.id,
        harrier_search: sendHarrierSearch?.id,
        harrier_candidate: sendHarrierCandidates?.id,

        current_salary_symbol: sendCurrentSalarySymbol?.id,
        desired_salary_symbol: sendDesiredSalarySymbol?.id,
        current_bonus_or_commission_symbol: sendCurrentBonusOrCommissionSymbol?.id,
        desired_bonus_or_commission_symbol: sendDesiredBonusOrCommissionSymbol?.id,
        freelance_daily_rate_symbol: sendFreelanceRateSymbol?.id,
        deal_size_symbol: sendDealSizeSymbol?.id,
        sales_quota_symbol: sendSalesQuotaSymbol?.id,
      })
    );

    const formData = new FormData();
    formData.append("response", encryptedData);
    formData.append("cv", cv == undefined ? "" : cv);

    await axiosInstanceAuth
      .post("/v1/adm/candidate/details/update", formData)
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          getSingleCandidate();
          toast.success(msg);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const removeDuplicates = (arr) => {
    const uniqueIds = [];
    const unique = arr.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    return unique;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mx={5} my={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDButton onClick={handlenavigate} variant="outlined" color="info">
          Back
        </MDButton>
        {isDisable ? (
          <MDBox>
            {CvFileName == null ? (
              " "
            ) : (
              <a href={`${BASE_CV_PATH}${CvFileName}`} target="_blank">
                <MDButton
                  variant="contained"
                  color="success"
                  className="symbol-input-field"
                  sx={{ marginRight: "10px" }}
                >
                  View CV
                </MDButton>
              </a>
            )}
            <MDButton
              MDButton
              m={5}
              sx={{ marginLeft: "10px" }}
              onClick={() => setIsDisable(false)}
              variant="gradient"
              color="info"
            >
              Edit
            </MDButton>
          </MDBox>
        ) : (
          <MDButton
            m={5}
            onClick={() => {
              setIsDisable(true), updateCandidate();
            }}
            variant="gradient"
            color="success"
          >
            Update
          </MDButton>
        )}
      </MDBox>

      {isLoading ? (
        <Skeleton
          highlightColor="#d4d4d4"
          baseColor="#e0e0e0"
          borderRadius="25px"
          inline="true"
          count={2}
          width="45%"
          height="1600px"
          style={{ margin: "0px 1.5%" }}
        />
      ) : (
        <MDBox component="form" role="form" className="candidates-details-container">
          <MDBox className="core-que-container">
            <MDTypography className="heading">Core Questions</MDTypography>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Current Company</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="employer"
                onChange={onChange}
                value={candidate.employer || ""}
                className="text-input-field"
              />
              {/* <MDInput
                                    disabled={isDisable}
                                    type="text"
                                    name="current_company_url"
                                    onChange={onChange}
                                    value={candidate.current_company_url || ""}
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">First Name</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="first_name"
                onChange={onChange}
                value={candidate?.first_name || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Last Name</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="last_name"
                onChange={onChange}
                value={candidate?.last_name || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Email</MDTypography>
              <MDInput
                disabled={isDisable}
                type="email"
                name="email"
                onChange={onChange}
                value={candidate.email || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Job Title</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="job_title"
                onChange={onChange}
                value={candidate.job_title || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Employer Type </MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={employersTypeListOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendEmpType || {}}
                onChange={(e, value) => {
                  setSendEmpType(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Time in Current Role</MDTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} className="text-input-field">
                  <DesktopDatePicker
                    disabled={isDisable}
                    value={currentRole}
                    minDate={dayjs("2000-01-01")}
                    onChange={(newValue) => {
                      const inFormat = dayjs(newValue).format("YYYY-MM-DD");
                      setCurrentRole(inFormat);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    className="text-input-field"
                  />
                </Stack>
              </LocalizationProvider>
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Time in Industry</MDTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} className="text-input-field">
                  <DesktopDatePicker
                    disabled={isDisable}
                    value={industryTime}
                    minDate={dayjs("2000-01-01")}
                    onChange={(newValue) => {
                      const inFormat = dayjs(newValue).format("YYYY-MM-DD");
                      setIndustryTime(inFormat);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    className="text-input-field"
                  />
                </Stack>
              </LocalizationProvider>
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Line Management</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="line_management"
                onChange={onChange}
                value={candidate.line_management || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Desired Employer Type</MDTypography>
              <Autocomplete
                id="tags-standard"
                multiple
                disabled={isDisable}
                options={desiredEmployersTypeListOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendDesiredEmpType || []}
                onChange={(e, value) => {
                  setSendDesiredEmpType(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Current Country</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={countryOptions}
                getOptionLabel={(option) => option.country_name || ""}
                value={sendCountry || {}}
                onChange={(e, value) => {
                  setSendCountry(value);
                  getSpecificRegionOptions(isData, value?.id);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Current Region</MDTypography>
              {/* <Autocomplete
                                    disabled={isDisable}
                                    options={regionOptions}
                                    getOptionLabel={
                                        (option) => (option.title || "")
                                    }
                                    value={sendRegion || {}}
                                    onChange={(e, value) => {
                                        setSendRegion(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}

              <Autocomplete
                disabled={isDisable}
                options={specificRegionOption}
                getOptionLabel={(option) => option.state_name || ""}
                value={sendSpecificRegion || {}}
                onChange={(e, value) => {
                  setSendSpecificRegion(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Desired Country</MDTypography>
              <Autocomplete
                multiple
                disabled={isDisable}
                options={desireCountryOptions}
                getOptionLabel={(option) => option.country_name || ""}
                value={sendDesireCountry || []}
                onChange={(e, value) => {
                  setSendDesireCountry(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Desired Region</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="desired_region"
                onChange={onChange}
                value={candidate.desired_region || ""}
                className="text-input-field"
              />
              {/* <Autocomplete
                                    multiple
                                    disabled={isDisable}
                                    options={desireRegionOptions}
                                    getOptionLabel={
                                        (option) => (option?.title || "")
                                    }
                                    value={sendDesireRegion || []}
                                    onChange={(e, value) => {
                                        setSendDesireRegion(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox m={2} className="detail-content-symbol">
              <MDTypography className="title">Current Salary</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="current_salary"
                  onChange={onChange}
                  value={candidate.current_salary || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendCurrentSalarySymbol || {}}
                  onChange={(e, value) => {
                    setSendCurrentSalarySymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox m={2} className="detail-content-symbol">
              <MDTypography className="title">Desired Salary</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="desired_salary"
                  onChange={onChange}
                  value={candidate.desired_salary || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendDesiredSalarySymbol || {}}
                  onChange={(e, value) => {
                    setSendDesiredSalarySymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox m={2} className="detail-content-symbol">
              <MDTypography className="title">Current Bonus / Commission</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="current_bonus_or_commission"
                  onChange={onChange}
                  value={candidate.current_bonus_or_commission || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendCurrentBonusOrCommissionSymbol || {}}
                  onChange={(e, value) => {
                    setSendCurrentBonusOrCommissionSymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox m={2} className="detail-content-symbol">
              <MDTypography className="title">Desired Bonus / Commission</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="desired_bonus_or_commission"
                  onChange={onChange}
                  value={candidate.desired_bonus_or_commission || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendDesiredBonusOrCommissionSymbol || {}}
                  onChange={(e, value) => {
                    setSendDesiredBonusOrCommissionSymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Notice Period</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="notice_period"
                onChange={onChange}
                value={candidate.notice_period || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Status</MDTypography>
              <MDBox className="text-input-field ">
                {candidate?.status == 1 ? (
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color="success"
                    className="bg-Color-success"
                  >
                    Active
                  </MDTypography>
                ) : candidate?.status == 2 ? (
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color="warning"
                    className="bg-Color-warning"
                  >
                    Passive
                  </MDTypography>
                ) : candidate?.status == 3 ? (
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color="info"
                    className="bg-Color-info"
                  >
                    Very Passive
                  </MDTypography>
                ) : candidate?.status == 4 ? (
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color="error"
                    className="bg-Color-error"
                  >
                    Closed
                  </MDTypography>
                ) : null}
              </MDBox>

              {/* <MDBox lineHeight={1} sx={{ minWidth: "135px" }}>
                                    {(candidate?.status == 1) ? (
                                        <MDButton variant="outlined" color="success" fullWidth>
                                            Active
                                        </MDButton>

                                    ) : (candidate?.status == 2) ? (
                                        <MDButton variant="outlined" color="warning" fullWidth>
                                            Passive
                                        </MDButton>
                                    ) : (candidate?.status == 3) ? (
                                        <MDButton variant="outlined" color="info" fullWidth>
                                            Very Passive
                                        </MDButton>
                                    ) : (
                                        <MDButton variant="outlined" color="error" fullWidth>
                                            Closed
                                        </MDButton>
                                    )}
                                </MDBox> */}

              {/* <MDInput
                                    disabled={isDisable}
                                    type="text"
                                    name="status"
                                    onChange={onChange}
                                    value={candidate.status || ""}
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Freelance (Current)</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={freelanceOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendFreelance || {}}
                onChange={(e, value) => {
                  setSendFreelance(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Freelance (Future)</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={futureFreelanceOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendFutureFreelance || {}}
                onChange={(e, value) => {
                  setSendFutureFreelance(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content-symbol">
              <MDTypography className="title">Freelance rate (daily rate)</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="freelance_daily_rate"
                  onChange={onChange}
                  value={candidate.freelance_daily_rate || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendFreelanceRateSymbol || {}}
                  onChange={(e, value) => {
                    setSendFreelanceRateSymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Working Arrangements</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={workingArrangementOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendWorkingArrangement || {}}
                onChange={(e, value) => {
                  setSendWorkingArrangement(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox m={2} className="detail-content">
              <MDTypography className="title">Desired Working Arrangements</MDTypography>
              <Autocomplete
                multiple
                disabled={isDisable}
                options={desiredWorkingArrangementOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendDesiredWorkingArrangement || []}
                onChange={(e, value) => {
                  setSendDesiredWorkingArrangement(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
          </MDBox>

          <MDBox className="role-que-container">
            <MDTypography className="heading">Role Questions</MDTypography>
            <MDTypography className="sub-heading">Legal</MDTypography>

            <MDBox className="detail-content">
              <MDTypography className="title">Law Degree</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={lawDegreeOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendLawDegree || {}}
                onChange={(e, value) => {
                  setSendLawDegree(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Qualified Lawyer</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={qualifiedOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendQualified || {}}
                onChange={(e, value) => {
                  setSendQualified(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Jurisdiction</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="jurisdiction"
                onChange={onChange}
                value={candidate.jurisdiction || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">PQE</MDTypography>

              <MDInput
                disabled={isDisable}
                type="text"
                name="pqe"
                onChange={onChange}
                value={candidate.pqe || ""}
                className="text-input-field"
              />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} className="text-input-field">
                                        <DesktopDatePicker
                                            disabled={isDisable}
                                            value={pqeTime}
                                            minDate={dayjs('2000-01-01')}
                                            onChange={(newValue) => {
                                                const inFormat = dayjs(newValue).format("YYYY-MM-DD")
                                                setPqeTime(inFormat);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            className="text-input-field"
                                        />
                                    </Stack>
                                </LocalizationProvider> */}
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Legal Experience</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="legal_experience"
                onChange={onChange}
                value={candidate.legal_experience || ""}
                className="text-input-field"
              />
              {/* <Autocomplete
                                    disabled={isDisable}
                                    options={legalExperienceOptions}
                                    getOptionLabel={
                                        (option) => (option.title || "")
                                    }
                                    value={sendLegalExperience || {}}
                                    onChange={(e, value) => {
                                        setSendLegalExperience(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Area of Law</MDTypography>
              <MDInput
                disabled={isDisable}
                type="text"
                name="area_of_law"
                onChange={onChange}
                value={candidate.area_of_law || ""}
                className="text-input-field"
              />
            </MDBox>

            <MDTypography className="sub-heading">Commercial</MDTypography>
            <MDBox className="detail-content">
              <MDTypography className="title">LegalTech vendor/consultancy</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={legalTechVendorOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendLegalTechVendor || []}
                onChange={(e, value) => {
                  setSendLegalTechVendor(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Customer Type</MDTypography>
              <Autocomplete
                multiple
                disabled={isDisable}
                options={customerTypesOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendCustomerTypes || []}
                onChange={(e, value) => {
                  setSendCustomerTypes(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content-symbol">
              <MDTypography className="title">Deal Size</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="deal_size"
                  onChange={onChange}
                  value={candidate.deal_size || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendDealSizeSymbol || {}}
                  onChange={(e, value) => {
                    setSendDealSizeSymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDBox className="detail-content-symbol">
              <MDTypography className="title">Sales quota</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="text"
                  name="sales_quota"
                  onChange={onChange}
                  value={candidate.sales_quota || ""}
                  className="text-input-field"
                />
                <Autocomplete
                  disabled={isDisable}
                  options={currancyOptions}
                  getOptionLabel={(option) => option.currency_code || ""}
                  value={sendSalesQuotaSymbol || {}}
                  onChange={(e, value) => {
                    setSendSalesQuotaSymbol(value);
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  className="symbol-input-field"
                  classes={{ root: "override-input-field" }}
                />
              </MDBox>
            </MDBox>
            <MDTypography className="sub-heading">Tech/Other Qualifications</MDTypography>
            <MDBox className="detail-content">
              <MDTypography className="title">LegalTech Tools</MDTypography>

              <Autocomplete
                multiple
                disabled={isDisable}
                options={legalTechToolsOptions.map((option) => option.title)}
                value={testsendLegalTechTools || []}
                freeSolo
                onChange={(e, value) => {
                  setTestSendLegalTechTools(value);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;

                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option.title);

                  if (inputValue !== "" && !isExisting) {
                    filtered.push(inputValue);
                  }
                  return filtered;
                }}
                renderInput={(params) => <TextField {...params} />}
                className="text-input-field"
              />

              {/* <Autocomplete
                                    multiple
                                    disabled={isDisable}
                                    options={legalTechToolsOptions}
                                    getOptionLabel={
                                        (option) => (option.title || "")
                                    }
                                    value={sendLegalTechTools || []}
                                    onChange={(e, value) => {
                                        setSendLegalTechTools(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Tech Tools</MDTypography>

              <Autocomplete
                multiple
                disabled={isDisable}
                options={techToolsOptions.map((option) => option.title)}
                value={testSendTechTools || []}
                freeSolo
                onChange={(e, value) => {
                  setTestSendTechTools(value);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;

                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option.title);

                  if (inputValue !== "" && !isExisting) {
                    filtered.push(inputValue);
                  }
                  return filtered;
                }}
                renderInput={(params) => <TextField {...params} />}
                className="text-input-field"
              />

              {/* <Autocomplete
                                    multiple
                                    disabled={isDisable}
                                    options={techToolsOptions}
                                    getOptionLabel={
                                        (option) => (option.title || "")
                                    }
                                    value={sendTechTools || []}
                                    onChange={(e, value) => {
                                        setSendTechTools(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Qualifications</MDTypography>

              <Autocomplete
                multiple
                disabled={isDisable}
                options={qualificationsOptions.map((option) => option.title)}
                value={testSendQualifications || []}
                freeSolo
                onChange={(e, value) => {
                  setTestSendQualifications(value);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;

                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option.title);

                  if (inputValue !== "" && !isExisting) {
                    filtered.push(inputValue);
                  }
                  return filtered;
                }}
                renderInput={(params) => <TextField {...params} />}
                className="text-input-field"
              />

              {/* <Autocomplete
                                    multiple
                                    disabled={isDisable}
                                    options={qualificationsOptions}
                                    getOptionLabel={
                                        (option) => (option.title || "")
                                    }
                                    value={sendQualifications || []}
                                    onChange={(e, value) => {
                                        setSendQualifications(value);
                                    }}
                                    renderInput={
                                        params => (
                                            <TextField {...params} variant="outlined" />
                                        )
                                    }
                                    className="text-input-field"
                                /> */}
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Languages</MDTypography>
              <Autocomplete
                multiple
                disabled={isDisable}
                options={langaugesOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendLangauges || []}
                onChange={(e, value) => {
                  setSendLangauges(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content">
              <MDTypography className="title">Profile</MDTypography>
              <MDInput
                multiline={true}
                disabled={isDisable}
                type="text"
                name="profile_about"
                onChange={onChange}
                value={candidate.profile_about || ""}
                className="text-input-field"
              />
            </MDBox>
            <MDBox className="detail-content-symbol">
              <MDTypography className="title">Upload CV</MDTypography>
              <MDBox className="input-field-wrapper">
                <MDInput
                  disabled={isDisable}
                  type="file"
                  name="cv"
                  onChange={handleCvChange}
                  className="text-input-field"
                />
                {/* <a href={`${BASE_CV_PATH}${CvFileName}`} target="_blank">
                                    <MDButton
                                        variant="contained"
                                        color="success"
                                        className="symbol-input-field"
                                        sx={{ marginLeft: "10px" }}
                                    // onClick={(e) => { handelViewCV(CvFileName) }}
                                    >
                                        View CV
                                    </MDButton>
                                </a> */}
              </MDBox>
            </MDBox>

            <MDBox className="detail-content">
              <MDTypography className="title">Harrier Search</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={harrierSearchOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendHarrierSearch || {}}
                onChange={(e, value) => {
                  setSendHarrierSearch(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>

            <MDBox className="detail-content">
              <MDTypography className="title">Harrier Candidates</MDTypography>
              <Autocomplete
                disabled={isDisable}
                options={harrierCandidatesOptions}
                getOptionLabel={(option) => option.title || ""}
                value={sendHarrierCandidates || {}}
                onChange={(e, value) => {
                  setSendHarrierCandidates(value);
                }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                className="text-input-field"
              />
            </MDBox>
          </MDBox>
        </MDBox>
      )}

      <MDBox className="activity-details-container">
        <MDBox className="activity-log-container">
          <ActivityLogModel uuid={uuid} />
        </MDBox>
      </MDBox>

      <MDBox className="footer-details-container">
        <MDBox className="note-container">
          <NotesModel uuid={uuid} />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default CandidatesUpdate;
