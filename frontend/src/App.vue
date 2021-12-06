<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>


body {
  height: 96vh !important;
  background-color: #f7f6f6;
  width: 95vw !important;
  margin-left: 25px;
}

* {
    box-sizing: border-box;
    
}

tbody, td, tfoot, th, thead, tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    text-align: center !important;
}

thead tr{
  background-color: aqua !important;
}

.btn-warning{
    width: 80px !important;
    padding: 0 !important;
    font-weight: bold !important;
    color: darkgreen;
    height: 30px !important;

}

.ppal-btns{
  display: flex;
  flex-flow: row nowrap;
  width: auto;
  justify-content: space-between;
  }

.ppal-btns .btnppal{
  
  padding: 0 !important;
  font-weight: bold !important;
  height: 50px !important;
  
  
}

.modal-open{
  padding-right: 0 !important;
}

</style>


