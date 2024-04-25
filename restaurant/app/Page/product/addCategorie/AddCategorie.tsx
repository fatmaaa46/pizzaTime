"use client";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { v4 } from 'uuid';

export default function AddCategorie() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let id=v4()
    await fetch(`http://localhost:8000/backend/restaurant/${card.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       card: {
            [id]: {
              id: id,
              color: "#FFFFFF",
              items: [],
              ranks: {
                default: 1,
                orderOverride: [
                  {
                    Order: 1,
                    IdShop: 2,
                  },
                ],
              },
              title: title,
              video: {
                url: "",
                type: "",
              },
              idCard: 1,
              archive: false,
              imageUrl: {
                Default: {
                  urlDefault:image,
                  salesSupport: [],
                },
                override: [
                  {
                    shopId: "",
                  },
                  {
                    info: [],
                    salesSupport: [],
                  },
                ],
              },
              reference: "00085",
              linkedTags: [],
              description: {
                Default: {
                  impression: [],
                  nameDefault: "",
                  salesSupport: [],
                },
              },
              displayName: {
                Default: {
                  impression: [],
                  nameDefault: "junior",
                },
              },
              linkedItems: [],
              categoryChild: [],
              categoryParent: "",
              visibilityInfo: {
                default: {
                  Emporter: {
                    id: "d99758ef-0049-4513-90fe-ca44bd069aac",
                    visibility: true,
                  },
                  Livraison: {
                    id: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
                    visibility: true,
                  },
                  "Sur place": {
                    id: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                    visibility: true,
                  },
                  Restaurant: {
                    id: "0f0e6661-8f11-4ed8-af32-55a53e45dfd2",
                    visibility: true,
                  },
                },
                isVisible: true,
                basicCompositionVisibility: true,
              },
              categoryLiaison: [],
              isNameDisplayed: false,
              linkedChildCategories: [],
              isInformationModeActivated: true,
            }
          
          }
      }),
    });

  };
  const cat: any = localStorage.getItem("card");
  let card:any = JSON.parse(cat || null);
  return (
    <div >
      <h1>Ajouter categorie</h1>
      
      <form className="form_main" action="">
        <div className="inputContainer">
          <input
            id="image"
            className="inputField"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>title</label>
          <input
            placeholder="Title"
            id="Title"
            className="inputField"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleSubmit}>add</Button>
      </form>
      
    </div>
  );
}
