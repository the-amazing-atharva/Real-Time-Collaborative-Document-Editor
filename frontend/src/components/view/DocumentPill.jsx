// import menu from '../../assets/menu-icon.svg';
// import {Fragment, useEffect} from 'react'
// import {Menu, Transition} from '@headlessui/react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
// import ShareIcon from '@mui/icons-material/Share';
// import {useState} from 'react';
// import Rename from './Rename';
// import Delete from './Delete';
// import Share from './Share';
// import {useNavigate} from "react-router-dom";
// import SharedWith from "./SharedWith.jsx";
// import {MenuItem} from "@mui/material";

// export default function DocumentPill({file, files, setFiles}) {
//     const [rename, setRename] = useState(false);
//     const [deleteDoc, setDeleteDoc] = useState(false);
//     const [share, setShare] = useState(false);
//     const [sharedWith, setSharedWith] = useState(false);
//     const username = localStorage.getItem('username');
//     const [isOwner] = useState(file.owner === username);
//     const [isEditor] = useState(file.sharedWith.some(shared => shared.username === username && shared.permission === 'EDIT'));

//     const navigate = useNavigate();

//     // useEffect(() => {
//     //     setIsOwner(file.owner === username);
//     //     setIsEditor(file.sharedWith.some(shared => shared.username === username && shared.permission === 'EDIT'));
//     // }, []);

//     return (<div
//         className="flex justify-between items-center mb-4 py-4 pl-8 bg-white rounded-lg shadow-md w-10/12 hover:bg-blue-300 cursor-pointer"
//         onClick={(e) => {
//             if (e.target.closest('button') || e.target.closest('div[role="dialog"]')) e.stopPropagation(); else navigate(`/edit/${file.id}`, {state: file.title});
//             // Router.push(`/edit/${file._id}`);
//         }}
//     >
//         <h1 className="text-[#5f6368] font-['Product_sans'] truncate basis-7/12 text-xl font-bold">{file.title}</h1>
//         <p className="text-[#5f6368] font-['Product_sans'] truncate text-center basis-2/12 text-md">{file.owner}</p>
//         <div
//             className="text-[#5f6368] font-['Product_sans'] truncate text-center basis-2/12 text-md flex justify-center">
//             <button onClick={() => {
//                 setSharedWith(file.sharedWith.length > 0);
//             }}
//                     className='hover:bg-slate-400 w-10 h-10  rounded-full flex justify-center p-2.5 inline-flex items-center'>{file.sharedWith.length}</button>
//         </div>
//         <Rename open={rename} setOpen={setRename} file={file} files={files} setFiles={setFiles}/>
//         <Delete open={deleteDoc} setOpen={setDeleteDoc} file={file} files={files} setFiles={setFiles}/>
//         <Share open={share} setOpen={setShare} title={file.title} docId={file.id} setFiles={setFiles}/>
//         <SharedWith open={sharedWith} setOpen={setSharedWith} shares={file.sharedWith} docId={file.id}
//                     setFiles={setFiles} isViewer={!isOwner && !isEditor}/>

//         <Menu as='div' className="relative inline-block basis-1/12 text-center"
//               onClick={(e) => e.stopPropagation()}
//         >
//             <Menu.Button type="button"
//                          className="hover:bg-slate-400 rounded-full p-2.5 inline-flex items-center me-2">
//                 <img src={menu} alt="Menu" width={20} height={20}/>
//             </Menu.Button>
//             <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//             >
//                 <Menu.Items
//                     className="absolute font-['Product_sans'] right-0 z-10 mt-2 w-56 p-2 text-left origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <div className="py-1">
//                         {isOwner && <Menu.Item>
//                             <div
//                                 onClick={() => setDeleteDoc(true)}
//                                 className='hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md'>
//                                 <DeleteIcon sx={{color: '#5f6368', marginRight: 1}}/>
//                                 Delete
//                             </div>
//                         </Menu.Item>}
//                         {(isEditor || isOwner) && <Menu.Item>
//                             <div
//                                 onClick={() => setRename(true)}
//                                 className='hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md'
//                             >
//                                 <DriveFileRenameOutlineRoundedIcon sx={{color: '#5f6368', marginRight: 1}}/>
//                                 Rename
//                             </div>
//                         </Menu.Item>}
//                         {(isEditor || isOwner) && <Menu.Item>
//                             <div
//                                 onClick={() => setShare(true)}
//                                 className='hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md'
//                             >
//                                 <ShareIcon sx={{color: '#5f6368', marginRight: 1}}/>
//                                 Share
//                             </div>
//                         </Menu.Item>}
//                         {!isOwner && !isEditor && <p className='p-2 text-center text-gray-500 hover:cursor-default'>
//                             Viewers have no control
//                         </p>}
//                     </div>

//                 </Menu.Items>
//             </Transition>
//         </Menu>

//     </div>)
// }

import menu from "../../assets/menu-icon.svg";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import Rename from "./Rename";
import Delete from "./Delete";
import Share from "./Share";
import { useNavigate } from "react-router-dom";
import SharedWith from "./SharedWith.jsx";
import { MenuItem } from "@mui/material";

