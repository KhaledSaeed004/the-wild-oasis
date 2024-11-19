import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.OpenBtn opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.OpenBtn>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;
