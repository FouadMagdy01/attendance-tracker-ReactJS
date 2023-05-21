import AuthNavigator from "./navigation/Auth";
import { useEffect } from "react";
import DashboardNavigator from "./navigation/Dashboard";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import classes from "./App.module.css";
import { fetchLocalToken } from "./store/authSlice/auth";
import { message } from "antd";
import InstructorsNavigator from "./navigation/Instructor";
function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const auth = useAppSelector((state) => state.auth);
  let isFirst = true;
  const dispatch = useAppDispatch();
  const messageCtx = useAppSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchLocalToken({}));
  }, []);

  const sendMessage = () => {
    if (isFirst) {
      return;
    }
    messageApi.open({
      type: messageCtx.messageType,
      content: messageCtx.messageContent,
      duration: messageCtx.messageDuration,
    });
  };

  useEffect(() => {
    isFirst = false;
    sendMessage();
  }, [messageCtx.messageId]);

  if (auth.isFetchingLocalToken) {
    return <></>;
  }
  return (
    <>
      {contextHolder}
      {auth.token ? (
        auth.authType === "Instructor" ? (
          <InstructorsNavigator />
        ) : (
          <DashboardNavigator />
        )
      ) : (
        <div className={classes.container}>
          <AuthNavigator />
        </div>
      )}
    </>
  );
}

export default App;
