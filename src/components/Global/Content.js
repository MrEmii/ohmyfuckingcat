import React, { Component } from 'react';

import './css/Content.css';

import imagentest from '../cats/gato-gesto.jpg';
import download from './images/download.png';
import share from './images/share.png';

import $ from 'jquery';

export default class Content extends Component {
  
  constructor(){
    super();
    this.state = {
      current: null,
      entries: {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": []        
      }
    }
  }
  componentDidMount(){
    
    function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
    };


    var img = getUrlParameter('current');
    try{
      if(img){      
        fetch('http://127.0.0.1:3001/api/check', {
          method: 'POST',
          body: {
            path: atob(img)
          }
          
        }).then(response => {
          return response.json()
        }).then(json => {
          if(json.code == 400){
            this.setState({
                current: window.location.origin+'/static/media/'+atob(img)
              }, () => {
                var modal = document.getElementById('mmodal');   
                modal.style.display = 'flex';
             })
          }
        })
      }
    }
    catch(ignored){}



    var modal = document.getElementById('mmodal');    

    window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
                this.setState({
                  current: null
                })
            }
    }
    

    function chunkify(a, n, balanced) {

if (n < 2)
return [a];

var len = a.length,
  out = [],
  i = 0,
  size;

if (len % n === 0) {
size = Math.floor(len / n);
while (i < len) {
  out.push(a.slice(i, i += size));
}
}

else if (balanced) {
while (i < len) {
  size = Math.ceil((len - i) / n--);
  out.push(a.slice(i, i += size));
}
}

else {

n--;
size = Math.floor(len / n);
if (len % size === 0)
  size--;
while (i < size * n) {
  out.push(a.slice(i, i += size));
}
out.push(a.slice(size * n));

}

return out;
  }

    fetch('http://127.0.0.1:3001/api/cats', {
      method: 'POST',
      
    }).then(response => {
      return response.json()
    }).then(json => {
      var a = chunkify(json, 7, true)
      this.setState({
        entries: {
          "0": a[0],
          "1": a[1],
          "2": a[2],
          "3": a[3],
          "4": a[4],
          "5": a[5],
          "6": a[6]
        }
      })
    })
    
  }

  componentDidUpdate(){
    Array.from(document.getElementsByClassName('i-e')).map( e =>{
        e.onclick = (c) => {
          this.setState({
            current: e.src
          }, () => {
            var modal = document.getElementById('mmodal');   
            modal.style.display = 'flex';
          })
        }
    })

    $("img").mousedown(function(e){
               e.preventDefault()
          });

          // this will disable right-click on all images
          $("body").on("contextmenu",function(e){
               return false;
          });
  }

  download = (e) => {
    var d = document.getElementById('download')
    d.href = this.state.current;
    d.download = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    d.click();
  }

  share = (e) => {
    console.log('ohmyfuckingcat.ga?current='+btoa(this.state.current.split('media/')[1]))
  }
  
  render() {

    
    var entry = {
      "0": this.state.entries[0].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
      "1": this.state.entries[1].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}),
      "2": this.state.entries[2].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
      "3": this.state.entries[3].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
      "4": this.state.entries[4].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
      "5": this.state.entries[5].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
      "6": this.state.entries[6].map((e, index) => {return (<img src={require('../cats/'+e.path)} className="i-e" alt="" key={index} width="100%"/>)}), 
    }
    
    return (
      <React.Fragment>
        <a id="download"></a>
        <div className="l-mmain" id="mmodal">
          <div id="modal" className="l-modal">
            <img src={this.state.current} height="675px" alt=""/>
            <div className="button-bar">
              <button className="button-style" onClick={this.download}>
                <img className="img" src={download} width="16px" alt=""/>
                <span>{"Download       "}</span>
              </button>              
              <button className="button-style" onClick={this.share}>
                <img src={share} className="img" width="16px" alt=""/>
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="body">
          <div className="cats">
              <div className="row">    
                <div className="column">{entry[0]}</div>
                <div className="column">{entry[1]}</div>
                <div className="column">{entry[2]}</div>
                <div className="column">{entry[3]}</div>
                <div className="column">{entry[4]}</div>
                <div className="column">{entry[5]}</div>
                <div className="column">{entry[6]}</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}