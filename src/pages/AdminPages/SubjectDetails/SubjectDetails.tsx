import { Button, Result, Spin, Tabs } from "antd";
import { useEffect } from "react";
import SubjectInfo from "./SubjectInfo";
import EditSubject from "./EditSubject";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getSubject } from "../../../store/subjectsSlice/reducers/getSubject";
import { clearSubjectDetails } from "../../../store/subjectsSlice/subjectSlice";
import LoadingOverlay from "../../../UI/LoadingOverlay";

const SubjectDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, err } = useAppSelector((state) => state.subject);
  useEffect(() => {
    dispatch(getSubject({ id: params.id }));
    return () => {
      dispatch(clearSubjectDetails({}));
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay loadingDesc="Fetching Subject Details" />}
      {err && (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the subject does not exist."
          extra={
            <Button
              onClick={() => {
                navigate("/Home");
              }}
              type="primary"
            >
              Back Home
            </Button>
          }
        />
      )}
      {!isLoading && !err && (
        <Tabs
          tabPosition="left"
          items={[
            {
              label: "Subject Info",
              children: <SubjectInfo />,
              key: "info",
            },
            {
              label: "Edit Subject",
              children: <EditSubject />,
              key: "edit",
            },
          ]}
        />
      )}
    </>
  );
};

export default SubjectDetails;
