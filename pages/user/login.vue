<template>
<div>
  <div style="padding:120px 20px 20px 20px;text-align:center;">
    <!-- <h1 class="text-center pt-4 pb-5">TAXZI</h1> -->
    <img src="~/static/TaxziLogoGradient.png" style="height:80px">
    <div class="d-flex justify-content-center">
      <form class="form-horizontal" action="" method="" style="margin:120px 0px 0px 0px">
        <!-- Username -->
        <div class="control-group row pt-3">
          <!-- <label class="control-label col-5" for="inputUsername">Username</label> -->
          <input
            class="taxzi-form input-form"
            style="margin:auto;"
            type="text"
            name="inputUsername"
            id="inputUsername"
            placeholder="Username"
          />
        </div>
        <!-- Password -->
        <div class="control-group row pt-3">
          <!-- <label class="control-label col-5" for="inputPassword">Password</label> -->
          <input
            class="taxzi-form input-form"
            style="margin:auto;"
            type="password"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
          />
        </div>
        <div class="control-group row pt-3" style="text-align:right;">
            <a href="register" style="color:rgb(255, 107, 48);font-weight:700;font-size:18px;padding-left:240px">Register</a>
        </div>
        <!-- Button -->
        <div class="control-group row pt-5 d-flex justify-content-center">
          <button type="submit" class="taxzi-button">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
.bg {
  background-color: whitesmoke;
  padding: 0%;
  min-height: 100%;
  height: 100%;
}
.input-form {
  height:50px;
  width:300px;
  padding: 20px;
}
.taxzi-button{
  width               : 280px;
  height: 56px;
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
</style>