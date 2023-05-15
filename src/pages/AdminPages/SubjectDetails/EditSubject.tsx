import { useParams } from "react-router-dom";
import AddSubjectForm from "../../../components/SubjectForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/api";
import { message } from "antd";
import { getSubject } from "../../../store/subjectsSlice/reducers/getSubject";
import { displayMessage } from "../../../store/messageSlice/message";

const EditSubject = () => {
  const { subjectObject } = useAppSelector((state) => state.subject);
  console.log(subjectObject);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const updateSubjectInformationHandler = async (subjectData: any) => {
    const response = await api.post("admin/edit-subject", subjectData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    messageApi.open({
      content: "Subject information was edited successfully",
      duration: 4,
      type: "success",
    });
    dispatch(
      displayMessage({
        type: "success",
        context: "Subject information was updated successfully",
        duration: 5,
      })
    );
    dispatch(getSubject({ id: subjectObject._id }));
  };

  return (
    <div>
      {contextHolder}
      <AddSubjectForm
        onSubmit={updateSubjectInformationHandler}
        defaultValues={subjectObject}
      />
    </div>
  );
};

export default EditSubject;
