"use client";
import React, { useEffect, useState } from "react";
import apiCaller from "@/api/apiCaller";
import { UserAuth } from "@/context/authContext";
import { usePathname } from "next/navigation";

function bookInArray(id, array) {
  if (!array) return false;
  const index = array.findIndex(
    (book_id) => book_id.toString() === id.toString()
  );
  return index >= 0;
}
function bookInMyBooks(id, array) {
  if (!array) return false;
  const index = array.findIndex((data) => data.id.toString() === id.toString());
  return index >= 0;
}

const ActionButtons = (props) => {
  const { user, userDetails, setUserDetails } = UserAuth();
  const [inCart, setInCart] = useState(false);
  const [inMyBooks, setInMyBooks] = useState(false);
  const pathname = usePathname();
  //console.log(pathname);
  const book = props.details;
  function addToCart() {
    apiCaller.addToCart(user.email, book._id).then((data) => {
      if (data && data.success) {
        setUserDetails(data.value);
      }
    });
  }
  function addToMyBooks() {
    apiCaller.addToMyBooks(user.email, book._id).then((data) => {
      if (data && data.success) {
        setUserDetails(data.value);
      }
      // Loop through myBooks array and display id and time
      // if (userDetails && userDetails.myBooks) {
      //   userDetails.myBooks.forEach((bookInfo) => {
      //     console.log("Book ID:", bookInfo.id);
      //     console.log("Time Added:", bookInfo.time);
      //   });
      // }
    });
  }

  useEffect(() => {
    if (userDetails && bookInArray(book._id, userDetails.cart)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
    if (userDetails && bookInMyBooks(book._id, userDetails.myBooks)) {
      setInMyBooks(true);
    } else {
      setInMyBooks(false);
    }
    //console.log(userDetails)
  }, [userDetails]);
  if (!user || !userDetails) return null;
  return (
    <div className="card__buttons flex">
      <button
        className={"card__borrow " + (inMyBooks ? " inMyBooks" : "")}
        // id={book.count <= book.Borrow.length ? "inActiveButton" : ""}
        onClick={addToMyBooks}
      >
        {inMyBooks ? "Remove" : "Borrow"}
      </button>
      <button
        className={"card__cart " + (inCart ? " inCart" : "")}
        onMouseDown={addToCart}
      >
        {pathname === "/CartPage"
          ? inCart
            ? "Remove"
            : "Removing..."
          : inCart
          ? "Remove From Cart"
          : "Add To Cart"}
      </button>
    </div>
  );
};

export default ActionButtons;
