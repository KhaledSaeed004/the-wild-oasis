import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useLoseFocus } from "../hooks/useLoseFocus";

const Menu = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: absolute;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: 0;
    top: calc(100% + 8px);
    z-index: 999;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    & span {
        line-height: 1.4rem;
        white-space: nowrap;
    }
`;

const MenusContext = createContext();

function Menus({ children }) {
    const [openId, setOpenId] = useState("");

    const openMenu = (id) => setOpenId(id);
    const closeMenu = () => setOpenId("");

    return (
        <MenusContext.Provider value={{ openId, openMenu, closeMenu }}>
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }) {
    const { openId, openMenu, closeMenu } = useContext(MenusContext);

    const handleClick = (e) => {
        e.stopPropagation();

        if (openId === "" || openId !== id) {
            openMenu(id);
        } else {
            closeMenu();
        }
    };

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }) {
    const { openId, closeMenu } = useContext(MenusContext);
    const { ref } = useLoseFocus({
        onClickAway: closeMenu,
        preventbubbling: false,
    });

    if (openId !== id) return null;

    return <StyledList ref={ref}>{children}</StyledList>;
}

function Item({ children, icon, onClick }) {
    const { closeMenu } = useContext(MenusContext);

    const handleClick = () => {
        onClick?.();
        closeMenu();
    };

    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon && icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;

export default Menus;
