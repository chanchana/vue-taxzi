<template>
  <div class="custom-font">
    <nuxt />
  </div>
</template>

<style>

.taxzi-form {
  background-color: rgb(223, 223, 223);
  border: none;
  border-radius: 999px;
  color: black;
  height:54px;
  width:300px;
  padding: 20px;
}
  .taxzi-text-gradient {
    background: rgb(0,61,255);
    background: linear-gradient(137deg, rgba(0,61,255,1) 0%, rgba(255,119,0,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  

  .custom-font {
    font-family: 'Nunito', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

.taxzi-button{
  width               : 280px;
  height: 58px;
  padding             : 5px;
  background          : rgba(255, 107, 48, 0.8);
  border-radius       : 60px;
  border              : 10px;
  font-weight: 700;
  font-size:24px;
  color:white;
  box-shadow: 0px 10px 30px 1px rgba(255, 107, 48, 0.5);
  transition-duration: 0.4s;
  cursor: pointer;
}
.taxzi-button:hover {background-color: rgba(255, 107, 48, 1.0);}
html {
  font-family: 'Nunito', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
