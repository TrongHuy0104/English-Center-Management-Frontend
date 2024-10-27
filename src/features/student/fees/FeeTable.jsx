import FeeRow from "./FeeRow";
import useFee from "./useFee";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";

function FeeTable() {
    const {isLoading, fees, error} = useFee();
    
    if (isLoading) return <Spinner />;
    if (error) return <p>Error loading fees: {error.message}</p>;
    const TableHeader = ['Class', 'Fee Type', 'Due Date', 'Status', 'Amount']
    if (!fees?.length) return <Empty resource="fees" />;

    return (
        <Menus>
            <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    {TableHeader.map((item) => (
                    <div key={item}>{item}</div>
                ))}
                </Table.Header>

                <Table.Body
                    data={fees}
                    render={(fee) => (
                        <FeeRow key={fee._id} fee={fee} />
                    )}
                />
            </Table>
            <Table.Footer>
                <Pagination count={fees.length} />
            </Table.Footer>
        </Menus>
    );
}

export default FeeTable;