<template>
  <div class="home">
    
    <!-- Navigation bar -->
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Let's Discuss</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>          
        </ul>
      </div>
    </nav>

    <div class="container">
      <!-- Content here -->
      <router-view />
    </div>

  </div>
</template>

<style scoped>
.container {
  /* border: 1px solid red; */
  padding: 24px;
}
</style>
