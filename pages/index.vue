<template>
<div class="container">
    <header>
        <Logo />
        <p>Completeaza usor si rapid <br/>declaratia pe proprie raspundere ( <strong>obligatorie</strong> ) <br/>conform ordonantei militare nr. 3</p>
    </header>
    <Steps />
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Logo from "~/components/Logo.vue"
import Steps from "~/components/Steps"

@Component({
  components: {
    Logo,
    Steps
  },
})
export default class Index extends Vue {}
</script>

<style lang="less">
.container {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    min-height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    padding: 0;

    header {
        display: flex;
        flex-flow: column;
        width: 100%;
        box-sizing: border-box;
        padding: 0;

        p {
          text-align: center;
          padding: 0;
          margin: 0 0 10px;
          box-sizing: border-box;
          width: 100%;
          font-size: 18px;
        }
    }

    main {
        display: flex;
        flex-flow: column;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 0 100px;
        position: relative;
        z-index: 2;

        @media screen and (min-width: 900px) {
            min-height: unset;
            padding: 20px;
            margin: 0 auto;
            border: 1px solid rgba(0, 0, 0, .1);
            background: #fff;
            border-radius: 6px;
        }

        .el-steps {
            border-radius: 0;
        }

        .el-form {
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            flex-flow: column;

            .el-input:not(.el-date-editor) {
                margin: 0 0 16px;
                font-size: 18px;
                box-sizing: border-box;

                input {
                    padding: 25px;
                }
            }

            .descendants {
                display: flex;
                flex-flow: row wrap;
                justify-content: center;

                .el-radio {
                    background: #fff;
                    flex-grow: 1;
                }
            }

            .split {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                margin: 0 0 20px;

                .el-input {
                    flex-grow: 1;
                    flex-basis: 45%;
                    margin: 0;

                    &:nth-of-type(1) {
                        margin-right: 10px
                    }

                    &:nth-of-type(2) {
                        margin-left: 10px
                    }
                }
            }

            .address-details {
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;

              &:before { content: ''; display: none; }

              .el-input {
                width: 32%;
              }
            }

            .el-checkbox-group {
              background: #fff;

              .el-checkbox {
                white-space: pre-wrap;
                display: flex;
                margin-bottom: 30px;

                .el-checkbox__label {
                  font-size: 18px;
                  padding-left: 20px;
                }
              }
            }
        }

        .text {
          background: #fff;
          padding: 15px;
          font-size: 16px;
          box-sizing: border-box;

          &.simple {
            padding: 0 20px 5px;
            font-size: 14px;
          }
        }
    }

    footer {
        display: flex;
        flex-flow: row;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;

        @media screen and (min-width: 900px) {
            position: relative;
        }

        .el-button {
            width: 100%;
            font-size: 20px;
            padding: 20px 10px;

            @media screen and (min-width: 900px) {
                padding: 20px 30px;
            }
        }
    }
}
</style>
