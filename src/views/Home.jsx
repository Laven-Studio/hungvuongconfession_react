import React, {Component} from 'react';
import Footer from '../components/Footer';
import DocumentMeta from 'react-document-meta';
import {Meta} from '../components/Meta/Meta';
import {ConfessPost} from '../components/Posts/Post';

class Home extends Component {
    render() {

      return (
          <div>
            <Meta/>
            <ConfessPost school_id="gdtx"/>
          </div>
      )
    }
}

export default Home;