export default function DocumentPill({ file, files, setFiles }) {
  const [rename, setRename] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState(false);
  const [share, setShare] = useState(false);
  const [sharedWith, setSharedWith] = useState(false);
  const username = localStorage.getItem("username");
  const [isOwner] = useState(file.owner === username);
  const [isEditor] = useState(
    file.sharedWith.some(
      (shared) => shared.username === username && shared.permission === "EDIT"
    )
  );

  // ADDED: Logic to determine the user's highest permission level
  const userPermission = isOwner
    ? "OWNER"
    : isEditor
    ? "EDITOR"
    : file.sharedWith.some((shared) => shared.username === username)
    ? "VIEWER"
    : "OTHER";

  // ADDED: Mapping to display badge style and text
  const getPermissionBadge = () => {
    switch (userPermission) {
      case "OWNER":
        return { text: "OWNER", color: "bg-red-500" };
      case "EDITOR":
        return { text: "CAN EDIT", color: "bg-yellow-500" };
      case "VIEWER":
        return { text: "CAN VIEW", color: "bg-green-500" };
      default:
        return { text: "", color: "" };
    }
  };

  const badge = getPermissionBadge();

  const navigate = useNavigate();

  // useEffect(() => {
  //     setIsOwner(file.owner === username);
  //     setIsEditor(file.sharedWith.some(shared => shared.username === username && shared.permission === 'EDIT'));
  // }, []);

  return (
    <div
      className="flex justify-between items-center mb-4 py-4 pl-8 bg-white rounded-lg shadow-md w-10/12 hover:bg-blue-300 cursor-pointer"
      onClick={(e) => {
        if (
          e.target.closest("button") ||
          e.target.closest('div[role="dialog"]')
        )
          e.stopPropagation();
        else navigate(`/edit/${file.id}`, { state: file.title });
        // Router.push(`/edit/${file._id}`);
      }}
    >
      <h1 className="text-[#5f6368] font-['Product_sans'] truncate basis-7/12 text-xl font-bold">
        {file.title}
      </h1>
      <p className="text-[#5f6368] font-['Product_sans'] truncate text-center basis-2/12 text-md">
        {file.owner}
      </p>
      <div className="text-[#5f6368] font-['Product_sans'] truncate text-center basis-2/12 text-md flex justify-center items-center">
        {/* ADDED: Permission Badge */}
        {badge.text && (
          <span
            className={`text-white text-xs px-2 py-1 rounded-full font-bold me-2 ${badge.color}`}
          >
            {badge.text}
          </span>
        )}
        {/* END ADDED */}

        <button
          onClick={() => {
            setSharedWith(file.sharedWith.length > 0);
          }}
          className="hover:bg-slate-400 w-10 h-10  rounded-full flex justify-center p-2.5 inline-flex items-center"
        >
          {file.sharedWith.length}
        </button>
      </div>
      <Rename
        open={rename}
        setOpen={setRename}
        file={file}
        files={files}
        setFiles={setFiles}
      />
      <Delete
        open={deleteDoc}
        setOpen={setDeleteDoc}
        file={file}
        files={files}
        setFiles={setFiles}
      />
      <Share
        open={share}
        setOpen={setShare}
        title={file.title}
        docId={file.id}
        setFiles={setFiles}
      />
      <SharedWith
        open={sharedWith}
        setOpen={setSharedWith}
        shares={file.sharedWith}
        docId={file.id}
        setFiles={setFiles}
        isViewer={!isOwner && !isEditor}
      />

      <Menu
        as="div"
        className="relative inline-block basis-1/12 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Menu.Button
          type="button"
          className="hover:bg-slate-400 rounded-full p-2.5 inline-flex items-center me-2"
        >
          <img src={menu} alt="Menu" width={20} height={20} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute font-['Product_sans'] right-0 z-10 mt-2 w-56 p-2 text-left origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {isOwner && (
                <Menu.Item>
                  <div
                    onClick={() => setDeleteDoc(true)}
                    className="hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md"
                  >
                    <DeleteIcon sx={{ color: "#5f6368", marginRight: 1 }} />
                    Delete
                  </div>
                </Menu.Item>
              )}
              {(isEditor || isOwner) && (
                <Menu.Item>
                  <div
                    onClick={() => setRename(true)}
                    className="hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md"
                  >
                    <DriveFileRenameOutlineRoundedIcon
                      sx={{ color: "#5f6368", marginRight: 1 }}
                    />
                    Rename
                  </div>
                </Menu.Item>
              )}
              {(isEditor || isOwner) && (
                <Menu.Item>
                  <div
                    onClick={() => setShare(true)}
                    className="hover:bg-gray-200 text-gray-900 block pl-2 pr-4 py-2 text-sm rounded-md"
                  >
                    <ShareIcon sx={{ color: "#5f6368", marginRight: 1 }} />
                    Share
                  </div>
                </Menu.Item>
              )}
              {!isOwner && !isEditor && (
                <p className="p-2 text-center text-gray-500 hover:cursor-default">
                  Viewers have no control
                </p>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
