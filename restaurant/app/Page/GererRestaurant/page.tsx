"use client"
import React, { useState } from 'react';
import { LuUserCircle2 } from 'react-icons/lu';
import { TbShoppingBagCheck } from "react-icons/tb";
import Users from './Users';


const Blog: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row content">
        <Sidebar />
        <MainContent />
        {/* <Users />  */}

      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>(''); // État pour gérer l'élément sélectionné

  const handleItemClick = (item: string) => {
    console.log('Clicked:', item);
    setSelectedItem(item);
  };

  return (

    <div className="col-sm-3 sidenav">
      <div className="grid flex-row-6 gap-5 p-4">
        <hr />
        <div className="flex gap-1  " style={{ cursor: "pointer" }} onClick={() => handleItemClick('USERS')}>
          <LuUserCircle2 size={30} />
          <p className="text-2xl" >USERS</p>
        </div>
        <div className="flex gap-1" style={{ cursor: "pointer" }} onClick={() => handleItemClick('RESTAURANT')}>
          <TbShoppingBagCheck size={30} />
          {/* <p className="text-2xl">RESTAURANT</p> */}
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown link
            </a>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const [content, setContent] = useState<string>(''); // État pour gérer le contenu principal

  // Mettre à jour le contenu principal en fonction de l'élément sélectionné
  const updateContent = (selectedItem: string) => {
    if (selectedItem === 'USERS') {
      setContent('Contenu pour USERS');
    } else if (selectedItem === 'RESTAURANT') {
      setContent('Contenu pour RESTAURANT');
    }
  };

  return (
    <div className="col-sm-9">
      <h4><small>RECENT POSTS</small></h4>
      <hr />
      {content && <p>{content}</p>} {/* Afficher le contenu selon la sélection */}
    </div>
  );
};

export default Blog;