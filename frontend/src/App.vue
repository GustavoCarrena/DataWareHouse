<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>

body {
    margin: 0 ;
    padding: 0 ;
    display: flex ;
    justify-content: center;
    align-items: center ;
    flex-flow: column nowrap;
    height: auto ;
    background-color: #f7f6f6;
}

* {
    box-sizing: border-box;
    
}

#app{
    width: 100%;
    display: flex;
    justify-content: center;
}

.container{
  width: 100%;
}

thead{
  text-align: center;
}

td{
  text-align: center;
}

.mod{
  margin: 10px 5px 0 0 !important;

}
.lab{
  margin: 2px 2px 0 0;
  color: rgb(6, 6, 153);
}

.input{
  margin-top: 3px !important;
}

</style>


