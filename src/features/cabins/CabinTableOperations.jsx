import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="discount"
                options={[
                    {
                        label: "All",
                        value: "all",
                    },
                    {
                        label: "No discount",
                        value: "no-discount",
                    },
                    {
                        label: "With discount",
                        value: "with-discount",
                    },
                ]}
            />

            <SortBy
                options={[
                    {
                        label: "Sort by name (A-Z)",
                        value: "name-asc",
                    },
                    {
                        label: "Sort by name (Z-A)",
                        value: "name-desc",
                    },
                    {
                        label: "Sort by price (cheapest)",
                        value: "regularPrice-asc",
                    },
                    {
                        label: "Sort by price (most expensive)",
                        value: "regularPrice-desc",
                    },
                    {
                        label: "Sort by capacity (lowest)",
                        value: "maxCapacity-asc",
                    },
                    {
                        label: "Sort by capacity (highest)",
                        value: "maxCapacity-desc",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
