import React, {Component} from 'react';
import Footer from '../components/Footer';
import DocumentMeta from 'react-document-meta';
import {Meta} from '../components/Meta/Meta';

class Home extends Component {
    render() {

      return (
          <div>
            <Meta/>
            <div className = {localStorage.getItem('dark_mode') == 'true' ? "section dark" : "section white"}>
              <div className = "row container" style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <a href="https://www.facebook.com/nhatsdevil.mc" style={localStorage.getItem('dark_mode') == 'true' ? {color: "#fff"} : {color: "#414141"}}><h1>Hi</h1></a>
                <a href="https://www.facebook.com/nhatsdevil.mc" style={localStorage.getItem('dark_mode') == 'true' ? {color: "#ffffff96"} : {color: "#414141"}}><span>Designed by Laven Studio in Ho Chi Minh city</span></a>
                <a href="https://www.facebook.com/nhatsdevil.mc" style={localStorage.getItem('dark_mode') == 'true' ? {color: "#ffffff96", fontSize: "12px", fontWeight: "500", position: "absolute", bottom: "8px", right: "16px"} : {color: "#414141", fontSize: "12px", fontWeight: "500", position: "absolute", bottom: "8px", right: "16px"}}><span>Build [13.DEC.2020]</span></a>
              </div>
            </div>
          </div>
      )
    }
}

export default Home;