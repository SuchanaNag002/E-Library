"use client";
import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "@/context/authContext";
import "@/styles/CartAndMybooks/CartAndMyBooks.css";
import apiCaller from "@/api/apiCaller";
import ActionButtons from "@/components/Login/actionButtons/ActionButtons";
import { useRouter } from "next/navigation";

async function fetchCartData(list, setter, myBooks) {
  if (list && list.length > 0) {
    const listData = await Promise.all(
      myBooks
        ? list.map((bookData) => apiCaller.searchByID(bookData.id))
        : list.map((bookId) => apiCaller.searchByID(bookId))
    );
    console.log("Fetched myBooks items:", listData);
    setter(listData);
  } else {
    console.log("No items");
    setter([]);
  }
}

const CartPageComponent = (props) => {
  const { userDetails, setUserDetails } = UserAuth();
  const [Items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const prevMyBooksRef = useRef([]);
  const prevUserDetailsRef = useRef(null);
  useEffect(() => {
    if (userDetails) {
      if (prevUserDetailsRef.current !== userDetails) {
        prevUserDetailsRef.current = userDetails;

        apiCaller
          .getUserDetails(userDetails.email, userDetails.name)
          .then((updatedUserDetails) => {
            setUserDetails(updatedUserDetails);
          })
          .catch((error) => {
            console.error("Error fetching updated user details:", error);
          });
        const { cart, myBooks } = userDetails;
        const prevMyBooksIds = prevMyBooksRef.current.map((book) => book._id);
        const bookList = !props.myBooks ? cart : myBooks;
        const currentMyBooksIds = bookList?.map((book) => book._id);

        if (
          JSON.stringify(prevMyBooksIds) !== JSON.stringify(currentMyBooksIds)
        ) {
          prevMyBooksRef.current = bookList;
          if (!bookList || bookList.length === 0) {
            setIsLoading(false);
            setItems([]); // Set Items to an empty array
          } else {
            fetchCartData(bookList, setItems, props.myBooks).then(() =>
              setIsLoading(false)
            );
          }
        } else if (!bookList || bookList.length === 0) {
          // Handle case where Items is empty on initial load
          setIsLoading(false);
          setItems([]); // Set Items to an empty array
        }
      }
    }
  }, [userDetails]);
  function calculateValidFromDate(itemId) {
    const bookItem = userDetails.myBooks.find((book) => book.id === itemId);
    if (bookItem) {
      const bookDate = new Date(bookItem.time);
      const datePart = bookDate.toDateString(); // Outputs: Tue Oct 10 2023
      const timePart = `${bookDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${bookDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${bookDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const fromDate = `${datePart} ${timePart}`;

      const timePart1 = new Date(bookDate.getTime() + 48 * 60 * 60 * 1000); 
      const toDate = `${timePart1.toDateString()} ${timePart1
        .getHours()
        .toString()
        .padStart(2, "0")}:${timePart1
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${timePart1
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      return [fromDate, toDate];
    }
    return ["", ""];
  }

  if (isLoading) {
    return (
      <div className="cart__loading">
        <div className="cart__spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!userDetails) return null;
  return (
    <div>
      <div className="cart__page">
        {!props.myBooks ? (
          <h1 className="cart__heading">Cart Page for : {userDetails.name}</h1>
        ) : (
          <h1 className="cart__heading">
            My Books Page for : {userDetails.name}
          </h1>
        )}

        {Items.length > 0 ? (
          Items.map((item) => (
            <div key={item._id} className="cart__item">
              <img
                src={item.coverLink}
                alt={item.name}
                className="cart__item__image"
              />
              <div className="cart__content">
                <div className="cart__item__details">
                  <h3>{item.name}</h3>
                  <p>By {item.author}</p>
                  {props.myBooks && (
                    <div className="flex flex-wrap gap-2 mr-3">
                      <p>
                        Valid From: <b>{calculateValidFromDate(item._id)[0]}</b>
                      </p>{" "}
                      <p>
                        Valid To: <b>{calculateValidFromDate(item._id)[1]}</b>
                      </p>
                    </div>
                  )}
                </div>
                {!props.myBooks && <ActionButtons details={item} />}
                {props.myBooks && (
                  <button
                    className="read__button"
                    onClick={() => router.push(`/BookDetails/${item._id}`)}
                  >
                    {" "}
                    READ{" "}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="cart__loading">No items Available.</div>
        )}
      </div>
    </div>
  );
};

export default CartPageComponent;
