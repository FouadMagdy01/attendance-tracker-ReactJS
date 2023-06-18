import AddSubjectForm from "../../../components/Forms/SubjectForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/apis/api";
import { getSubject } from "../../../store/subjectsSlice/reducers/getSubject";
import { displayMessage } from "../../../store/messageSlice/message";

const EditSubject = () => {
  const { subjectObject } = useAppSelector((state) => state.subject);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const updateSubjectInformationHandler = async (subjectData: any) => {
    const response = await api.post("admin/edit-subject", subjectData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
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
      <AddSubjectForm
        onSubmit={updateSubjectInformationHandler}
        defaultValues={subjectObject}
      />
    </div>
  );
};

export default EditSubject;
