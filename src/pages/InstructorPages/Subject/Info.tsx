import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect } from "react";
import { getSubjectInfo } from "../../../store/instructorSubjectSlice/reducers/getSubjectInfo";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
const Info: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId;
  console.log(subjectId + " from url");
  const { fetchingInfo, info } = useAppSelector(
    (state) => state.instructorSubject
  );

  useEffect(() => {
    dispatch(getSubjectInfo({ subjectId }));
  }, []);

  if (!info && fetchingInfo) {
    return <LoadingOverlay loadingDesc="Fetching subject info" />;
  }
  return (
    <div>
      <SectionTitle sectionTitle={info?.name} />
    </div>
  );
};

export default Info;
