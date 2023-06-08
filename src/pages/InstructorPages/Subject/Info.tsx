import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect } from "react";
import { getSubjectInfo } from "../../../store/instructorSubjectSlice/reducers/getSubjectInfo";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";
import classes from "./Info.module.css";
import { Divider } from "antd";
const Info: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId;
  const { fetchingInfo, info } = useAppSelector(
    (state) => state.instructorSubject
  );

  useEffect(() => {
    dispatch(getSubjectInfo({ subjectId }));
  }, []);
  console.log(info);
  if (!info && fetchingInfo) {
    return <LoadingOverlay loadingDesc="Fetching subject info" />;
  }

  return (
    <div>
      <Helmet>
        <title>{info?.name}</title>
      </Helmet>
      <SectionTitle sectionTitle={info?.name} />
      <Divider orientation="center">Subject Info</Divider>
    </div>
  );
};

export default Info;
