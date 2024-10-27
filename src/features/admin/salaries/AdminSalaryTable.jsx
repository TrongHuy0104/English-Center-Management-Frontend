import SalaryRow from "./AdminSalaryRow";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSalary from "./useSalary";
import CreateNewSalaryForm from "./AdminCreateNewSalaryForm"; // Form để tạo Salary mới
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { CreateSalary, deleteSalary } from "../../../services/apiSalary.js";

const StyledButton = styled(Button)`
    color: white;
    background-color: #4f46e5;
    padding: 8px 16px; /* Giảm kích thước nút */
    font-size: 14px; /* Giảm kích thước chữ */
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4338ca;
    }

    margin-left: auto;
    display: block;
`;

const PAGE_SIZE = 10;

function AdminSalaryTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const {
        isLoading,
        salaries: initialSalaries,
        error,
    } = useSalary(currentPage, PAGE_SIZE);
    const [salaries, setSalaries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (initialSalaries && Array.isArray(initialSalaries.salaries)) {
            setSalaries(initialSalaries.salaries);
        }
    }, [initialSalaries, currentPage]);
    console.log("initialSalaries", initialSalaries);

    const handleUpdateSalary = (updatedSalary) => {
        setSalaries((prevSalaries) =>
            prevSalaries.map((salary) =>
                salary._id === updatedSalary._id ? updatedSalary : salary
            )
        );
    };

    const handleDeleteSalary = async (id) => {
        try {
            await deleteSalary(id); // Gọi API xóa
            setSalaries((prevSalaries) =>
                prevSalaries.filter((salary) => salary._id !== id)
            );
        } catch (error) {
            console.error("Error deleting salary:", error);
        }
    };

    const handleCreateSalary = async (newSalaryData) => {
        try {
            const response = await CreateSalary(newSalaryData);

            if (response?.data?.data) {
                setSalaries((prevSalaries) => [
                    ...prevSalaries,
                    response.data.data,
                ]);
                setShowModal(false);
            } else {
                console.error(
                    "Failed to create Salarie: No data returned from server"
                );
            }
        } catch (error) {
            console.error(
                "Error creating Salary:",
                error.response?.data || error.message
            );
        }
    };

    const toggleModal = () => setShowModal(!showModal); // Toggle modal

    if (isLoading) return <Spinner />;
    if (error) return <p>Error loading salaries: {error.message}</p>;
    if (!salaries?.length) return <Empty resource="salaries" />;

    return (
        <Menus>
            <Modal>
                <Modal.Open opens="create-salary">
                    <StyledButton onClick={toggleModal}>
                        Create New Salary
                    </StyledButton>
                </Modal.Open>

                <Modal.Window name="create-salary">
                    <CreateNewSalaryForm
                        onSubmit={handleCreateSalary}
                        onCloseModal={toggleModal}
                    />
                </Modal.Window>
            </Modal>

            <Table columns="2.5fr 2.5fr 2.5fr 1.5fr 3.2rem">
                <Table.Header>
                    <div>Teacher name</div>
                    <div>Time</div>
                    <div>Salary</div>
                    <div>status</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={salaries}
                    render={(salary) => (
                        <SalaryRow
                            key={salary._id}
                            salary={salary}
                            onDelete={(e) => handleDeleteSalary(salary._id)}
                            onUpdate={handleUpdateSalary}
                        />
                    )}
                />
            </Table>

            <Table.Footer>
                <Pagination count={initialSalaries?.total} />
            </Table.Footer>
        </Menus>
    );
}

export default AdminSalaryTable;
