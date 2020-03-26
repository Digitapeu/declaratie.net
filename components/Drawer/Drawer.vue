<template>
    <div :class="{'drawer':true, 'not-closeable':!closeable}" :data-title="title">
        <transition name="fade-in" mode="out-in" appear>
            <div v-if="secure && showSecure" id="secure">
                <div id="label">{{ secure }}</div>
            </div>
        </transition>
        
        <CloseButton @click.native="$emit('close')"/>
        
        <div class="mask">
            <div :style="{overflowY: fixed ? 'hidden' : 'auto'}">
                <slot v-bind="$props"></slot>
            </div>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<style lang="less" scoped>
.drawer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    width: 100%; height: auto;
    max-width: 500px;
    max-height: 600px;
    padding: 50px 10px 10px;
    display: flex;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    transition: all .3s ease;

    &.not-closeable {
        padding-top: 10px;
    }

    @media screen and (min-width: 990px){
        margin: 0 auto;
        border-radius: 10px;
        top: unset; bottom: unset; left: unset; right: unset;
        max-height: 90%!important;
    }

    &:before {
        content: attr(data-title);
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        font-size: 16px;
        color: #909090;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 320px){
            font-size: 12px;
        }
    }

    #secure {
        position: absolute;
        top: -50px;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        #label {
            font-size: 10px;
            font-weight: 900;
            padding: 5px 10px;
            border: 1px solid lime;
            border-radius: 6px;
            color: lime;
        }

        #company {
            width: 75px;
            font-weight: 900;
            font-size: 10px;
            color: #ccc;

            .digitap {
                &:before {
                    content: 'By';
                    position: absolute;
                    left: -15px;
                    font-size: 10px;
                    color: #fff;
                    font-weight: 900;
                    height: 100%;
                    line-height: 15px;
                }
            }
        }
    }

    .mask, .mask > div {
        display: flex;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        align-items: center;
        flex-flow: column;
        transition: all .3s ease;
    }

    .mask > div { overflow-y: auto; }

    h1 {
        width: auto;
        margin: 0 auto;
        color: #000;
    }

    content.content {
        padding: 20px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow: auto;
        display: flex;
        flex-flow: column;
        text-align: justify;    
        -webkit-overflow-scrolling: touch;
        transition: all .3s ease;
    }
}
</style>