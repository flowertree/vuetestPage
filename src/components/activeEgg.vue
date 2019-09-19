<template>
    <div class="bg">
       <div @click="changeOn" :class="isOff?'isOff':'isOn'"></div>
       <audio id="audio" autoplay="autoplay" loop :src="musicSrc" muted></audio>
       <!--活动锦囊-->
       <img :src="activityRuleImg" class="rulePic" @click="showRule">
       <!--活动标题文字-->
       <div class="activeTitle"></div>
       <!--舞台部分-->
       <div class="stage"></div>
       <!--金蛋-->
       <div  class="goldenEgg"  :class="{'paused':paused}">
           <div v-for='(item,index) in goldenEggImgs' :key='index' class="egg">
               <img  :src="item.src" :class="[item.src.indexOf('gif') !=-1?'current-egg-git':'']" alt="" @click="hammerStatus(index)">
           </div>
       </div>
       <!-- 活动规则 -->
        <div class="ruleWrap" v-show="ruleMaskShow">
            <div class="ruleBox">
                <img src="../../static/images/nineGame1906/ruleClose.png" class="ruleClose" @click="closeRule">
                <ul class="ruleUl">
                    <li @click="activeSta">
                        <span>活动说明</span>
                        <img src="../../static/images/nineGame1906/liUnder.png" class="liUnder" v-show="activeUnd">
                        </li>
                    <li @click="myGift">
                        <span>我的奖品</span>
                        <img src="../../static/images/nineGame1906/liUnder.png" class="liUnder" v-show="giftUnd">
                        </li>
                    </ul>
                <div class="ruleCont">
                    <!-- 活动说明li -->
                    <div class="hdsmWrap" v-show="activeUnd">
                         <div class="overHide">
                                 <div class="someTit">活动奖品</div>
                         </div>
                         <div class="statPWrap">
                                 <p class="someSta">一等奖：价值100元礼品</p>
                                 <p class="someSta">二等奖：价值100元礼品</p>
                                 <p class="someSta">三等奖：价值100元礼品 </p>
                                 <p class="someSta">四等奖：价值100元礼品</p>
                         </div>
                         <div class="overHide">
                            <div class="someTit">活动时间</div>
                         </div>
                         <div class="statPWrap">
                            <!-- <p class="someSta">{{activeTime2}}</p> -->
                            <p class="someSta">2019年5月10日 11:20- 2019年5月30日 11:20</p>
                         </div>
                        <div class="overHide">
                            <div class="someTit">活动说明</div>
                            </div>
                        <div class="statPWrap">
                            <!--<p class="someSta">{{description}}</p>-->
                            <p class="someSta">达到80分即可获得抽奖机会，每人每日有3次抽奖机会。</p>
                            </div>
                        </div>
                       <!-- 我的奖品li -->
                        <div class="myGift" v-show="giftUnd">
                            <div class="overHide" id="giftListWrap">
                            <!-- <div class="someTit">我的奖品</div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 活动规则结束 -->
       <!--没中奖-->
       <div class="shade" v-show="showSorryBox">
           <div class="sorryTitle"></div>
           <div class="sorryPeople"></div>
           <div class="BtnWarp" v-if="chance>0" @click="againStart('sorry')"><span :class="chance===0?'countFull':''">{{chance==0?'次数已用完':'再来一次'}}</span></div>
           <div class="BtnWarp" v-else><span class="countFull">次数已用完</span></div>
       </div>
       <!--中奖啦-->
        <div class="shade" v-show="showWinBox">
            <div class="winbg">
                <div class="winCon">
                    <p>{{giftInfoTitle}}</p>
                    <p>卡号：1234567890112222</p>
                    <p>密码：11222qujb</p>
                </div>
            </div>
            <div class="wingift"></div>
            <div class="BtnWarp" v-if="chance>0" @click="againStart('win')"><span :class="chance===0?'countFull':''">{{chance==0?'次数已用完':'再来一次'}}</span></div>
            <div class="BtnWarp" v-else><span class="countFull">次数已用完</span></div>
       </div>
       <!--抽奖信息提示-->
       <footer>
           <p>已有<span>39312</span>人参与</p>
           <p>您今天还有<span>{{chance}}</span>次抽奖机会</p>
       </footer>
    </div>
