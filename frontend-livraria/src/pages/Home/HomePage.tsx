import React from "react";
import { NavBarComponent } from "../../components/NavBar/NavBarComponent";
import { ListBooksComponent } from "../../components/ListBooks/ListBooksComponent";

export const HomePage: React.FC = () => {
  return (
    <div>
      <NavBarComponent />
      <ListBooksComponent />
    </div>
  );
};
