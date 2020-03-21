import React, { Fragment } from "react";
import Layout from "../core/Layout";
import { PAGE_ID } from "../config";

const MessengerChat = () => {

    const showFBMessenger = () => {
        window.fbAsyncInit = function() {
            window.FB.init({
              xfbml            : true,
              version          : 'v6.0'
            });
          };

          (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };

    return (
        <Fragment>
            <div id="fb-root"></div>
            {showFBMessenger()}
            <div className="fb-customerchat"
                // attribution=setup_tool
                page_id={PAGE_ID}>
            </div>
        </Fragment>
    );
};

export default MessengerChat;
