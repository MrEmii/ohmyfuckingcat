import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareSquare, faHandSpock, faThumbsUp, faWindowClose} from '@fortawesome/free-solid-svg-icons';

import './assets/Content.css';

import up from './assets/images/up.svg';

import $ from 'jquery';

var image = new Image();

var average_color;

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
        fetch('http://35.236.71.155:3001/api/check', {
          method: 'POST',
          body: {
            path: atob(img),
          }
          
        }).then(response => {
          return response.json()
        }).then(json => {
          if(json.code === 400){
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
            if (event.target === modal) {
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

    fetch('http://35.236.71.155:3001/api/cats', {
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
  
 // Blur
 //  var item = $('.i-e');
 //  item.hover(function(){
 //    item.not($(this)).addClass("blur");
 //  }, function(){
 //    item.removeClass('blur');
 //  })

    

    

    $(document).ready(function(){
    
      $('.wup').click(function(){
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });
    
      $(window).scroll(function(){
        if( $(this).scrollTop() > 700 ){
          $('.wup').slideDown(300);
        } else {
          $('.wup').slideUp(300);
        }
      });
    
    });
    function getaverageColor(imagen) {
      var r=0, g=0, b=0, count = 0, canvas, ctx, imageData, data, i;
      canvas = document.createElement('canvas');
      ctx = canvas.getContext("2d");
      canvas.width = imagen.width;
      canvas.height = imagen.height;
      ctx.drawImage(imagen, 0, 0);
      imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
      data = imageData.data;
      var n;
      for(i = 0, n = data.length; i < n; i += 4) {
        ++count;
        r += data[i];
        g += data[i+1];
        b += data[i+2];
      }
      r = ~~(r/count);
      g = ~~(g/count);
      b = ~~(b/count);
      return [r, g, b];
    }

    function rgbToHex(arr) {
      return "#" + ((1 << 24) + (arr[0] << 16) + (arr[1] << 8) + arr[2]).toString(16).slice(1);
    }
    

    image.src = this.state.current;
    image.onload = function() {
      average_color = getaverageColor(this);      
      document.getElementById('modal').style.background = rgbToHex(average_color);
      document.getElementById('modal').style.width = image.width;
    }

    
    Array.from(document.getElementsByClassName('i-e')).map( e =>{
        e.onclick = (c) => {
          this.setState({
            current: e.src
          }, () => {
            var modal = document.getElementById('mmodal');   
            modal.style.display = 'flex';
            var sm = document.getElementById('sm');
            sm.style.display = 'none';
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
    //console.log('ohmyfuckingcat.ga?current='+btoa(this.state.current.split('media/')[1]))
   /* var s = document.getElementById('share')
    var url = 'web.ohmyfuckingcat.ga?current='+btoa(this.state.current.split('media/')[1])
    s.href = "http://twitter.com/home?status=Miren ésta hermosa foto de un gatito! 😹😹😹 "+url + " @MrEmii @KiritoDev ";
    s.target = "__blank"
    s.click();    */
    var sm = document.getElementById('sm');
    sm.style.display = 'flex';

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
        <a id="download" />
        <a id="share" data-text="hey miren esto!" data-related="MrEmiii,KiritoDev" data-show-count="false"/>
        <div className="l-mmain" id="mmodal">
          <div id="sm" className="s-modal">
            <button><FontAwesomeIcon icon={faWindowClose} /></button>
            <h2>Share with your friends!</h2>
          </div>  
          <div id="modal" className="l-modal">
            <img src={this.state.current} height="675px" alt=""/>
            <div className="button-bar">
              <button className="button-style" onClick={this.download}>
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </button>              
              <button className="button-style" onClick={this.share}>
                <FontAwesomeIcon icon={faShareSquare} />
                <span>Share</span>
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
        <span id="wup" className="wup"><img src={up} width="32px" height="32px" alt=""/></span>
      </React.Fragment>
    );
  }
}