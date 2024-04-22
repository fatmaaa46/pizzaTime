"use client";
import Icons from "@/app/components/Icons/Icons";
import { setId } from "@/app/components/store";
import { useRouter } from "next/navigation";
import React from "react";
import { IoRestaurant } from "react-icons/io5";
import { HiMiniMapPin } from "react-icons/hi2";
import { Button } from "react-bootstrap";

function CardBoutique() {
  const router = useRouter();
  const [shopList, setShopList] = React.useState<any>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  
 const getShopList = async () => {
    let admin: any = localStorage.getItem("admin");
    admin = JSON.parse(admin || false);
    setIsAdmin(admin);
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log({ jsonData });
      setShopList(jsonData);
      localStorage.setItem("shop", JSON.stringify(jsonData));
      localStorage.setItem("shopLength", jsonData.length);
    } catch (e) {
      console.error("Login error", e);
    }
  };
  const goto = () => {
    router.push("/Page/product/addResto");
  };
  const navigateToOtherPage = (id: number) => {
    setId(id);
    localStorage.setItem("id", id.toString());
    var jsonString = JSON.stringify(shopList[id]?.card);
    console.log("tt",shopList,id);
    
    var jsonData = {
      workflow: shopList[Number(id)-1]?.card.workflow,
      categories: shopList[Number(id)-1]?.card.categories,
      items: shopList[Number(id)-1]?.card.items,
      id: shopList[Number(id)-1]?.id,
    };
console.log({jsonData});

    var jsonString = JSON.stringify(jsonData);
    localStorage.setItem("card", jsonString);

    router.push("/components/Boutiques");
  };

  const deleteResto = async () => {
    const cat: any = localStorage.getItem("card");
    let card: any = JSON.parse(cat || null);
    try {
      const response = await fetch(
        `http://localhost:8000/backend/restaurant/${card.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (e) {
      console.error("Login error", e);
    }
  };
  const updateResto = () => {
    router.push("/Page/product/updateResto");
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
              onClick={() => {
                localStorage.setItem("resto", JSON.stringify(item?.resto));
                localStorage.setItem(
                  "idResto",
                  JSON.stringify(item?.resto.shopid)
                );
                localStorage.setItem(
                  "latitude",
                  JSON.stringify(item?.resto.latitude)
                );
                localStorage.setItem(
                  "longitude",
                  JSON.stringify(item?.resto.longitude)
                );
              }}
            >
              <div className="box">
                <div
                  className="img-box"
                  onClick={() => navigateToOtherPage(item?.resto.shopid)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img src={item?.resto.image} className="box-img" alt="" />
                </div>
                <div className="detail-box">
                  <h4> {item?.resto.Company}</h4>
                  <p>
                    {" "}
                    <HiMiniMapPin />
                    {item?.resto.Address}, {item?.resto.PostalCode}{" "}
                    {item?.resto.town}
                  </p>
                </div>
                <div>
                  <Icons />
                </div>
                <br />
              </div>

              <div>{isAdmin === true ? (
                <Button onClick={deleteResto}> deleteResto</Button>
              ) : null}</div>
              <div><br />
              {isAdmin === true ? (
                <Button onClick={updateResto}>update resto</Button>
              ) : null}</div>
            </div>
          ))}
        </div>

       <div > {isAdmin === true ? <Button onClick={goto}>add resto</Button> : null}</div>
      </div>
    </section>
  );
}

export default CardBoutique;
