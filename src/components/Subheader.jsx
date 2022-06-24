import {Role} from "../app/helpers/role";

const Subheader = ({filterText, onFilter, onClear, onCreate, user}) => (
    <>
        <form className="d-flex">
            <input
                className="form-control mr-2"
                type="text"
                placeholder="Пошук..."
                aria-label="Пошук..."
                id="search"
                value={filterText}
                onChange={onFilter}
            />
            <button
                className="btn btn-outline-dark ms-2"
                type="button" onClick={onClear}>
                Очистити
            </button>

            {onCreate && (user.role === Role.Admin || user.role === Role.Manager) &&
                <button
                    className="btn btn-outline-success ms-2"
                    type="button" onClick={onCreate}>
                    Створити
                </button>
            }
        </form>
    </>
);

export default Subheader;