<template>
    <div id="back"></div>
</template>

<style lang="less" scoped>
#back {
    font-size: 35px;
    display: flex;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0; left: 0;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    color: #8a8a8a;
    cursor: pointer;
    box-sizing: border-box;
    z-index: 70;
    background: ~"url('~@/assets/svg/left_arrow.svg') 50%/25px no-repeat";
}
</style>