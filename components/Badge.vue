<template>
    <div id="badge-demo">
        <img class="demo" src="~assets/backgrounds/demo.png" alt="Demo">
    </div>
</template>

<style>
#badge-demo {
    max-width: 320px;
    /* border: 1px solid black; */
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("~assets/backgrounds/background-svg.png");
}

.demo {
    max-width: 320px;
}

@media screen and (min-width: 415px) {
    #badge-demo {
        max-width: 414px;   
    }
    .demo {
        max-width: 414px;
    }
}
</style>
