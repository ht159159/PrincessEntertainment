<template>
<div class="safe">
    <header-cmp :title="$t('Safe')"></header-cmp>
    <main>
        <div class="safeDisplay">
            <div class="safeDisplay-safe">
                <div class="safeDisplay-safe-title">{{ $t("Safe") }}</div>
                <div class="safeDisplay-safe-value">{{ walletLock | $currency }}</div>
            </div>
            <div class="safeDisplay-wallet">
                <div class="safeDisplay-wallet-title">{{ $t("Wallet") }}</div>
                <div class="safeDisplay-wallet-value">{{ maoBalance | $currency }}</div>
            </div>
            <div class="safeDisplay-amount">
                <div class="safeDisplay-amount-title">{{ $t("Quantity") }}</div>
                <input class="safeDisplay-amount-value" :placeholder="$t('enterTheQuantity')" v-model="inOutAmount">
            </div>
        </div>
        <div class="safeDescription">
            錢包超過5,000以上，即可存於保險箱內。
        </div>
        <div class="safeDisplay-btn">
            <div class="btn btn-round btn-blue safeDisplay-btn-deposit" @click="bankSavingsAlertShow = true">{{ $t("BankSavings") }}</div>
            <div class="btn safeDisplay-btn-takeOut" @click="takeOutAlertShow = true">{{ $t("TakeOut") }}</div>
        </div>

        <modal-alert
            v-if="bankSavingsAlertShow"
            imgName="alert"
            @close="bankSavingsAlertShow = false"
            :text="$t('bankSavingsWarning')"
            >
            <template #btn>
                <transition name="loading">
                    <div class="loading" v-if="loadingShow">{{ $t("loading") }}</div>
                </transition>
                <div class="alert-box-cancel alert-box-btn" @click="bankSavingsAlertShow = false">{{ $t("Cancel") }}</div>
                <div
                class="alert-box-cancel alert-box-btn alert-box-btn-bright"
                @click="safeInOut(0)"
                >{{ $t("Confirm") }}</div>
            </template>
        </modal-alert>
        <modal-alert
            v-if="takeOutAlertShow"
            imgName="alert"
            @close="takeOutAlertShow = false"
            :text="$t('takeOutAlertWarning')"
            >
            <template #btn>
                <transition name="loading">
                    <div class="loading" v-if="loadingShow">{{ $t("loading") }}</div>
                </transition>
                <div class="alert-box-cancel alert-box-btn" @click="takeOutAlertShow = false">{{ $t("Cancel") }}</div>
                <div
                class="alert-box-cancel alert-box-btn alert-box-btn-bright"
                @click="safeInOut(1)"
                >{{ $t("Confirm") }}</div>
            </template>
        </modal-alert>
    </main>
</div>
</template>
<script>
import { apiSafeInput } from "@/api";
import { mapState } from "vuex";
export default {
    data() {
        return {
            bankSavingsAlertShow: false,
            takeOutAlertShow: false,
            maoBalance: '',
            walletLock: '',
            inOutAmount: '',
            loadingShow: false
        }
    },
    created() {
        this.walletLock = this.$storage.local.get("walletLock")
        this.maoBalance = this.$storage.local.get("maoBalance")
    },
    computed: mapState(["personalInfo", "maoBalanceStore"]),
    mounted() {},
    methods: {
        safeInOut (type) {
            let integerLimit = /^[0-9]*[1-9][0-9]*$/
            if(this.inOutAmount != ""){
                if(!integerLimit.test(this.inOutAmount)){
                    this.bankSavingsAlertShow = false
                    this.takeOutAlertShow = false
                    this.$toast(this.$t("請輸入正整數"))
                    this.inOutAmount = ""
                    return
                }
                let apiSafeInputData = {
                    Type: type,
                    Amount: this.inOutAmount
                }
                this.loadingShow = true
                apiSafeInput(apiSafeInputData).then(res => {
                    if (res.result === 1 ) {
                        this.$toast(this.$t(res.message))
                        this.bankSavingsAlertShow = false
                        this.takeOutAlertShow = false
                        this.$store.dispatch("getPersonalInfo")
                        this.$store.dispatch("getMaoGetBalanceAsync")
                        this.loadingShow = false
                        this.inOutAmount = ""
                    }else {
                        // this.$toast({
                        //     message: this.$t(res.message),
                        //     className: "test"
                        //     })
                        this.bankSavingsAlertShow = false
                        this.takeOutAlertShow = false
                        this.loadingShow = false
                        this.inOutAmount = ""
                    }
                })
            }else {
                this.bankSavingsAlertShow = false
                this.takeOutAlertShow = false
                this.$toast(this.$t("enterTheQuantity"))
            }
        }
    },
    watch: {
        personalInfo() {
            this.walletLock = this.$storage.local.get("walletLock")
        },
        maoBalanceStore() {
            this.maoBalance = this.$storage.local.get("maoBalance")
        }
    }
};
</script>

<style lang="scss" scoped>
.safe {
    height: 100%;

    main {
        width: 100%;
        height: calc(100% - 2.3rem);
        padding: 0.3rem 0.3rem 0px 0.3rem;
        box-sizing: border-box;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .safeDisplay {
            width: 100%;

            &-safe, &-wallet, &-amount {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.32rem;
                color: #fff;
                border-bottom: 1px solid #404257;
                padding: 0.1rem 0;
                margin-bottom: 0.2rem;

                &-title {
                    color: #fff;
                }

                &-value {
                    width: 100px;
                    height: 32px;
                    color: #20212f;
                    text-align: center;
                    line-height: 32px;
                    border-radius: 5px;
                    background-image: linear-gradient(90deg, #e5e5e5 0%, #b8b5b5 99%);
                    overflow-x: scroll;
                }
            }

            &-amount {
                &-value {
                    color: #fff;
                    background: none;
                }
            }
        }

        .safeDescription {
            margin-top: 0.3rem;
            font-size: 16px;
            text-align: center;
        }

        .safeDisplay-btn {
            &-deposit {
                margin-top: 0.3rem;
                border-radius: 20px;
            }

            &-takeOut {
                border-radius: 20px;
                border: 1px solid #a8abe1;
                margin-top: 0.3rem;
                color: #a8abe1;
            }
        }
    }

    .loading{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: rgba(0,0,0,0.7);
        color: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6rem;
    }
    .loading-enter,.loading-leave-to{
        opacity: 0;
    }
    .loading-enter-to,.loading-leave{
        opacity: 1;
    }
    .loading-enter-active,.loading-leave-active{
        transition: all 1s;
    }
}
</style>
