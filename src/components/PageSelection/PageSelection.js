import React, { Component } from "react";

import Tasks from "../Pages/Tasks/Tasks";
import Error404 from "../Pages/Error404/Error404";
import OptionsPage from "../Pages/Options/Options";

import("./PageSelection.css");

export const PAGE = {
   HOME: "home",
   LOGIN: "login",
   LOTOUT: "logout",
   TASKS: "tasks",
   OPTION: "options"
};

class PageSelection extends Component {
   render() {
      let { page, openPage } = this.props;

      switch (page) {
         case PAGE.OPTION:
            return (
               <div className="PageSelection">
                  <OptionsPage openPage={openPage} />
               </div>
            );
         case PAGE.HOME:
            return <div className="PageSelection"> </div>;
         case PAGE.LOGIN:
            return <div className="PageSelection"> </div>;
         case PAGE.LOTOUT:
            return <div className="PageSelection"> </div>;
         case PAGE.TASKS:
            return (
               <div className="PageSelection">
                  <Tasks openPage={openPage} />
               </div>
            );
         default:
            return (
               <div className="PageSelection">
                  <Error404 openPage={openPage} />
               </div>
            );
      }
   }
}

export default PageSelection;