</template>
<script>
import '@/assets/css/activeEgg.css'
import{goldenEggImg, sorryEggs,winEggs} from '@/assets/js/baseConfig.js'
import musicSrc from'../../static/map3/danche.mp3'
    export default {
        data() {
            return {
                musicSrc: musicSrc,
                isOff:true,//音乐关闭
                activityRuleImg:require('@/assets/images/activeEgg/activeRule.png'),//活动规则图片
                goldenEggImgs:_.cloneDeep(goldenEggImg), //金蛋图片
                sorryEggs:sorryEggs,// 敲开后没有礼物的动画数组
                winEggs:winEggs,// 敲开后提示有礼物的动画数组
                bonusPool:["恭喜您抽中10元京东卡","sorry","恭喜您抽中500M省内加餐包","sorry","恭喜您抽中100元话费","sorry","恭喜您抽中欧洲十日游全家桶","sorry"],//模拟奖金池数据
                chance: 5,  //砸蛋次数
                paused:false,//停止动画
                showSorryBox:false,//是否显示没中奖遮罩框
                showWinBox:false,//是否显示中奖遮罩框
                bonsuStatus:'',//当前抽奖状态
                currentEggIndex:'',//当前金蛋的索引
                ruleMaskShow:false,//活动规则弹框显示
                activeUnd:true,//活动规则展示
                giftUnd:false,//活动奖品展示
                isAgain:false,// 是否是再来一次
                giftInfoTitle:"恭喜您抽中10元京东卡请登陆京东商城凭借密码兑换",
            }
        },
        created () {
            
        },
        mounted () {
            this.audioAutoPlay();//调用监听音乐播放事件;
             // 自动播放音乐效果，解决微信自动播放问题
            document.addEventListener('touchstart',this.audioAutoPlay,false);
            document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
            let oAudio = document.querySelector("#audio");
            oAudio.onended = function () {//播放完毕，重新循环播放
                oAudio.load();
                oAudio.play();
            }
        },
        methods: {
           // 点击开始或暂停播放音乐
            changeOn(){
                let oAudio = document.querySelector("#audio");
                if(this.isOff){
                    oAudio.play();//让音频文件开始播放
                }else{
                    oAudio.pause();//让音频文件暂停播放
                }
                this.isOff = !this.isOff;
            },
            //音乐监听事件
            audioAutoPlay() {
                let audio = document.getElementById('audio');
                this.isOff = false;
                audio.play();
                document.removeEventListener('touchstart', this.audioAutoPlay);
            },
            // 显示活动锦囊内容
            showRule(){
                //显示活动锦囊图层
                this.ruleMaskShow = true;
            },
             //关闭活动规则
            closeRule(){
                // alert("关闭规则弹框")
                this.ruleMaskShow = false;
            },
             // 活动规则的活动说明
            activeSta(){
                // alert("活动规则")
                this.activeUnd = true;
                this.giftUnd = false;
            },
            // 活动规则的活动奖品
            myGift(){
                // alert("我的奖品")
                this.activeUnd = false;
                this.giftUnd = true;
            },
            //点击金蛋
            hammerStatus(index){
                this.currentEggIndex =index;// 保存一下当前金蛋索引
                this.bonsuStatus = this.bonusPool[Math.floor(Math.random() * this.bonusPool.length)]; //随机读取奖金池
                this.paused =true; //点击砸开后，阻止动画运动
                this.chance-=1;//砸蛋次数每次递减
                if(this.chance<0){
                   this.chance = 0;
                   // 移除当前点击事件
                 }else{
                     // 还有点击次数
                     if(this.bonsuStatus==='sorry'){
                        // 读取没有礼物数组的图片路径
                        this.goldenEggImgs[index].src =this.sorryEggs[index].src;
                        setTimeout(()=>{
                           this.showSorryBox= true;
                        },2000)
                        
                     }else{
                         this.goldenEggImgs[index].src =this.winEggs[index].src;
                         this.giftInfoTitle =this.bonsuStatus; // 取得获奖内容信息
                         console.log(this.giftInfoTitle);
                         setTimeout(()=>{
                          this.showWinBox = true;
                        },2000)
                         
                     }
                 }
            },
            //再来一次
            
            againStart(againType){
                let cloneEgg= _.cloneDeep(goldenEggImg);
                this.isAgain= true; // 再来一次
                this.paused =false; // 打开动画进行跳动
                if(againType=='sorry'){
                    this.showSorryBox= false; //关闭没有礼物遮罩
                }else{
                    this.showWinBox = false; // 关闭有礼物遮罩
                }
                this.goldenEggImgs = cloneEgg; // 还原砸过的金蛋
            }
        },
    }
</script>
