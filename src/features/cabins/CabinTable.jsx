import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resourceName="cabins" />;

    // Filter cabins based on the discount query parameter
    const discountFilter = searchParams.get("discount") || "all";

    let filteredCabins;
    if (discountFilter === "all") filteredCabins = cabins;
    else if (discountFilter === "no-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    else if (discountFilter === "with-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

    // Sort cabins based on the sort query parameter
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, order] = sortBy.split("-");
    const modifier = order === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
