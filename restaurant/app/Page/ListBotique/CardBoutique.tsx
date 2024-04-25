"use client";
import Icons from "@/app/components/Icons/Icons";
import { setId } from "@/app/components/store";
import { Listcard } from "@/app/constants/Listcard";
import { useRouter } from "next/navigation";
import React from "react";
import { IoRestaurant } from "react-icons/io5";
import { HiMiniMapPin } from "react-icons/hi2";

function CardBoutique() {
  const router = useRouter();
  const [shopList, setShopList] = React.useState<any>([]);
  const getShopList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
     
      const jsonData = await response.json();
      console.log({jsonData});
      
      setShopList(jsonData);
      localStorage.setItem('shopLength',jsonData.length)
    } catch (e) {
      console.error("Login error", e);
    }
  };
  // Fonction pour naviguer vers une autre page avec l'ID
  const navigateToOtherPage = (id: number) => {
    setId(id);
    localStorage.setItem("id", id.toString());
    var jsonString = JSON.stringify(shopList[id]?.card);

    // Sample JSON data
    var jsonData = {}
    for(const key of shopList){
      if(key.resto.shopid ===id){
      jsonData={
      workflow: key?.card.workflow,
      categories: key?.card.categories,
      items: key?.card.items,
      id:key?.id,
    };
    }
  }

    // Convert JSON data to a string
    var jsonString = JSON.stringify(jsonData);

    // Store the JSON string in localStorage
    localStorage.setItem("card", jsonString);

    router.push("/components/Boutiques");
  };

  React.useEffect(() => {
    getShopList();
  }, []);
  return (
    <section className="news_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            {" "}
            <IoRestaurant /> Bienvenue au Pizza Time <IoRestaurant />
          </h2>
        </div>

        <div className="row">
          {Object.values(shopList).map((item: any, id: number) => (
            <div
              className="col-md-4 my-3"
              key={id}
              onClick={() =>{    localStorage.setItem("resto", JSON.stringify(item.resto));
              navigateToOtherPage(item.resto.shopid)}}
              style={{
                cursor: "pointer",
              }}
            >
              <div className="box">
                <div className="img-box">
                  <img src={item.resto.image} className="box-img" alt="" />
                </div>
                <div className="detail-box">
                  <h4> {item.resto.Company}</h4>
                  <p>
                    {" "}
                    <HiMiniMapPin />
                    {item.resto.Address}, {item.resto.PostalCode} {item.resto.town}
                  </p>
                </div>
                <div>
                  <Icons />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardBoutique;
