// src/features/fees/FeeTable.jsx
import React, { useEffect, useState } from "react";
import FeeRow from "./FeeRow";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import FeeTableOperations from "./FeeOperations";
import { getAllFees } from "../../../services/apiAuth";

function FeeTable() {
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     // Fetch fees data
  //   //   fetch("http://localhost:3000/api/v1/fees", {
  //   //     method: "GET",
  //   //     headers: {
  //   //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   })
  //   //     .then((response) => response.json())
  //   //     .then((data) => {
  //   //       if (data.status === "success") {
  //   //         setFees(data.data.fees);
  //   //       } else {
  //   //         console.error("Error fetching fees:", data);
  //   //       }
  //   //     })
  //   //     .catch((error) => console.error("Fetch error:", error))
  //   //     .finally(() => setIsLoading(false));
  //   }, []
  // );

  useEffect(() => {
    async function fetchData() {
      const feesData = await getAllFees();
      console.log(feesData);

      if (feesData) {
        setFees(feesData); // Đặt đúng mảng dữ liệu từ API
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);
  if (isLoading) return <Spinner />;
  if (!fees.length) return <Empty resource="fee" />;

  return (
    <Menus>
      <Table columns="1.5fr 2fr 1.5fr 1fr 1fr 3.2rem">
        <Table.Header>
          <div>Student Name</div>
          <div>Contact</div>
          <div>Details</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees}
          render={(fee) => <FeeRow key={fee._id} fee={fee} />}
        />
      </Table>
      <Table.Footer>
        <Pagination count={fees.length} />
      </Table.Footer>
    </Menus>
  );
}

export default FeeTable;
