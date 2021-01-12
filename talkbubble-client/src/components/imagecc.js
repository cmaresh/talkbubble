import React from 'react';
import styled from 'styled-components';

const ImageCCElem = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  color: var(--talkbubble-yellow);
  font-size: 14px;
  padding-left: 15px;
  opacity: 0.5;
  @media(max-width: 768px) {
    margin-top: 20px; 
    margin-bottom: 20px;
    position: relative;
    z-index: -1;
    text-align: center;
  }
`


export function ImageCC() {
    return (
        <ImageCCElem className="image-CC">
            <a target="_blank" rel="noreferrer" href="https://www.flickr.com/photos/35468147887@N01/14018311">“sea life”</a> by&nbsp;
            <a target="_blank" rel="noreferrer" href="https://www.flickr.com/photos/hodgers/">Tom Hodgkinson</a> is licensed under&nbsp;
            <a target="_blank" rel="noreferrer" href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0.</a> 
        </ImageCCElem>
    )
}