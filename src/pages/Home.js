import React, { useEffect, useState } from "react";
import MaterialTable, {
  Column,
  MTableToolbar,
  MTableBody,
  MTableHeader,
} from "@material-table/core";
import { userList } from "../api/userList";
import { Modal, Button } from "react-bootstrap";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Paper } from "@mui/material";

const lookup = { true: "Complete", false: "Incomplete" };

const columns = [
  { title: "USER ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "STATUS", field: "completed", lookup },
];

function Home() {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);

  const [userDetail, setUserDetail] = useState("");

  const getUserList = () => {
    userList()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTableData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const onCloseUserDetails = () => {
    setModal(false);
  };

  return (
    <div style={{ width: "100vw", padding: "50px" }}>
      <MaterialTable
        columns={columns}
        data={tableData}
        options={{
          actionsColumnIndex: 0,
          padding: "200x",
          pageSizeOptions: [5, 10, 20, 50, 100, 200],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          backgroundColor: "blue",
          columnsButton: true,
          exportButton: true,

          searchFieldStyle: {
            color: "black",
            backgroundColor: "whiteSmoke",
            borderRadius: "15px",

            margin: "5px",
            height: "40px",
            display: "flex",
            justifyContent: "space-around",
          },

          headerStyle: {
            backgroundColor: "#0892d0",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#73C2FB",
            color: "white",
          },

          exportMenu: [
            {
              label: "Export PDF",

              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "myPdfFileName"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "myCsvFileName"),
            },
          ],
        }}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                backgroundColor: "#063970",

                color: "white",
                borderRadius: "20px",
              }}
            >
              <MTableToolbar {...props} />
            </div>
          ),

          Container: (props) => (
            <div
              style={{
                backgroundColor: "#063970",
                color: "white",

                borderRadius: "30px",
              }}
            >
              <Paper {...props} />
            </div>
          ),
        }}
        title="TODO LIST"
        actions={[
          {
            icon: () => (
              <button
                className="btn btn-primary"
                style={{ marginRight: "100px", marginLeft: "50px" }}
              >
                View User
              </button>
            ),
            tooltip: "User Details",
            onClick: (event, rowData) => {
              setUserDetail(rowData);
              console.log(userDetail);
              setModal(true);
            },
          },
        ]}
      />
      {/* Modal */}
      {modal ? (
        <Modal
          show={modal}
          onHide={onCloseUserDetails}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Todo Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="p-1">
                <h5 className="text-primary">
                  UUID : {userDetail.tableData.uuid}
                </h5>
                <div className="input-group">
                  <label htmlFor="name" className="input-group-text ">
                    TODO ID :
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="title"
                    className="form-control "
                    defaultValue={userDetail.id}
                  />
                </div>
                <br />
                <div className="input-group">
                  <label htmlFor="name" className="input-group-text ">
                    TITLE :
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="title"
                    className="form-control "
                    defaultValue={userDetail.title}
                  />
                </div>
                <br />
                <div className="input-group">
                  <label htmlFor="name" className="input-group-text ">
                    COMPLETED :
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="title"
                    className="form-control "
                    defaultValue={userDetail.completed}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
export default Home;
