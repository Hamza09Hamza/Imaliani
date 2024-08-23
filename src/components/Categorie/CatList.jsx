import React from "react";

const CatList = ({ list, setList, listcat, toggleSidebar, status }) => {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center  mt-2 ms-3 text-sm  rounded-lg sm:hidden hover:bg-gray-50 focus:outline-none  bg-gray-50 "
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`z-40 h-screen transition-transform transform sm:translate-x-0 ${
          status ? "" : "hidden"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full lg:py-4  overflow-y-auto bg-gray-50">
          <ul className="font-medium pb-40">
            {list.map((item) => (
              <li key={item}>
                <div
                  className={`lg:text-lg mid:text-small px-2 mt-2 py-1 lg:py-4 hover:bg-white cursor-pointer hover:border-l-8 hover:border-l-hardBeige transition-all duration-500 ${
                    listcat === item
                      ? "border-l-8 border-l-hardBeige bg-white"
                      : ""
                  }`}
                  onClick={() =>
                    item !== "Customized gifts"
                      ? setList(item)
                      : window.location.assign("/categories/customized-gifts")
                  }
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default CatList;
