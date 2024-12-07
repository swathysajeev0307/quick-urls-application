/* COPYRIGHT (C) 2024 - SWATHYMOL SAJEEV | GNU General Public License v3.0

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, 
either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>. */

const bookmarkForm = document.getElementById("bookmarkForm");
const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("siteUrl");
const bookmarkList = document.getElementById("bookmarkList");

bookmarkForm.addEventListener("submit", addBookmark);
document.addEventListener("DOMContentLoaded", displayBookmarks);

function addBookmark(event){
    event.preventDefault();

    const siteName = siteNameInput.value;
    const siteUrl = siteUrlInput.value;

    if(!validateForm(siteName,siteUrl)){
        return;
    }

    if(isDuplicateBookmark(siteName,siteUrl)){
        alert("This bookmark already exists");
        return;
    }

    const bookmark = {
        name:siteName,
        url:siteUrl,
    };

    saveBookmark(bookmark);

    displayBookmark(bookmark);

    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert("Please fill in both fields.");
        return;
    }

    try{
        new URL(siteUrl);
        return true;
    }catch(error){
        alert("Please enter a valid URL.");
        return false;
    }
}

function displayBookmark(bookmark){
    const bookmarkItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.name;
    link.target = "_blank";


    // removal of items

    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    removeButton.addEventListener("click", ()=>removeBookmark(bookmark));

    bookmarkItem.appendChild(link);
    bookmarkItem.appendChild(removeButton);
    bookmarkList.appendChild(bookmarkItem);
}

function saveBookmark(bookmark){

    let bookmarks = getBookmarks();
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

}

function getBookmarks(){

    return JSON.parse(localStorage.getItem("bookmarks")) || [];

}

function displayBookmarks(){

    let bookmarks = getBookmarks();
    bookmarks.forEach((bookmark)=>{
        displayBookmark(bookmark);
    })
}

function isDuplicateBookmark(siteName, siteUrl){

    let bookmarks = getBookmarks();

    return bookmarks.some(
        (bookmark) => 
            bookmark.name.toLowerCase() === siteName.toLowerCase() && bookmark.url.toLowerCase() === siteUrl.toLowerCase()
    );
}

function removeBookmark(bookmark){

    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(
        (b) =>
            b.name.toLowerCase() !== bookmark.name.toLowerCase() ||
            b.url.toLowerCase() !== bookmark.url.toLowerCase()
    );

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    clearBookmarkList();
    displayBookmarks();
}

function clearBookmarkList(){

    bookmarkList.innerHTML = "";

}