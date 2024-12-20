import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;
//     padding: 1.4rem 2.4rem;

//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }
// `;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-6px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { deleteCabin, isDeleting } = useDeleteCabin();
    const { createCabin } = useCreateCabin();

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    const handleDuplicate = () => {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    };

    const handleCabinDelete = () => {
        deleteCabin(cabinId);
    };

    return (
        <Table.Row>
            <Img src={image} alt="" />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity}</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            <Menus.Item
                                icon={<HiSquare2Stack />}
                                onClick={handleDuplicate}
                            >
                                Duplicate
                            </Menus.Item>
                            <Modal.OpenBtn opens="cabin-edit">
                                <Menus.Item icon={<HiPencil />}>
                                    Edit
                                </Menus.Item>
                            </Modal.OpenBtn>

                            <Modal.OpenBtn opens="cabin-delete">
                                <Menus.Item icon={<HiTrash />}>
                                    Delete
                                </Menus.Item>
                            </Modal.OpenBtn>
                        </Menus.List>

                        <Modal.Window name="cabin-edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>

                        <Modal.Window name="cabin-delete">
                            <ConfirmDelete
                                resourceName={`cabin ${name}`}
                                disabled={isDeleting}
                                onConfirm={handleCabinDelete}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
