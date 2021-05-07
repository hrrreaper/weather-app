import React from 'react';
import styled, { keyframes } from 'styled-components';
import './Loading.scss';
import loader from "sass-loader";

const Loading = () => {
  return (
    <>
      <div class="loader">
  <div class="loader__bar"></div>
  <div class="loader__bar"></div>
  <div class="loader__bar"></div>
  <div class="loader__bar"></div>
  <div class="loader__bar"></div>
  <div class="loader__ball"></div>
</div>
    </>
  )
}

export default Loading
