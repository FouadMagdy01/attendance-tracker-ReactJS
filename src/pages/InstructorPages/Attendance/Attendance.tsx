import { useNavigate, useParams } from "react-router-dom";
import classes from "./Attendance.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/api";
import { QRCode } from "antd";
import attendanceSocket from "../../../sockets/attendance";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import CustomTable from "../../../components/CustomTable/CustomTable";
import Button from "../../../components/Buttons/Button";
const Attendance = () => {
  const params = useParams();
  const navigate = useNavigate();
  const lectureId = params.lectureId;
  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
  ];
  const [attendees, setAttendees] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    attendanceSocket.on("connect", () => {
      attendanceSocket.emit("attendance", lectureId);
    });

    attendanceSocket.on("new attendee", (data) => {
      setAttendees(data);
    });
  }, []);

  const generateAndUpdate = async (length: any) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    console.log(result);
    setLoading(true);
    const res = await api.post(
      "/instructor/attendance",
      {
        newQr: result,
        lectureId,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    generateAndUpdate(12);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      generateAndUpdate(12);
    }, 600000000000000000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <LoadingOverlay loadingDesc="Generating the QR Code" />;
  }

  return (
    <div>
      {attendees && (
        <>
          <div className={classes.container}>
            <div className={classes.table}>
              <p className={classes.attendanceCount}>
                Total attendees: {attendees.attendees.length}
              </p>
              <CustomTable
                rowKey={"_id"}
                tableConfigProps={{
                  className: classes.table,
                }}
                columns={columns}
                dataSource={attendees.attendees}
              />
              <Button
                buttonLabel="Terminate Session"
                buttonConfigProps={{
                  onClick: async () => {
                    await generateAndUpdate(36);
                    navigate("/Home");
                  },
                }}
                sxStyles={{
                  height: "50px",
                  textTransform: "none",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "#8a2922",
                  },
                }}
              />
            </div>
            <QRCode
              errorLevel="M"
              value={attendees.activeQR}
              color="black"
              size={600}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
